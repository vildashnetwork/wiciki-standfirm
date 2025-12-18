import React, { useState, useRef, useEffect } from "react";
import "./ResetPassword.css";
import { Eye, EyeOff } from "lucide-react";

const API_BASE = "https://wiciki-media-backend.onrender.com/otp";

const ResetPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [resendCooldown, setResendCooldown] = useState(0);
    const [showSignupPassword, setShowSignupPassword] = useState(false);
    // keep refs stable across renders
    const otpRefs = useRef([]);

    // cooldown timer for resend
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const t = setInterval(() => {
            setResendCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(t);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [resendCooldown]);

    // clear transient error messages after a short while
    useEffect(() => {
        if (!message.text) return;
        const tid = setTimeout(() => {
            if (message.type === "error" || message.type === "info") setMessage({ text: "", type: "" });
        }, 6000);
        return () => clearTimeout(tid);
    }, [message]);

    const resetAll = () => {
        setStep(1);
        setEmail("");
        setOtp(["", "", "", "", "", ""]);
        setNewPassword("");
        setConfirmPassword("");
        setMessage({ text: "", type: "" });
        setResendCooldown(0);
    };

    // helper to send fetch requests
    const apiPost = async (url, body) => {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const json = await res.json().catch(() => ({}));
        return { ok: res.ok, status: res.status, data: json };
    };

    const handleSendOtp = async () => {
        const trimmed = email.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setMessage({ text: "Please enter a valid email address.", type: "error" });
            return;
        }

        setLoading(true);
        setMessage({ text: "Requesting verification code...", type: "info" });

        try {
            const { ok, data } = await apiPost(`${API_BASE}/send`, { email: trimmed });

            if (!ok) {
                const errMsg = data?.message || "Failed to send OTP. Please try again.";
                setMessage({ text: errMsg, type: "error" });
                setLoading(false);
                return;
            }

            setMessage({ text: `Verification code sent to ${trimmed}. Check your email.`, type: "success" });
            setStep(2);
            setResendCooldown(30);
            // focus first OTP input shortly after render
            setTimeout(() => otpRefs.current[0]?.focus?.(), 120);
        } catch (err) {
            console.error("send otp error", err);
            setMessage({ text: "Network error while sending OTP. Try again.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendCooldown > 0) return;
        await handleSendOtp();
    };

    const handleOtpChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;
        const next = [...otp];
        next[index] = value;
        setOtp(next);

        if (value && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1]?.focus?.();
        }
    };

    const handleOtpKeyDown = (index, ev) => {
        if (ev.key === "Backspace") {
            if (otp[index]) {
                // clear current
                const next = [...otp];
                next[index] = "";
                setOtp(next);
            } else if (index > 0) {
                otpRefs.current[index - 1]?.focus?.();
                const next = [...otp];
                next[index - 1] = "";
                setOtp(next);
            }
        } else if (ev.key === "ArrowLeft" && index > 0) {
            otpRefs.current[index - 1]?.focus?.();
        } else if (ev.key === "ArrowRight" && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1]?.focus?.();
        }
    };

    // allow pasting full OTP (6 digits)
    const handleOtpPaste = (ev) => {
        const paste = (ev.clipboardData || window.clipboardData).getData("text");
        const digits = paste.replace(/\D/g, "").slice(0, 6).split("");
        if (digits.length === 0) return;
        ev.preventDefault();
        const next = ["", "", "", "", "", ""];
        digits.forEach((d, i) => (next[i] = d));
        setOtp(next);
        // focus next empty or last
        const firstEmpty = next.findIndex((c) => c === "");
        const focusIndex = firstEmpty === -1 ? next.length - 1 : firstEmpty;
        setTimeout(() => otpRefs.current[focusIndex]?.focus?.(), 50);
    };

    const verifyOtp = async () => {
        const code = otp.join("");
        if (code.length < 6) {
            setMessage({ text: "Please enter the complete 6-digit verification code.", type: "error" });
            return;
        }

        setLoading(true);
        setMessage({ text: "Verifying code...", type: "info" });

        try {
            const { ok, data } = await apiPost(`${API_BASE}/validate`, {
                email: email.trim().toLowerCase(),
                otp: code,
            });

            if (!ok) {
                const errMsg = data?.message || "Invalid or expired OTP.";
                setMessage({ text: errMsg, type: "error" });
                setLoading(false);
                return;
            }

            setMessage({ text: "OTP verified. Please create a new password.", type: "success" });
            setStep(3);
            setTimeout(() => {
                // focus new password
                document.querySelector('input[aria-label="new password"]')?.focus?.();
            }, 120);
        } catch (err) {
            console.error("verify otp error", err);
            setMessage({ text: "Network error while validating OTP.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (newPassword.length < 8) {
            setMessage({ text: "Password must be at least 8 characters.", type: "error" });
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage({ text: "Passwords do not match. Please verify.", type: "error" });
            return;
        }

        setLoading(true);
        setMessage({ text: "Updating password...", type: "info" });

        try {
            const { ok, data } = await apiPost(`${API_BASE}/reset`, {
                email: email.trim().toLowerCase(),
                newPassword,
            });

            if (!ok) {
                const errMsg = data?.message || "Failed to reset password.";
                setMessage({ text: errMsg, type: "error" });
                setLoading(false);
                return;
            }

            setMessage({ text: "Password reset successfully. Redirecting to login...", type: "success" });
            // small delay so user sees message
            setTimeout(() => {
                resetAll();
                window.location.href = "/login";
            }, 1400);
        } catch (err) {
            console.error("reset password error", err);
            setMessage({ text: "Network error while resetting password.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="gordonRamsayContainer">
            <div className="thomasKellerBackground"></div>
            <div className="alainDucasseParticles"></div>
            <div className="joelRobuchonGrid"></div>

            <div className="massimoBotturaCard">
                <header className="reneRedzepiHeader">
                    <div className="ferranAdriaCrown">
                        <div className="wolfgangPuckGem"></div>
                        <div className="wolfgangPuckGem"></div>
                        <div className="wolfgangPuckGem"></div>
                    </div>
                    <h1 className="grantAchatzTitle">Secure Password Reset</h1>
                    <p className="yannickAllenoSubtitle">Enterprise-Grade Security Protocol</p>
                </header>

                <div className="alainPassardProgress">
                    <div className={`dominiqueCrennStep ${step >= 1 ? "active" : ""}`}>
                        <div className="emerilLagasseIndicator">
                            <span className="bobbyFlayNumber">1</span>
                            <div className="guyFieriGlow"></div>
                        </div>
                        <span className="paulBocuseLabel"></span>
                    </div>
                    <div className={`dominiqueCrennStep ${step >= 2 ? "active" : ""}`}>
                        <div className="emerilLagasseIndicator">
                            <span className="bobbyFlayNumber">2</span>
                            <div className="guyFieriGlow"></div>
                        </div>
                        <span className="paulBocuseLabel"></span>
                    </div>
                    <div className={`dominiqueCrennStep ${step >= 3 ? "active" : ""}`}>
                        <div className="emerilLagasseIndicator">
                            <span className="bobbyFlayNumber">3</span>
                            <div className="guyFieriGlow"></div>
                        </div>
                        <span className="paulBocuseLabel"></span>
                    </div>
                </div>

                <main className="danielBouludContent">
                    {message.text && (
                        <div
                            className={`jacquesPepinMessage ${message.type === "error" ? "error" : message.type === "success" ? "success" : "info"}`}
                        >
                            <div className="davidChangIcon">
                                {message.type === "error" ? "⚠️" : message.type === "success" ? "✅" : "ℹ️"}
                            </div>
                            <span>{message.text}</span>
                        </div>
                    )}

                    {/* STEP 1 — EMAIL VERIFICATION */}
                    {step === 1 && (
                        <section className="nobuMatsuhisaPanel">
                            <div className="hestonBlumenthalIllustration"></div>
                            <h2 className="grantAchatzHeading">Account Verification</h2>

                            <p className="massimoBotturaDescription">
                                Enter your registered email address to initiate secure password reset
                            </p>

                            <div className="emerilLagasseField">
                                <label className="anthonyBourdainLabel">Email Address</label>
                                <input
                                    className="wolfgangPuckInput"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@yourusername.com"
                                    aria-label="email address"
                                    disabled={loading}
                                />
                            </div>

                            <div className="marcoPierreWhiteActions">
                                <button className="guyFieriButton primary" onClick={handleSendOtp} disabled={loading}>
                                    {loading ? (
                                        <>
                                            <div className="thomasKellerSpinner"></div>
                                            Initiating Security Protocol...
                                        </>
                                    ) : (
                                        "Send Verification Code"
                                    )}
                                </button>
                            </div>
                        </section>
                    )}

                    {/* STEP 2 — OTP VERIFICATION */}
                    {step === 2 && (
                        <section className="nobuMatsuhisaPanel">
                            <div className="hestonBlumenthalIllustration">🔐</div>
                            <h2 className="grantAchatzHeading">Two-Factor Authentication</h2>
                            <p className="massimoBotturaDescription">
                                Enter the 6-digit verification code sent to <strong>{email}</strong>
                            </p>

                            <div className="emerilLagasseField">
                                <label className="anthonyBourdainLabel">Verification Code</label>
                                <div className="joelRobuchonOtpGrid" onPaste={handleOtpPaste}>
                                    {otp.map((digit, i) => (
                                        <input
                                            key={i}
                                            ref={(el) => (otpRefs.current[i] = el)}
                                            maxLength={1}
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ""))}
                                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                            className="wolfgangPuckOtpInput"
                                            aria-label={`Verification code digit ${i + 1}`}
                                            disabled={loading}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="marcoPierreWhiteActions">
                                <button className="guyFieriButton secondary" onClick={() => setStep(1)} disabled={loading}>
                                    ← Back
                                </button>
                                <button className="guyFieriButton primary" onClick={verifyOtp} disabled={loading}>
                                    {loading ? (
                                        <>
                                            <div className="thomasKellerSpinner"></div>
                                            Verifying...
                                        </>
                                    ) : (
                                        "Verify Code"
                                    )}
                                </button>
                            </div>

                            <div className="jacquesPepinFooter">
                                <button
                                    className={`alainDucasseResend ${resendCooldown > 0 ? "cooldown" : ""}`}
                                    onClick={handleResendOtp}
                                    disabled={resendCooldown > 0 || loading}
                                >
                                    {resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : "Resend Verification Code"}
                                </button>
                                <span className="paulBocuseHint">Can't find the code? Check your spam folder.</span>
                            </div>
                        </section>
                    )}

                    {/* STEP 3 — PASSWORD RESET */}
                    {step === 3 && (
                        <section className="nobuMatsuhisaPanel">
                            <div className="hestonBlumenthalIllustration"></div>
                            <h2 className="grantAchatzHeading">Create New Password</h2>
                            <p className="massimoBotturaDescription">Create a strong, unique password to secure your account</p>



                            <div className="emerilLagasseField">
                                <label className="anthonyBourdainLabel">New Password</label>
                                <input
                                    className="wolfgangPuckInput"
                                    type={showSignupPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Minimum 8 characters with complexity"
                                    aria-label="new password"
                                    disabled={loading}
                                />
                                <div className="bobbyFlayStrength">
                                    <div
                                        className={`strengthBar ${newPassword.length >= 8 &&
                                            ["@", "#", "$", "&", "^", "!", "(", ")", "-", "+", "=", "{", "}", "[", "]", "|"].some(
                                                (char) => newPassword.includes(char)
                                            )
                                            ? "active"
                                            : ""
                                            } ${newPassword.length >= 12 &&
                                                ["@", "#", "$", "&", "^", "!", "(", ")", "-", "+", "=", "{", "}", "[", "]", "|"].some(
                                                    (char) => newPassword.includes(char)
                                                )
                                                ? "strong"
                                                : ""
                                            }`}
                                    ></div>

                                    <span className="strengthLabel">
                                        {newPassword.length >= 12 &&
                                            ["@", "#", "$", "&", "^", "!", "(", ")", "-", "+", "=", "{", "}", "[", "]", "|"].some(
                                                (char) => newPassword.includes(char)
                                            )
                                            ? "Strong"
                                            : newPassword.length >= 8 &&
                                                ["@", "#", "$", "&", "^", "!", "(", ")", "-", "+", "=", "{", "}", "[", "]", "|"].some(
                                                    (char) => newPassword.includes(char)
                                                )
                                                ? "Good"
                                                : "Weak"}
                                    </span>
                                </div>

                            </div>
                            <button
                                type="button"
                                style={{
                                    float: "right",
                                    width: "70%",
                                    marginBottom: "10px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "10px"
                                }}
                                className="toggle-password"
                                onClick={() => setShowSignupPassword(!showSignupPassword)}
                            >
                                {showSignupPassword ? <> {"hide password"}  <EyeOff size={18} /> </> : <>{"show password"} <Eye size={18} /></>}
                            </button>
                            <br />
                            <br />
                            <br />
                            <div className="emerilLagasseField">
                                <label className="anthonyBourdainLabel">Confirm Password</label>
                                <input
                                    className="wolfgangPuckInput"
                                    type={showSignupPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter your new password"
                                    aria-label="confirm password"
                                    disabled={loading}
                                />
                                {confirmPassword && newPassword !== confirmPassword && <div className="anthonyBourdainError">Passwords do not match</div>}
                            </div>

                            <div className="marcoPierreWhiteActions">
                                <button className="guyFieriButton secondary" onClick={() => setStep(2)} disabled={loading}>
                                    ← Back
                                </button>
                                <button className="guyFieriButton primary" onClick={handleResetPassword} disabled={loading || newPassword !== confirmPassword}>
                                    {loading ? (
                                        <>
                                            <div className="thomasKellerSpinner"></div>
                                            Securing Account...
                                        </>
                                    ) : (
                                        "Update Password"
                                    )}
                                </button>
                            </div>

                            <div className="jacquesPepinFooter">
                                <a href="/login" className="reneRedzepiLink">
                                    ← Return to Secure Login
                                </a>
                            </div>
                        </section>
                    )}
                </main>

                <footer className="thomasKellerFooter">
                    <div className="ferranAdriaSecurity">
                        <span className="wolfgangPuckBadge">🛡️</span>
                        <div className="grantAchatzSecurityInfo">
                            <strong>Enterprise-Grade Encryption</strong>
                            <span>AES-256 • TLS 1.3 • Zero-Knowledge Protocol</span>
                        </div>
                    </div>
                    <div className="massimoBotturaLegal">
                        <span>© {new Date().getFullYear()} WICIKI ENTERPRISE</span>
                        <span>•</span>
                        <span>GDPR Compliant</span>
                        <span>•</span>
                        <span>SOC 2 Certified</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ResetPassword;

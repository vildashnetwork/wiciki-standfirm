import React, { useState, useRef, useEffect } from "react";
import "./ResetPassword.css";

const ResetPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [resendCooldown, setResendCooldown] = useState(0);

    const otpRefs = Array.from({ length: 6 }, () => useRef(null));

    // Cooldown timer for resend OTP
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const resetAll = () => {
        setStep(1);
        setEmail("");
        setOtp(["", "", "", "", "", ""]);
        setNewPassword("");
        setConfirmPassword("");
        setMessage({ text: "", type: "" });
    };

    const handleSendOtp = async () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage({ text: "Please enter a valid email address.", type: "error" });
            return;
        }

        setMessage({ text: "Sending secure verification code...", type: "info" });
        setLoading(true);

        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);
        setStep(2);
        setResendCooldown(30);
        setMessage({
            text: `Verification code sent to ${email}. Use 123456 for demonstration purposes.`,
            type: "success"
        });

        setTimeout(() => otpRefs[0].current?.focus(), 100);
    };

    const handleResendOtp = () => {
        if (resendCooldown > 0) return;
        handleSendOtp();
    };

    const handleOtpChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;
        const next = [...otp];
        next[index] = value;
        setOtp(next);
        if (value && index < otpRefs.length - 1) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const handleOtpKeyDown = (index, ev) => {
        if (ev.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
        if (ev.key === "ArrowLeft" && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
        if (ev.key === "ArrowRight" && index < otpRefs.length - 1) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const verifyOtp = () => {
        const code = otp.join("");
        if (code.length < 6) {
            setMessage({ text: "Please enter the complete 6-digit verification code.", type: "error" });
            return;
        }
        if (code !== "123456") {
            setMessage({ text: "Invalid verification code. Try 123456 for demonstration.", type: "error" });
            return;
        }
        setMessage({ text: "Identity verified successfully. Please set your new password.", type: "success" });
        setStep(3);
    };

    const handleResetPassword = () => {
        if (newPassword.length < 8) {
            setMessage({ text: "Password must be at least 8 characters for security.", type: "error" });
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage({ text: "Passwords do not match. Please verify your entries.", type: "error" });
            return;
        }

        setLoading(true);
        setMessage({ text: "Securely updating your credentials...", type: "info" });

        setTimeout(() => {
            setLoading(false);
            setMessage({
                text: "Password successfully reset. Redirecting to secure login...",
                type: "success"
            });
            setTimeout(() => {
                resetAll();
                window.location.href = "/login";
            }, 1500);
        }, 1200);
    };

    useEffect(() => {
        const tid = setTimeout(() => {
            if (message.type === "error") {
                setMessage({ text: "", type: "" });
            }
        }, 5000);
        return () => clearTimeout(tid);
    }, [message]);

    return (
        <div className="gordonRamsayContainer">
            {/* Premium Background Elements */}
            <div className="thomasKellerBackground"></div>
            <div className="alainDucasseParticles"></div>
            <div className="joelRobuchonGrid"></div>

            <div className="massimoBotturaCard">
                {/* Luxury Header */}
                <header className="reneRedzepiHeader">
                    <div className="ferranAdriaCrown">
                        <div className="wolfgangPuckGem"></div>
                        <div className="wolfgangPuckGem"></div>
                        <div className="wolfgangPuckGem"></div>
                    </div>
                    <h1 className="grantAchatzTitle">Secure Password Reset</h1>
                    <p className="yannickAllenoSubtitle">Enterprise-Grade Security Protocol</p>
                </header>

                {/* Progress Indicator */}
                <div className="alainPassardProgress">
                    <div className={`dominiqueCrennStep ${step >= 1 ? 'active' : ''}`}>
                        <div className="emerilLagasseIndicator">
                            <span className="bobbyFlayNumber">1</span>
                            <div className="guyFieriGlow"></div>
                        </div>
                        <span className="paulBocuseLabel"></span>
                    </div>
                    <div className={`dominiqueCrennStep ${step >= 2 ? 'active' : ''}`}>
                        <div className="emerilLagasseIndicator">
                            <span className="bobbyFlayNumber">2</span>
                            <div className="guyFieriGlow"></div>
                        </div>
                        <span className="paulBocuseLabel"></span>
                    </div>
                    <div className={`dominiqueCrennStep ${step >= 3 ? 'active' : ''}`}>
                        <div className="emerilLagasseIndicator">
                            <span className="bobbyFlayNumber">3</span>
                            <div className="guyFieriGlow"></div>
                        </div>
                        <span className="paulBocuseLabel"></span>
                    </div>
                </div>

                <main className="danielBouludContent">
                    {message.text && (
                        <div className={`jacquesPepinMessage ${message.type === "error" ? "error" : message.type === "success" ? "success" : "info"}`}>
                            <div className="davidChangIcon">
                                {message.type === "error" ? "⚠️" : message.type === "success" ? "✅" : "ℹ️"}
                            </div>
                            <span>{message.text}</span>
                        </div>
                    )}

                    {/* STEP 1 — EMAIL VERIFICATION */}
                    {step === 1 && (
                        <section className="nobuMatsuhisaPanel">

                            <div className="hestonBlumenthalIllustration">📧</div>
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
                                    onChange={(e) => setEmail(e.target.value.trim())}
                                    placeholder="example@yourusername.com"
                                    aria-label="email address"
                                    disabled={loading}
                                />
                            </div>

                            <div className="marcoPierreWhiteActions">
                                <button
                                    className="guyFieriButton primary"
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                >
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
                                <div className="joelRobuchonOtpGrid">
                                    {otp.map((digit, i) => (
                                        <input
                                            key={i}
                                            ref={otpRefs[i]}
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
                                <button
                                    className="guyFieriButton secondary"
                                    onClick={() => setStep(1)}
                                    disabled={loading}
                                >
                                    ← Back
                                </button>
                                <button
                                    className="guyFieriButton primary"
                                    onClick={verifyOtp}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <div className="thomasKellerSpinner"></div>
                                            Verifying...
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </button>
                            </div>

                            <div className="jacquesPepinFooter">
                                <button
                                    className={`alainDucasseResend ${resendCooldown > 0 ? 'cooldown' : ''}`}
                                    onClick={handleResendOtp}
                                    disabled={resendCooldown > 0 || loading}
                                >
                                    {resendCooldown > 0
                                        ? `Resend available in ${resendCooldown}s`
                                        : 'Resend Verification Code'
                                    }
                                </button>
                                <span className="paulBocuseHint">
                                    Can't find the code? Check your spam folder.
                                </span>
                            </div>
                        </section>
                    )}

                    {/* STEP 3 — PASSWORD RESET */}
                    {step === 3 && (
                        <section className="nobuMatsuhisaPanel">
                            <div className="hestonBlumenthalIllustration">🔄</div>
                            <h2 className="grantAchatzHeading">Create New Password</h2>
                            <p className="massimoBotturaDescription">
                                Create a strong, unique password to secure your account
                            </p>

                            <div className="emerilLagasseField">
                                <label className="anthonyBourdainLabel">New Password</label>
                                <input
                                    className="wolfgangPuckInput"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Minimum 8 characters with complexity"
                                    aria-label="new password"
                                    disabled={loading}
                                />
                                <div className="bobbyFlayStrength">
                                    <div
                                        className={`strengthBar ${newPassword.length >= 8 ? 'active' : ''} ${newPassword.length >= 12 ? 'strong' : ''}`}
                                    ></div>
                                    <span className="strengthLabel">
                                        {newPassword.length >= 12 ? 'Strong' : newPassword.length >= 8 ? 'Good' : 'Weak'}
                                    </span>
                                </div>
                            </div>

                            <div className="emerilLagasseField">
                                <label className="anthonyBourdainLabel">Confirm Password</label>
                                <input
                                    className="wolfgangPuckInput"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter your new password"
                                    aria-label="confirm password"
                                    disabled={loading}
                                />
                                {confirmPassword && newPassword !== confirmPassword && (
                                    <div className="anthonyBourdainError">Passwords do not match</div>
                                )}
                            </div>

                            <div className="marcoPierreWhiteActions">
                                <button
                                    className="guyFieriButton secondary"
                                    onClick={() => setStep(2)}
                                    disabled={loading}
                                >
                                    ← Back
                                </button>
                                <button
                                    className="guyFieriButton primary"
                                    onClick={handleResetPassword}
                                    disabled={loading || newPassword !== confirmPassword}
                                >
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

                {/* Luxury Security Footer */}
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
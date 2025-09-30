import React, { useState } from "react";
import "./login.css"; // move all your <style> CSS here
import { PhoneCallIcon } from "lucide-react";

const LoginPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  // form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // loading states
  const [loading, setLoading] = useState({ login: false, signup: false });

  // validation helpers
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;
  const validateName = (name) => name.trim().length >= 2;

  const handleLogin = (e) => {
    e.preventDefault();
    // setLoading({ ...loading, login: true });
    // setTimeout(() => {
    //   setLoading({ ...loading, login: false });
    //   alert("Demo: Login successful! This is a UI mockup.");
    // }, 2000);
    localStorage.setItem("token", "sample")
    window.location.href = "/questions"
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading({ ...loading, signup: true });
    setTimeout(() => {
      setLoading({ ...loading, signup: false });
      alert("Demo: Account created successfully! This is a UI mockup.");
    }, 2000);
  };

  return (
    <div className="container-login">
      {/* Left Brand Panel */}
      <div className="brand-panel">
        <div className="brand-content">
          <div className="logo" >
            {/* <ion-icon name="rocket-outline"></ion-icon> */}
          </div>
          <h1 className="brand-title">WICIKI MEDIA</h1>
          <p className="brand-tagline">
            Connect, share, and discover amazing content with people who matter
            most
          </p>

          <ul className="benefits1">
            <li className="benefit-item">
              <div className="benefit-icon">
                <ion-icon name="shield-checkmark-outline"></ion-icon>
              </div>
              <span>End-to-end encrypted messaging</span>
            </li>
            <li className="benefit-item">
              <div className="benefit-icon">
                <ion-icon name="people-outline"></ion-icon>
              </div>
              <span>Smart community recommendations</span>
            </li>
            <li className="benefit-item">
              <div className="benefit-icon">
                <ion-icon name="trending-up-outline"></ion-icon>
              </div>
              <span>Real-time content discovery</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Auth Panel */}
      <div className="auth-panel">
        <div className="auth-container">
          <div className={`auth-card ${isFlipped ? "flipped" : ""}`}>
            {/* Login Form */}
            <div className="auth-form login-form">
              <div className="auth-header">
                <h2 className="auth-title">Welcome back</h2>
                <p className="auth-subtitle">
                  Sign in to your account to continue
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-input"
                    placeholder=" "
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}

                  />
                  <label className="form-label">Email address</label>
                  {loginEmail && !validateEmail(loginEmail) && (
                    <div className="form-error show">
                      <ion-icon name="alert-circle-outline"></ion-icon>
                      Please enter a valid email address
                    </div>
                  )}
                  {validateEmail(loginEmail) && (
                    <div className="form-success show">
                      <ion-icon name="checkmark-circle-outline"></ion-icon>
                      Email looks good!
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-input"
                    placeholder=" "
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}

                  />
                  <label className="form-label">Password</label>
                  {loginPassword && !validatePassword(loginPassword) && (
                    <div className="form-error show">
                      <ion-icon name="alert-circle-outline"></ion-icon>
                      Password must be at least 8 characters
                    </div>
                  )}
                  {validatePassword(loginPassword) && (
                    <div className="form-success show">
                      <ion-icon name="checkmark-circle-outline"></ion-icon>
                      Password strength: Good
                    </div>
                  )}
                </div>

                <button type="submit" className="btn-primary" disabled={loading.login}>
                  <span className="btn-text">
                    {loading.login ? <div className="loading"></div> : "Sign In"}
                  </span>
                </button>
              </form>

              <div className="divider">
                <span>or</span>
              </div>

              <button className="btn-google">
                <div className="google-icon"></div>
                Continue with Google
              </button>

              <div className="guest-link">
                <PhoneCallIcon size={"20"} />
                <a href="#">login with number</a>
              </div>

              <div className="auth-switch">
                Don't have an account?{" "}
                <button type="button" onClick={() => setIsFlipped(true)}>
                  Sign up
                </button>
              </div>
            </div>

            {/* Signup Form */}
            <div className="auth-form signup-form">
              <div className="auth-header">
                <h2 className="auth-title">Create account</h2>
                <p className="auth-subtitle">Join thousands of users worldwide</p>
              </div>

              <form onSubmit={handleSignup}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder=" "
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}

                  />
                  <label className="form-label">Full name</label>
                  {signupName && !validateName(signupName) && (
                    <div className="form-error show">
                      <ion-icon name="alert-circle-outline"></ion-icon>
                      Please enter your full name
                    </div>
                  )}
                  {validateName(signupName) && (
                    <div className="form-success show">
                      <ion-icon name="checkmark-circle-outline"></ion-icon>
                      Name looks good!
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className="form-input"
                    placeholder=" "
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}

                  />
                  <label className="form-label">Email address</label>
                  {signupEmail && !validateEmail(signupEmail) && (
                    <div className="form-error show">
                      <ion-icon name="alert-circle-outline"></ion-icon>
                      Please enter a valid email address
                    </div>
                  )}
                  {validateEmail(signupEmail) && (
                    <div className="form-success show">
                      <ion-icon name="checkmark-circle-outline"></ion-icon>
                      Email is available!
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-input"
                    placeholder=" "
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}

                  />
                  <label className="form-label">Password</label>
                  {signupPassword && !validatePassword(signupPassword) && (
                    <div className="form-error show">
                      <ion-icon name="alert-circle-outline"></ion-icon>
                      Password must be at least 8 characters
                    </div>
                  )}
                  {validatePassword(signupPassword) && (
                    <div className="form-success show">
                      <ion-icon name="checkmark-circle-outline"></ion-icon>
                      Password strength: Strong
                    </div>
                  )}
                </div>

                <button type="submit" className="btn-primary" disabled={loading.signup}>
                  <span className="btn-text">
                    {loading.signup ? <div className="loading"></div> : "Create Account"}
                  </span>
                </button>
              </form>

              <div className="divider">
                <span>or</span>
              </div>

              <button className="btn-google">
                <div className="google-icon"></div>
                Sign up with Google
              </button>

              <div className="guest-link">
                <PhoneCallIcon size={"20"} />
                <a href="#">login with number</a>
              </div>
              <div className="auth-switch">
                Already have an account?{" "}
                <button type="button" onClick={() => setIsFlipped(false)}>
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

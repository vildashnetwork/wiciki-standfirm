import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./login.css"; // move all your <style> CSS here
import axios from "axios";
import { PhoneCallIcon, Eye, EyeOff } from "lucide-react"; // 👈 added Eye/EyeOff
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true; // enable cookies globally
const LoginPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  // form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // toggle states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // loading states
  const [loading, setLoading] = useState({ login: false, signup: false });

  // validation helpers

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const validatePassword = (password) => {
    const specialChars = ["@", "#", "$", "&", "^", "!", "(", ")", "-", "+", "=", "{", "}", "[", "]", "|"];
    return (
      password.length >= 8 &&
      specialChars.some(char => password.includes(char))

    )
  };


  const validateName = (name) => name.trim().length >= 2;

  // helper to set cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax`;
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginEmail.length == 0 && loginPassword.length == 0) {
      setLoading((prev) => ({ ...prev, login: false }));
      return;
    }
    setLoading((prev) => ({ ...prev, login: true }));

    try {
      const response = await axios.post(
        "https://wiciki-media-backend.onrender.com/auth-user/login",
        {
          email: loginEmail,
          password: loginPassword,
        },
        {
          withCredentials: true,
        }
      );


      if (response.status === 200) {
        toast.success(response.data.message || "Login successful!");

        if (response.data.usert) {
          setCookie("token", response.data.usert, 7);
        }

        // console.log("Login success:", response.data);

        // Redirect to questions page
        navigate("/");
      } else {
        toast.error(response.data.message || "Login failed. Try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);

      // Check if the backend sent a message
      const errorMsg =
        error.response?.data?.message || "Login failed. Please check credentials.";
      toast.error(errorMsg);
    } finally {
      setLoading((prev) => ({ ...prev, login: false }));
    }
  };



  // EMAIL VALIDATION SECTION -------------------------
  const [result, setResult] = useState("");
  const [emailCorrect, setEmailCorrect] = useState(false);
  const [loadingcheck, setloadingcheck] = useState(false)
  const [signupshimmer, setsignupshimmer] = useState(false)
  // validate email from API
  const checkEmail = async (email) => {
    setloadingcheck(true)

    if (!email || !validateEmail(email)) {
      setResult("");
      setEmailCorrect(false);

      return;
    }

    setResult("Checking email validity...");

    // toast.loading("Checking email validity, please wait...", { id: "signup", duration: 4000 });


    try {
      const res = await axios.post(
        `https://wiciki-media-backend.onrender.com/verify/check-email`, {
        email
      }
      );

      const data = res.data;

      if (data.email_deliverability.status == "deliverable") {
        setResult(` ${email} is a valid and deliverable email.`);
        setEmailCorrect(true);
      } else {
        setResult(`❌ ${email} is invalid or undeliverable.`);
        setEmailCorrect(false);
      }

      // console.log("Email validation API:", data);
    } catch (err) {
      console.error("Email check error:", err.response?.data || err.message);
      setEmailCorrect(false);
      setsignupshimmer(false)
    } finally {
      setloadingcheck(false)
      setsignupshimmer(false)
    }
  };


  useEffect(() => {
    if (!signupEmail) return;
    const delay = setTimeout(() => {
      if (validateEmail(signupEmail)) checkEmail(signupEmail);
    }, 800);

    return () => clearTimeout(delay);
  }, [signupEmail]);


  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateName(signupName) && !validateEmail(signupEmail) && !validatePassword(signupPassword)) {
      toast.error("Please fill the form correctly", { id: "signup", duration: 3000 });
      return;
    }


    try {
      setsignupshimmer(true)
      setLoading({ ...loading, signup: true });
      toast.loading("Creating your account...", { id: "signup", duration: 3000 });
      if (!loadingcheck) {
        if (!emailCorrect) {
          toast.error("Please Enter and existing email", { id: "signup", duration: 3000 })
          return;
        }
      }

      const res = await axios.post(
        "https://wiciki-media-backend.onrender.com/auth-user/register",
        {
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        },
        { withCredentials: true }
      );

      setCookie("token", res.data.usertoken, 7);
      console.log("Signup response:", res.data);

      toast.success("Account created successfully!", { id: "signup", duration: 3000 });
      navigate("/questions");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed, try again.", {
        id: "signup",
        duration: 3000,
      });
    } finally {
      setLoading({ ...loading, signup: false });
    }
  };





  const [loadinggoogle, setloadinggoogle] = useState(false)

  const GoogleLogin = () => {
    setloadinggoogle(true);
    // Redirect user to your backend Google auth route
    window.location.href = "https://wiciki-media-backend.onrender.com/auth/google";
  };



  const [okay, setokay] = useState(false)

  useEffect(() => {
    const checkpass = () => {
      const specialChars = ["@", "#", "$", "&", "^", "!", "(", ")", "-", "+", "=", "{", "}", "[", "]", "|"];
      if (

        loginPassword.length >= 8 &&
        specialChars.some(char => loginPassword.includes(char))
      ) {
        setokay(true)

      } else {
        setokay(false)



      }

    }
    checkpass()


  }, [loginPassword])


  return (
    <div className="container-login">
      {/* Left Brand Panel */}
      <div className="brand-panel">
        <div className="brand-content">
          <div className="logo"></div>
          <h1 className="brand-title">WICIKI MEDIA</h1>
          <p className="brand-tagline">
            Connect, share, and discover amazing content with people who matter most
          </p>

          <ul className="benefits">
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
                <p className="auth-subtitle">Sign in to your account to continue</p>
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

                <div className="form-group password-wrapper">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    className="form-input"
                    placeholder=" "
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <label className="form-label">Password</label>



                  {loginPassword && !validatePassword(loginPassword) && (
                    <div className="form-error show">
                      <ion-icon name="alert-circle-outline"></ion-icon>
                      Password must be at least 8  characters and should mix with special symbols
                    </div>
                  )}
                  {validatePassword(loginPassword) && (
                    <div className="form-success show">
                      <ion-icon name="checkmark-circle-outline"></ion-icon>
                      Password strength: Good
                    </div>
                  )}

                </div>

                <Link
                  style={
                    {
                      float: "right",
                      width: "70%",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      color: "#e53935"

                    }
                  }
                  to="/reset"
                  // className="resetPasswordLink"
                  aria-label="Reset password"
                >
                  reset password
                </Link>
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
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                >

                  {showLoginPassword ? <> {"hide password"}  <EyeOff size={18} /> </> : <>{"show password"} <Eye size={18} /></>}
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading.login || loginEmail.length < 8 || loginPassword.length < 8 || !okay || !validateEmail(loginEmail)}
                  style={{
                    background: (loading.login || loginEmail.length < 8 || loginPassword.length < 8 || !okay || !validateEmail(loginEmail))
                      && "grey",

                    opacity: (loading.login || loginEmail.length < 8 || loginPassword.length < 8 || !okay || !validateEmail(loginEmail))
                      ? 0.5
                      : 1,
                    cursor: (loading.login || loginEmail.length < 8 || loginPassword.length < 8 || !okay || !validateEmail(loginEmail))
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  <span className="btn-text">
                    {loading.login ? <div className="loading"></div> : "Sign In"}
                  </span>
                </button>

              </form>

              <div className="divider">
                <span>or</span>
              </div>

              <button className="btn-google" onClick={GoogleLogin}>
                <div className="google-icon"></div>
                {loadinggoogle ? "loading.." : "Continue with Google"}
              </button>

              {/* <div className="guest-link">
                <PhoneCallIcon size={"20"} />
                <a href="#">login with number</a>
              </div> */}

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
                  // disabled={loadingcheck}
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
                      {/* Email is available! */}
                      {result}
                    </div>
                  )}
                </div>

                <div className="form-group password-wrapper">
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    className="form-input"
                    placeholder=" "
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  // disabled={loadingcheck}
                  />
                  <label className="form-label">Password</label>



                  {signupPassword && !validatePassword(signupPassword) && (
                    <div className="form-error show">
                      <ion-icon name="alert-circle-outline"></ion-icon>
                      Password must be at least 8 characters and should mix with special symbols
                    </div>
                  )}
                  {validatePassword(signupPassword) && (
                    <div className="form-success show">
                      <ion-icon name="checkmark-circle-outline"></ion-icon>
                      Password strength: Strong
                    </div>
                  )}
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
                <button type="submit" className="btn-primary" disabled={loading.signup}
                  style={{ backgournd: loading.signup && "grey", opacity: loading.signup && 0.5, cursor: loading.signup && "no-drop" }}>
                  <span className="btn-text">
                    {loading.signup || signupshimmer ? <div className="loading"></div> : "Create Account"}
                  </span>
                </button>
              </form>

              <div className="divider">
                <span>or</span>
              </div>

              <button className="btn-google" onClick={GoogleLogin} >
                <div className="google-icon"></div>
                {loadinggoogle ? "loading.." : "Continue with Google"}
              </button>

              {/* <div className="guest-link">
                <PhoneCallIcon size={"20"} />
                <a href="#">login with number</a>
              </div> */}
              <div className="auth-switch">
                Already have an account?{" "}
                <button type="button" onClick={() => setIsFlipped(false)}>
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default LoginPage;

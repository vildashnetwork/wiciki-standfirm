// components/Topbar.js
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
const Topbar = ({ toggleMobileMenu, navigate }) => {
  const token = Cookies.get('token');
  const [user, setuser] = useState([])
  const [loading, setloading] = useState(false)
  const navigat = useNavigate()
  useEffect(() => {
    const getuser = async () => {
      try {
        setloading(true)
        const res = await axios.get("https://wicikibackend.onrender.com/decode/me", { token })
        if (res.status == 200) {
          setuser(res.data.user)
          // console.log(res.data.user)
        } else {
          // toast.error(res.data.message)
          // navigat("/login")
          return
        }

      } catch (error) {
        console.log(error);

      } finally {
        setloading(false)
      }
    }
    getuser()
  }, [token])





  return (
    <header className="topbar">
      {/* Left: Logo + Mobile Toggle */}
      <div className="topbar-left">
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <ion-icon name="menu-outline"></ion-icon>
        </button>
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-mark"><ion-icon name="globe-outline" ></ion-icon></span>
          <span className="logo-text">WICIKI</span>
        </div>
      </div>

      {/* Center: Quick Actions */}
      <nav className="quick-actions">
        <button
          className="quick-btn"
          onClick={() => alert("Post Gist feature would open a modal here!")}
        >
          <ion-icon name="create-outline"></ion-icon>
          Post Gist
        </button>
        <button className="quick-btn" onClick={() => navigate("/goals")}>
          <ion-icon name="flag-outline"></ion-icon>
          Goals
        </button>
        <button className="quick-btn" onClick={() => navigate("/mentors")}>
          <ion-icon name="people-outline"></ion-icon>
          Mentors
        </button>
      </nav>

      {/* Right: Search + Notifications + Profile */}
      <div className="topbar-right">
        <div className="search-box">
          <ion-icon name="search-outline"></ion-icon>
          <input type="text" className="witdth-search" placeholder="Search..." />
        </div>
        <button className="icon-btn">
          <ion-icon name="notifications-outline"></ion-icon>
        </button>
        <div
          className={loading ? "shimmer" : "profile-avatar"}
          onClick={() => !user?.name ? "" : navigate(`/profile/${encodeURIComponent(user?.name)}`)}
          title="View Profile"
          aria-disabled={loading || !user?.name}
        >
          <img src={user?.picture} style={{ display: loading ? "none" : "block" }} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;

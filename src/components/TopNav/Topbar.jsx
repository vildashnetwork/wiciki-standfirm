// components/Topbar.js
import React from "react";

const Topbar = ({ toggleMobileMenu, navigate }) => {
  return (
    <header className="topbar">
      {/* Left: Logo + Mobile Toggle */}
      <div className="topbar-left">
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <ion-icon name="menu-outline"></ion-icon>
        </button>
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-mark">🌐</span>
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
          className="profile-avatar"
          onClick={() => navigate("/profile")}
          title="View Profile"
        >
          AK
        </div>
      </div>
    </header>
  );
};

export default Topbar;

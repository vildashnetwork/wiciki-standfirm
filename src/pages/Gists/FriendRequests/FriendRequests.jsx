import React, { useEffect, useState } from "react";
import './FriendRequests.css';

const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },
};

// Use reliable public images
const initialRequests = [
  { id: 1, name: "John Smith", mutualFriends: 2, imageUrl: "https://randomuser.me/api/portraits/men/32.jpg", time: "2 hrs ago" },
  { id: 2, name: "Lisa Brown", mutualFriends: 5, imageUrl: "https://res.cloudinary.com/dbq5gkepx/image/upload/v1756974124/w3tey25aflrc2cl7cpip.jpg", time: "5 hrs ago" },
  { id: 3, name: "Michael Lee", mutualFriends: 3, imageUrl: "https://randomuser.me/api/portraits/men/65.jpg", time: "1 day ago" },
  { id: 4, name: "Sarah Johnson", mutualFriends: 4, imageUrl: "https://randomuser.me/api/portraits/women/21.jpg", time: "2 days ago" },
  { id: 5, name: "Amina Kou", mutualFriends: 6, imageUrl: "https://randomuser.me/api/portraits/women/55.jpg", time: "3 days ago" },
];

// Preload image to ensure it exists
const preloadImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
    img.onerror = () => reject(url);
  });

export default function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function loadRequests() {
      const stored = storage.get("friendRequests");
      if (stored && Array.isArray(stored)) {
        setRequests(stored);
        return;
      }

      // Preload all images and fallback if failed
      const loadedRequests = await Promise.all(
        initialRequests.map(async (r) => {
          try {
            await preloadImage(r.imageUrl);
            return r;
          } catch {
            const initials = r.name.split(" ").map(n => n[0]).join("").toUpperCase();
            return { ...r, imageUrl: `https://via.placeholder.com/48/555/fff?text=${initials}` };
          }
        })
      );

      setRequests(loadedRequests);
    }

    loadRequests();
  }, []);

  useEffect(() => {
    if (requests.length > 0) storage.set("friendRequests", requests);
  }, [requests]);

  const handleAccept = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    // Show confirmation
    const toast = document.createElement('div');
    toast.className = 'premium-toast';
    toast.textContent = 'Friend request accepted';
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2000);
    }, 10);
  };

  const handleDecline = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    // Show confirmation
    const toast = document.createElement('div');
    toast.className = 'premium-toast';
    toast.textContent = 'Friend request declined';
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2000);
    }, 10);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (requests.length === 0) {
    return (
      <div className="premium-friend-requests-card">
        <div className="premium-requests-header">
          <h3 className="premium-requests-title">
            <ion-icon name="people"></ion-icon>
            Calls
          </h3>
        </div>
        <div className="premium-empty-state">
          <div className="premium-empty-icon">
            <ion-icon name="person-add"></ion-icon>
          </div>
          <p className="premium-empty-text">No pending friend requests</p>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-friend-requests-card">
      <div className="premium-requests-header">
        <h3 className="premium-requests-title">
          <ion-icon name="people"></ion-icon>
          Calls <span className="premium-requests-count">{requests.length}</span>
        </h3>
        <button className="premium-expand-btn" onClick={toggleExpand}>
          <ion-icon name={isExpanded ? "chevron-up" : "chevron-down"}></ion-icon>
        </button>
      </div>

      <div className={`premium-requests-list ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {requests.map(req => (
          <div key={req.id} className="premium-request-item">
            <div className="premium-request-content">
              <img
                src={req.imageUrl}
                alt={`${req.name} avatar`}
                className="premium-request-avatar"
                loading="lazy"
              />
              <div className="premium-request-info">
                <div className="premium-request-name">{req.name}</div>
                <div className="premium-request-mutual">
                  <ion-icon name="people"></ion-icon>
                  {req.mutualFriends} mutual friends
                </div>
                <div className="premium-request-time">{req.time}</div>
              </div>
            </div>
            <div className="premium-request-actions">
              <button className="premium-btn-confirm" onClick={() => handleAccept(req.id)}>
                <ion-icon name="checkmark"></ion-icon>
                Confirm
              </button>
              <button className="premium-btn-delete" onClick={() => handleDecline(req.id)}>
                <ion-icon name="close"></ion-icon>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {!isExpanded && requests.length > 2 && (
        <div className="premium-requests-footer" onClick={toggleExpand}>
          <span>View all requests</span>
          <ion-icon name="chevron-down"></ion-icon>
        </div>
      )}
    </div>
  );
}
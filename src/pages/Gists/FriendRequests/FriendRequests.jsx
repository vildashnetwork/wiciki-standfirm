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
  { id: 1, name: "John Smith", mutualFriends: 2, imageUrl: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Lisa Brown", mutualFriends: 5, imageUrl: "https://res.cloudinary.com/dbq5gkepx/image/upload/v1756974124/w3tey25aflrc2cl7cpip.jpg" },
  { id: 3, name: "Michael Lee", mutualFriends: 3, imageUrl: "https://randomuser.me/api/portraits/men/65.jpg" },
  { id: 4, name: "Sarah Johnson", mutualFriends: 4, imageUrl: "https://randomuser.me/api/portraits/women/21.jpg" },
  { id: 5, name: "Amina Kou", mutualFriends: 6, imageUrl: "https://randomuser.me/api/portraits/women/55.jpg" },
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

  const handleAccept = (id) => setRequests(prev => prev.filter(r => r.id !== id));
  const handleDecline = (id) => setRequests(prev => prev.filter(r => r.id !== id));

  if (requests.length === 0) {
    return (
      <div className="friend-requests-card">
        <h3 className="friend-requests-title">Friend Requests</h3>
        <p className="text-muted">No pending friend requests</p>
      </div>
    );
  }

  return (
    <div className="friend-requests-card">
      <h3 className="friend-requests-title">Friend Requests ({requests.length})</h3>
      <div className="friend-requests-list">
        {requests.map(req => (
          <div key={req.id} className="friend-request-item">
            <img
              src={req.imageUrl}
              alt={`${req.name} avatar`}
              className="avatar"
              loading="lazy"
            />
            <div className="friend-info">
              <div className="friend-name">{req.name}</div>
              <div className="friend-mutual">{req.mutualFriends} mutual friends</div>
              <div className="friend-actions">
                <button className="btn-confirm" onClick={() => handleAccept(req.id)}>Confirm</button>
                <button className="btn-delete" onClick={() => handleDecline(req.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

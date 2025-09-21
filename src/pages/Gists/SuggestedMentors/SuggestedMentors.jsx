import React, { useEffect, useState } from "react";
import "./SuggestedMentors.css";

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

// Initial mentors with reliable images
const initialMentors = [
  {
    id: 1,
    name: "Dr. Amanda Wilson",
    role: "Senior Software Engineer",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    connected: false,
    expertise: ["JavaScript", "React", "Node.js"],
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    name: "Mark Rodriguez",
    role: "Product Manager",
    imageUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    connected: false,
    expertise: ["Product Strategy", "UX Research", "Agile"],
    rating: 4.7,
    reviews: 92,
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "UI/UX Designer",
    imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    connected: false,
    expertise: ["Figma", "User Research", "Design Systems"],
    rating: 4.8,
    reviews: 114,
  },
];

const preloadImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
    img.onerror = () => reject(url);
  });

export default function SuggestedMentors() {
  const [mentors, setMentors] = useState([]);
  const [expandedMentor, setExpandedMentor] = useState(null);

  useEffect(() => {
    async function loadMentors() {
      const stored = storage.get("mentors");
      if (stored && Array.isArray(stored)) {
        setMentors(stored);
        return;
      }

      const loadedMentors = await Promise.all(
        initialMentors.map(async (m) => {
          try {
            await preloadImage(m.imageUrl);
            return m;
          } catch {
            const initials = m.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();
            return { ...m, imageUrl: `https://via.placeholder.com/46/555/fff?text=${initials}` };
          }
        })
      );

      setMentors(loadedMentors);
    }

    loadMentors();
  }, []);

  useEffect(() => {
    if (Array.isArray(mentors) && mentors.length > 0) storage.set("mentors", mentors);
  }, [mentors]);

  const handleConnect = (id) => {
    setMentors(
      mentors.map((m) => (m.id === id ? { ...m, connected: true } : m))
    );

    const toast = document.createElement("div");
    toast.className = "premium-toast";
    toast.textContent = "Connection request sent";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2000);
    }, 10);
  };

  const toggleExpandMentor = (id) => {
    setExpandedMentor(expandedMentor === id ? null : id);
  };

  return (
    <div className="premium-mentors-card">
      <div className="premium-mentors-header">
        <h3 className="premium-mentors-title">
          <ion-icon name="rocket"></ion-icon>
          Mentors
        </h3>
        <button className="premium-view-all">
          View All <ion-icon name="arrow-forward"></ion-icon>
        </button>
      </div>

      <div className="premium-mentors-list">
        {(mentors || []).map((mentor) => (
          <div
            key={mentor.id}
            className={`premium-mentor-item ${expandedMentor === mentor.id ? "expanded" : ""}`}
          >
            <div className="premium-mentor-main">
              <div className="premium-mentor-avatar">
                <img src={mentor.imageUrl} alt={mentor.name} />
                <div className="premium-mentor-status"></div>
              </div>

              <div className="premium-mentor-info">
                <div className="premium-mentor-name">{mentor.name}</div>
                <div className="premium-mentor-role">{mentor.role}</div>
                <div className="premium-mentor-rating">
                  <div className="premium-rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <ion-icon
                        key={i}
                        name={i < Math.floor(mentor.rating) ? "star" : "star-half"}
                        style={{ color: i < mentor.rating ? "#FFD700" : "#555" }}
                      ></ion-icon>
                    ))}
                  </div>
                  <span className="premium-rating-value">{mentor.rating}</span>
                </div>
              </div>

              <button
                className="premium-expand-mentor"
                onClick={() => toggleExpandMentor(mentor.id)}
              >
                <ion-icon
                  name={expandedMentor === mentor.id ? "chevron-up" : "chevron-down"}
                ></ion-icon>
              </button>
            </div>

            <div className="premium-mentor-details">
              <div className="premium-mentor-expertise">
                <h4>Areas of Expertise</h4>
                <div className="premium-expertise-tags">
                  {(mentor.expertise || []).map((skill, index) => (
                    <span key={index} className="premium-expertise-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <button
                className={`premium-connect-btn ${mentor.connected ? "connected" : ""}`}
                onClick={() => handleConnect(mentor.id)}
                disabled={mentor.connected}
              >
                {mentor.connected ? (
                  <>
                    <ion-icon name="checkmark"></ion-icon>
                    Request Sent
                  </>
                ) : (
                  <>
                    <ion-icon name="person-add"></ion-icon>
                    Connect
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

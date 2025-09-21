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
  },
  {
    id: 2,
    name: "Mark Rodriguez",
    role: "Product Manager",
    imageUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    connected: false,
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "UI/UX Designer",
    imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    connected: false,
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
            // fallback to initials if image fails
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
    if (mentors.length > 0) storage.set("mentors", mentors);
  }, [mentors]);

  const handleConnect = (id) => {
    setMentors(
      mentors.map((m) =>
        m.id === id ? { ...m, connected: true } : m
      )
    );
  };

  return (
    <div className="cardsuggest sidebar-section">
      <div className="card-padding">
        <h3 className="sidebar-title">Suggested Mentors</h3>
        <div className="mentor-list">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="mentor-suggestion">
              <div className="avatar">
                <img src={mentor.imageUrl} alt={mentor.name} />
              </div>
              <div className="mentor-info">
                <div className="mentor-name">{mentor.name}</div>
                <div className="mentor-role">{mentor.role}</div>
                <button
                  className={mentor.connected ? "btn-secondary" : "btn-primary"}
                  onClick={() => handleConnect(mentor.id)}
                  disabled={mentor.connected}
                >
                  {mentor.connected ? "Pending" : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

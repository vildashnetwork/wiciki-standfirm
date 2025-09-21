import { useEffect, useState } from "react";
import "./SuggestedMentors.css";

const SuggestedMentors = () => {
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

  const [mentors, setMentors] = useState(() => {
    return (
      storage.get("mentors") || [
        {
          id: 1,
          name: "Dr. Amanda Wilson",
          avatar: "👩‍💼",
          role: "Senior Software Engineer",
          connected: false,
        },
        {
          id: 2,
          name: "Mark Rodriguez",
          avatar: "👨‍💼",
          role: "Product Manager",
          connected: false,
        },
      ]
    );
  });

  useEffect(() => {
    storage.set("mentors", mentors);
  }, [mentors]);

  const handleConnect = (id) => {
    setMentors(
      mentors.map((mentor) =>
        mentor.id === id ? { ...mentor, connected: true } : mentor
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
                <span>{mentor.avatar}</span>
              </div>
              <div className="mentor-info">
                <div className="mentor-name">{mentor.name}</div>
                <div className="mentor-role">{mentor.role}</div>
                <button
                  className={mentor.connected ? "btn-secondary" : "btn-primary "}
                  onClick={() => handleConnect(mentor.id)}
                  disabled={mentor.connected}
                  id="reduce"
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
};

export default SuggestedMentors;

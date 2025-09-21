import { useEffect, useState } from "react";
import "./FriendRequests.css";

const FriendRequests = () => {
  const storage = {
    get: (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    },
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }
  };

  const [requests, setRequests] = useState(() => {
    return storage.get('friendRequests') || [
      { id: 1, name: 'John Smith', avatar: '👨', mutualFriends: 2 },
      { id: 2, name: 'Lisa Brown', avatar: '👩', mutualFriends: 5 },
      { id: 3, name: 'Michael Lee', avatar: '👨‍🦱', mutualFriends: 3 },
      { id: 4, name: 'Sarah Johnson', avatar: '👩‍🦰', mutualFriends: 4 }
    ];
  });

  useEffect(() => {
    storage.set('friendRequests', requests);
  }, [requests]);

  const handleAccept = (id) => setRequests(requests.filter(req => req.id !== id));
  const handleDecline = (id) => setRequests(requests.filter(req => req.id !== id));

  return (
    <div className="friend-requests-card">
      <h3 className="friend-requests-title">Friend Requests</h3>
      <div className="friend-requests-list">
        {requests.map(request => (
          <div key={request.id} className="friend-request-item">
            <div className="avatar">{request.avatar}</div>
            <div className="friend-info">
              <div className="friend-name">{request.name}</div>
              <div className="friend-mutual">{request.mutualFriends} mutual friends</div>
              <div className="friend-actions">
                <button className="btn-confirm" onClick={() => handleAccept(request.id)}>Confirm</button>
                <button className="btn-delete" onClick={() => handleDecline(request.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;

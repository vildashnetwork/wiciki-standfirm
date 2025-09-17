// pages/CallsPage.js
import React, { useState } from 'react';

const CallsPage = () => {
  const [calls, setCalls] = useState([
    {
      id: 1,
      avatar: 'SA',
      name: 'Sarah Akinyi',
      skills: ['Frontend Development'],
      bio: 'Wants to connect and collaborate on React projects',
      status: 'pending' // pending, accepted, declined
    }
  ]);

  const acceptCall = (id) => {
    setCalls(calls.map(call => 
      call.id === id ? { ...call, status: 'accepted' } : call
    ));
  };

  const declineCall = (id) => {
    setCalls(calls.map(call => 
      call.id === id ? { ...call, status: 'declined' } : call
    ));
  };

  return (
    <div id="calls" className="page">
      <h2 style={{
        marginBottom: '32px', 
        fontSize: '28px', 
        background: 'linear-gradient(45deg, var(--accent-gold), var(--accent-orange))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Connection Requests
      </h2>
      <div className="reachouts-grid">
        {calls.map(call => (
          <div key={call.id} className="reachout-card">
            <div className="reachout-avatar">{call.avatar}</div>
            <h3>{call.name}</h3>
            <div className="skill-tags" style={{ margin: '16px 0', justifyContent: 'center' }}>
              {call.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{call.bio}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {call.status === 'pending' ? (
                <>
                  <button className="quick-btn" onClick={() => acceptCall(call.id)}>Accept</button>
                  <button className="action-btn" onClick={() => declineCall(call.id)}>Decline</button>
                </>
              ) : (
                <button className={`quick-btn ${call.status === 'accepted' ? 'connected' : 'declined'}`} disabled>
                  {call.status === 'accepted' ? 'Connected!' : 'Declined'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallsPage;
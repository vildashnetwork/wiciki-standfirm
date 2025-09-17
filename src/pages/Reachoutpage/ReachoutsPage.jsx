// pages/ReachoutsPage.js
import React, { useState } from 'react';

const ReachoutsPage = () => {
  const [reachouts, setReachouts] = useState([
    {
      id: 1,
      avatar: 'TM',
      name: 'Tunde Adebayo',
      skills: ['Data Science', 'Python'],
      bio: 'Building ML models for financial inclusion across West Africa',
      status: 'connect' // connect, pending, connected
    },
    {
      id: 2,
      avatar: 'LN',
      name: 'Lila Nyong\'o',
      skills: ['Product Design', 'Research'],
      bio: 'Creating user-centered designs for African mobile experiences',
      status: 'connect'
    },
    {
      id: 3,
      avatar: 'OM',
      name: 'Omar Hassan',
      skills: ['Blockchain', 'Fintech'],
      bio: 'Developing decentralized payment solutions for rural communities',
      status: 'connect'
    }
  ]);

  const reachOut = (id) => {
    setReachouts(reachouts.map(reachout => 
      reachout.id === id ? { ...reachout, status: 'pending' } : reachout
    ));
    
    // Simulate connection after a delay
    setTimeout(() => {
      setReachouts(reachouts.map(reachout => 
        reachout.id === id ? { ...reachout, status: 'connected' } : reachout
      ));
    }, 1500);
  };

  return (
    <div id="reachouts" className="page">
      <h2 style={{
        marginBottom: '32px', 
        fontSize: '28px', 
        background: 'linear-gradient(45deg, var(--accent-gold), var(--accent-orange))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Discover Talent
      </h2>
      <div className="reachouts-grid">
        {reachouts.map(reachout => (
          <div key={reachout.id} className="reachout-card">
            <div className="reachout-avatar">{reachout.avatar}</div>
            <h3>{reachout.name}</h3>
            <div className="skill-tags" style={{ margin: '16px 0', justifyContent: 'center' }}>
              {reachout.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{reachout.bio}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                className={`quick-btn ${reachout.status !== 'connect' ? 'connected' : ''}`}
                onClick={() => reachOut(reachout.id)}
                disabled={reachout.status !== 'connect'}
              >
                {reachout.status === 'connect' ? 'Reachout' : 
                 reachout.status === 'pending' ? 'Pending...' : 'Connected'}
              </button>
              <button className="action-btn">Call</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReachoutsPage;
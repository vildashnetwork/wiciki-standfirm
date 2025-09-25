// pages/ReachoutsPage.js
import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import ChatBox from './ChatBox'; // your separate component
import './Reachout.css';
import CallModal from './CallModal';

const ReachoutsPage = () => {
  const [reachouts, setReachouts] = useState([
  {
    id: 1,
    avatar: 'TM',
    name: 'Tunde Adebayo',
    skills: ['Data Science', 'Python'],
    bio: 'Building ML models for financial inclusion across West Africa',
    status: 'connect',
    availability: 'online' // online, busy, offline
  },
  {
    id: 2,
    avatar: 'LN',
    name: 'Lila Nyong\'o',
    skills: ['Product Design', 'Research'],
    bio: 'Creating user-centered designs for African mobile experiences',
    status: 'connect',
    availability: 'busy'
  },
  {
    id: 3,
    avatar: 'OM',
    name: 'Omar Hassan',
    skills: ['Blockchain', 'Fintech'],
    bio: 'Developing decentralized payment solutions for rural communities',
    status: 'connect',
    availability: 'offline'
  }
]);


  const [openChats, setOpenChats] = useState({});
  const [activeCall, setActiveCall] = useState(null);

  const reachOut = (id) => {
    setReachouts(reachouts.map(reachout =>
      reachout.id === id ? { ...reachout, status: 'pending' } : reachout
    ));

    setTimeout(() => {
      setReachouts(reachouts.map(reachout =>
        reachout.id === id ? { ...reachout, status: 'connected' } : reachout
      ));
    }, 1500);

    setOpenChats(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div id="reachouts" className="page1">
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
          <div key={reachout.id} style={{ position: 'relative' }}>
            <ProfileCard
              avatar={reachout.avatar}
              name={reachout.name}
              skills={reachout.skills}
              bio={reachout.bio}
              status={reachout.status}
              onReachout={() => reachOut(reachout.id, reachout.name)}
               availability={reachout.availability}
               onCall={() => setActiveCall(reachout)}
            />
            {openChats[reachout.id] && (
              <ChatBox
                name={reachout.name}
                onClose={() =>
                  setOpenChats(prev => ({ ...prev, [reachout.id]: false }))
                }
              />
            )}
            {activeCall && (
  <CallModal
    name={activeCall.name}
    avatar={activeCall.avatar}
    onClose={() => setActiveCall(null)}
  />
)}

          </div>
        ))}
      </div>
                   {Array.from({ length: 12 }).map((_, i) => (
  <div key={i} className="sparkle" style={{
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`
  }} />
))}
    </div>
  );
};

export default ReachoutsPage;



import React, { useState } from 'react';
import './CallsPage.css';

const CallsPage = () => {
    const [calls, setCalls] = useState([
        { 
            id: 1, 
            name: 'Broskii', 
            skill: 'MERN Expert', 
            message: 'Wants to Catch and discuss a collaboration on the WICIKI backend.', 
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a56d9007f7c?q=80&w=150&h=150&auto=format&fit=crop'
        },
        { 
            id: 2, 
            name: 'Lewis', 
            skill: 'UI/UX Designer', 
            message: 'Looking to Catch you for a UI/UX project.', 
            avatarUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=150&h=150&auto=format&fit=crop'
        },
        { 
            id: 3, 
            name: 'Amanda', 
            skill: 'Digital Marketer', 
            message: 'Wants to Catch you to discuss marketing strategies.', 
            avatarUrl: 'https://images.unsplash.com/photo-1534528736603-ba140bdc8230?q=80&w=150&h=150&auto=format&fit=crop'
        },
    ]);

    const handleAccept = (callId) => {
        console.log(`Accepted call from user with ID: ${callId}`);
        setCalls(calls.filter(call => call.id !== callId));
    };

    const handleDecline = (callId) => {
        console.log(`Declined call from user with ID: ${callId}`);
        setCalls(calls.filter(call => call.id !== callId));
    };

    return (
        <div className="calls-page-container">
            <h1 className="page-title">Incoming Calls</h1>
            <p className="section-description">Manage new professional connections who want to Catch you.</p>

            {calls.length > 0 ? (
                calls.map(call => (
                    <div key={call.id} className="call-card">
                        <div className="profile-info">
                            <div className="profile-avatar-placeholder">
                                <img src={call.avatarUrl} alt={`${call.name}'s profile picture`} />
                            </div>
                            <div className="user-details">
                                <span className="user-name">{call.name}</span>
                                <span className="user-skill">{call.skill}</span>
                                <p className="user-message">{call.message}</p>
                            </div>
                        </div>
                        <div className="call-actions">
                            <button className="action-button accept-button" onClick={() => handleAccept(call.id)}>Accept</button>
                            <button className="action-button decline-button" onClick={() => handleDecline(call.id)}>Decline</button>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>No new calls to display.</p>
            )}
        </div>
    );
};

export default CallsPage;
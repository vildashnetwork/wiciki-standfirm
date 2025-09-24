import React, { useState } from 'react';
import './CallsPage.css';

const CallsPage = () => {
    const [calls, setCalls] = useState([
        {
            id: 1,
            name: 'Broskii',
            skill: 'MERN Expert',
            message: 'Wants to Catch and discuss a collaboration on the WICIKI backend.',
            avatarUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            mutualConnections: 12,
            timestamp: '5 min ago'
        },
        {
            id: 1,
            name: 'Broskii',
            skill: 'MERN Expert',
            message: 'Wants to Catch and discuss a collaboration on the WICIKI backend.',
            avatarUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            mutualConnections: 12,
            timestamp: '5 min ago'
        },
        {
            id: 1,
            name: 'Broskii',
            skill: 'MERN Expert',
            message: 'Wants to Catch and discuss a collaboration on the WICIKI backend.',
            avatarUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            mutualConnections: 12,
            timestamp: '5 min ago'
        },
        {
            id: 1,
            name: 'Broskii',
            skill: 'MERN Expert',
            message: 'Wants to Catch and discuss a collaboration on the WICIKI backend.',
            avatarUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            mutualConnections: 12,
            timestamp: '5 min ago'
        },
        {
            id: 2,
            name: 'Lewis',
            skill: 'UI/UX Designer',
            message: 'Looking to Catch you for a UI/UX project.',
            avatarUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=150&h=150&auto=format&fit=crop',
            mutualConnections: 8,
            timestamp: '15 min ago'
        },
        {
            id: 3,
            name: 'Amanda',
            skill: 'Digital Marketer',
            message: 'Wants to Catch you to discuss marketing strategies.',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop',
            mutualConnections: 24,
            timestamp: '1 hour ago'
        },
    ]);

    const handleAccept = (callId) => {
        setCalls(calls.filter(call => call.id !== callId));
    };

    const handleDecline = (callId) => {
        setCalls(calls.filter(call => call.id !== callId));
    };

    return (
        <div className="elvis">
            <div className="beatles">
                <h1 className="frankSinatra">Incoming Calls</h1>
                <p className="ellaFitzgerald">Manage new professional connections who want to Catch you.</p>
            </div>

            {calls.length > 0 ? (
                <div className="queen">
                    {calls.map(call => (
                        <div key={call.id} className="michaelJackson">
                            <div className="bobMarley">
                                <div className="jimiHendrix">
                                    <img src={call.avatarUrl} alt={call.name} className="madonna" />
                                </div>
                                <div className="davidBowie">
                                    <div className="prince">
                                        <span className="whitneyHouston">{call.name}</span>
                                        <span className="stevieWonder">{call.skill}</span>
                                    </div>
                                    <div className="marvinGaye">
                                        <span className="arethaFranklin">{call.mutualConnections} mutual connections</span>
                                        <span className="rayCharles">{call.timestamp}</span>
                                    </div>
                                    <p className="freddieMercury">{call.message}</p>
                                </div>
                            </div>
                            <div className="ledZeppelin">
                                <button className="theRollingStones" onClick={() => handleAccept(call.id)}>
                                    Accept
                                </button>
                                <button className="pinkFloyd" onClick={() => handleDecline(call.id)}>
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="abba">
                    <div className="beeGees">👥</div>
                    <h3 className="tinaTurner">No new calls to display</h3>
                    <p className="natKingCole">When you receive new connection requests, they'll appear here.</p>
                </div>
            )}
        </div>
    );
};

export default CallsPage;
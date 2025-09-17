// pages/GistsPage.js
import React, { useState } from 'react';

const GistsPage = () => {
  const [gists, setGists] = useState([
    {
      id: 1,
      avatar: 'AM',
      name: 'Amara Okafor',
      skills: ['UI/UX Design', 'Figma'],
      media: 'https://res.cloudinary.com/dbq5gkepx/image/upload/v1753389380/eydd5ndp7iqod1g5npzu.jpg',
      content: 'Just completed a mobile banking app redesign focusing on accessibility and Afrocentric design patterns. The user feedback has been incredible!',
      tapCount: 24
    },
    {
      id: 2,
      avatar: 'KN',
      name: 'Kwame Nkrumah',
      skills: ['Software Engineering', 'Python'],
      media: 'https://res.cloudinary.com/dbq5gkepx/image/upload/v1753428445/v8nhjufe3ydfv8hapkbl.jpg',
      content: 'Built an AI-powered agricultural prediction system for small-scale farmers. Open sourcing the code to help communities across Africa!',
      tapCount: 67
    },
    {
      id: 3,
      avatar: 'ZM',
      name: 'Zara Mwangi',
      skills: ['Digital Marketing', 'Content Strategy'],
      media: 'https://res.cloudinary.com/dbq5gkepx/image/upload/v1756974124/w3tey25aflrc2cl7cpip.jpg',
      content: 'Launched a campaign that increased engagement for African startups by 300%. Sharing my framework for culturally-aware marketing strategies.',
      tapCount: 89
    }
  ]);

  const tapGist = (id) => {
    setGists(gists.map(gist => 
      gist.id === id ? { ...gist, tapCount: gist.tapCount + 1 } : gist
    ));
  };

  return (
    <div id="gists" className="page active">
      <h2 style={{
        marginBottom: '32px', 
        fontSize: '28px', 
        coloe: "var( --text-secondary)",
        background: 'linear-gradient(45deg, var(--accent-gold), var(--accent-orange))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Latest Gists
      </h2>
      <div className="gists-grid">
        {gists.map(gist => (
          <div key={gist.id} className="gist-card">
         <div className="gist-header">
  <div className="gist-avatar">{gist.avatar}</div>
  <div className="gist-info">
    <h4>{gist.name}</h4>
    <div className="skill-tags">
      {gist.skills.map((skill, index) => (
        <span key={index} className="skill-tag">{skill}</span>
      ))}
    </div>
  </div>
  <div className='gistpage-menu'>
    <ion-icon name="grid-outline"></ion-icon>
  </div>
</div>

            <div className="gist-media" style={{backgroundImage: `url(${gist.media})`}}></div>
            <p style={{ margin: '16px 0', color: 'var(--text-secondary)' }}>{gist.content}</p>
            <div className="gist-actions">
              <button className="action-btn" onClick={() => tapGist(gist.id)}>
                <span><ion-icon name="thumbs-up-outline"></ion-icon></span>
                <span className="tap-count">{gist.tapCount}</span>
              </button>
              <button className="action-btn">
                <span><ion-icon name="chatbubbles-outline"></ion-icon></span>
                <span>Gist</span>
              </button>
              <button className="action-btn">
                <span><ion-icon name="share-social-outline"></ion-icon></span>
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GistsPage;
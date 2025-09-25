// src/components/ProfileCard.jsx

import React from 'react';
import './ProfileCard.css';
const ProfileCard = ({avatar, name, skills, bio ,status, onReachout , availability,onCall}) =>{
    return(
     <div className="reachout-card">
        <div className="reachout-avatar">{avatar}</div>
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
  <span className={`status-dot status-${availability}`}></span>
  <h3>{name}</h3>
</div>

        <div className="skills-tag" style={{margin: '16px 0', justifyContent:'center'}}>
            {skills.map((skills, index) => ( <span key={index} className='skill-tag'>{skills}</span>))}
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{bio}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className={ `quick-start ${ status !== 'connect'? 'connected':''}`}
                onClick={onReachout}
                disabled={status !== 'connect'}
              >
                {status === 'connect' ? 'Reachout' : 
                 status === 'pending' ? 'Pending...' : 'Connected'}
              </button>
              <button className="action-btn" onClick={onCall}>Call</button>
            </div>
     </div>
    );
};
export default ProfileCard;

// const ProfileCard = ({ ..., onCall }) => {
//   ...
//   <button className="action-btn" onClick={onCall}>Call</button>
// }

// import React from 'react';

// const ProfileCard = ({ avatar, name, skills, bio, status, onReachout }) => {
//   return (
//     <div className="reachout-card">
//       <div className="reachout-avatar">{avatar}</div>
//       <h3>{name}</h3>
//       <div className="skill-tags" style={{ margin: '16px 0', justifyContent: 'center' }}>
//         {skills.map((skill, index) => (
//           <span key={index} className="skill-tag">{skill}</span>
//         ))}
//       </div>
//       <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{bio}</p>
//       <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
//         <button 
//           className={`quick-btn ${status !== 'connect' ? 'connected' : ''}`}
//           onClick={onReachout}
//           disabled={status !== 'connect'}
//         >
//           {status === 'connect' ? 'Reachout' : 
//            status === 'pending' ? 'Pending...' : 'Connected'}
//         </button>
//         <button className="action-btn">Call</button>
//       </div>
//     </div>
//   );
// };

// export default ProfileCard;
// src/pages/Reachoutpage/ReachoutsPage.jsx
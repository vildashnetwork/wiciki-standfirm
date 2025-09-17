// pages/SearchPage.js
import React, { useState } from 'react';

const SearchPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = ['All', 'Skills', 'People', 'Projects', 'Memtors'];

  return (
    <div id="search" className="page">
      <div className="search-header">
        <input type="text" className="search-bar" placeholder="Search for skills, people, or projects..." />
        <div className="search-filters">
          {filters.map(filter => (
            <button 
              key={filter}
              className={`filter-btn ${activeFilter === filter.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.toLowerCase())}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <h3 style={{ marginBottom: '24px', color: 'var(--accent-gold)' }}>Trending Skills</h3>
      <div className="skill-tags" style={{ marginBottom: '32px' }}>
        <span className="skill-tag">AI/Machine Learning</span>
        <span className="skill-tag">Blockchain</span>
        <span className="skill-tag">UI/UX Design</span>
        <span className="skill-tag">Data Science</span>
        <span className="skill-tag">Mobile Development</span>
        <span className="skill-tag">Digital Marketing</span>
      </div>
      <div className="gists-grid">
        <div className="gist-card">
          <h4 style={{ color: 'var(--accent-gold)', marginBottom: '16px' }}>Featured Project</h4>
          <div className="gist-media">🚀</div>
          <h3>African Fintech Innovation Hub</h3>
          <p style={{ color: 'var(--text-muted)', margin: '16px 0' }}>A collaborative space for fintech developers across Africa</p>
          <div className="skill-tags">
            <span className="skill-tag">Fintech</span>
            <span className="skill-tag">Collaboration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
// pages/SearchPage.js
import React, { useState, useEffect } from 'react';

const SearchPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingSkills] = useState([
    'AI/Machine Learning', 'Blockchain', 'UI/UX Design',
    'Data Science', 'Mobile Development', 'Digital Marketing',
    'Cloud Computing', 'Cybersecurity', 'DevOps', 'Product Management'
  ]);

  const filters = [
    { id: 'all', label: 'All', icon: <ion-icon name="search-circle-outline"></ion-icon>, count: 1247 },
    { id: 'skills', label: 'Skills', icon: <ion-icon name="bulb-outline"></ion-icon>, count: 543 },
    { id: 'people', label: 'People', icon: <ion-icon name="people-outline"></ion-icon>, count: 892 },
    { id: 'projects', label: 'Projects', icon: <ion-icon name="rocket-outline"></ion-icon>, count: 321 },
    { id: 'mentors', label: 'Mentors', icon: <ion-icon name="analytics-outline"></ion-icon>, count: 156 }
  ];

  const [featuredProjects] = useState([
    {
      id: 1,
      title: "African Fintech Innovation Hub",
      description: "A collaborative space for fintech developers across Africa building next-gen payment solutions",
      tags: ["Fintech", "Collaboration", "Blockchain"],
      members: 247,
      likes: 89,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "AI Healthcare Diagnostics",
      description: "Machine learning platform for early disease detection in rural communities",
      tags: ["AI", "Healthcare", "Machine Learning"],
      members: 189,
      likes: 156,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
      featured: true
    },
    {
      id: 3,
      title: "Sustainable Energy Grid",
      description: "Smart grid technology for optimizing renewable energy distribution",
      tags: ["Sustainability", "Energy", "IoT"],
      members: 312,
      likes: 203,
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
      featured: false
    }
  ]);

  const [recentSearches] = useState([
    "React Developer", "UI/UX Design", "Python Data Science", "Product Manager"
  ]);

  const [suggestedPeople] = useState([
    { name: "Alex Chen", role: "Senior AI Engineer", mutual: 12, avatar: "👨‍💻" },
    { name: "Sarah Johnson", role: "Product Design Lead", mutual: 8, avatar: "👩‍🎨" },
    { name: "Marcus Rivera", role: "Blockchain Developer", mutual: 5, avatar: "👨‍💼" }
  ]);

  return (
    <div id="search" className="search-page">
      {/* Main Layout Grid */}
      <div className="search-layout">

        {/* Left Sidebar - Filters */}
        <aside className="search-sidebar">
          <div className="sidebar-card">
            <h3>Filters</h3>
            <div className="filter-section">
              <h4>Category</h4>
              {filters.map(filter => (
                <div
                  key={filter.id}
                  className={`filter-option ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <span className="filter-icon">{filter.icon}</span>
                  <span className="filter-label">{filter.label}</span>
                  <span className="filter-count">{filter.count}</span>
                </div>
              ))}
            </div>

            <div className="filter-section">
              <h4>Recent Searches</h4>
              {recentSearches.map((search, index) => (
                <div key={index} className="recent-search">
                  <span>🔍</span>
                  <span>{search}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Suggested People</h3>
            {suggestedPeople.map((person, index) => (
              <div key={index} className="suggested-person">
                <div className="person-avatar">{person.avatar}</div>
                <div className="person-info">
                  <div className="person-name">{person.name}</div>
                  <div className="person-role">{person.role}</div>
                  <div className="mutual-connections">{person.mutual} mutual connections</div>
                </div>
                <button className="connect-btn">Connect</button>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="search-main">
          {/* Search Header */}
          <div className="search-header">
            <div className="search-bar-container">
              {/* <div className="search-icon">🔍</div> */}
              <input
                type="text"
                className="search-bar"
                placeholder="Search for skills, people, projects, or mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="search-actions">
                <button className="search-btn"><ion-icon name="search-outline"></ion-icon></button>
              </div>
            </div>

            <div className="quick-filters">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={`quick-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <span className="filter-icon">{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Skills */}
          <section className="trending-section">
            <div className="section-header">
              <h2>Trending Skills</h2>
              <span className="see-all">See all</span>
            </div>
            <div className="skill-tags-grid">
              {trendingSkills.slice(0, 2).map((skill, index) => (
                <div key={index} className="skill-tag-card">
                  <span className="skill-tag">{skill}</span>
                  <span className="skill-count">{Math.floor(Math.random() * 500) + 100}+</span>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Projects */}
          <section className="featured-section">
            <div className="section-header">
              <h2>Featured Projects</h2>
              <span className="see-all">View all projects</span>
            </div>
            <div className="projects-grid">
              {featuredProjects.map(project => (
                <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
                  {project.featured && <div className="featured-badge">⭐ Featured</div>}
                  <div className="project-media" style={{ background: `url(${project.image})` }}></div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map(tag => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="project-stats">
                      <span>👥 {project.members} members</span>
                      <span>❤️ {project.likes} likes</span>
                    </div>
                    <div className="project-actions">
                      <button className="join-btn">Join Project</button>
                      <button className="save-btn">Save</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Right Sidebar - Trending */}
        <aside className="trending-sidebar">
          <div className="sidebar-card">
            <h3>Trending Now</h3>
            <div className="trending-list">
              <div className="trending-item">
                <span className="trend-rank">1</span>
                <div className="trend-info">
                  <div className="trend-title">Web3 Development</div>
                  <div className="trend-stats">2.4k active learners</div>
                </div>
              </div>
              <div className="trending-item">
                <span className="trend-rank">2</span>
                <div className="trend-info">
                  <div className="trend-title">Quantum Computing</div>
                  <div className="trend-stats">1.8k discussions</div>
                </div>
              </div>
              <div className="trending-item">
                <span className="trend-rank">3</span>
                <div className="trend-info">
                  <div className="trend-title">Metaverse Design</div>
                  <div className="trend-stats">1.2k projects</div>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Upcoming Events</h3>
            <div className="event-item">
              <div className="event-date">
                <span className="event-day">15</span>
                <span className="event-month">DEC</span>
              </div>
              <div className="event-info">
                <div className="event-title">AI Innovation Summit</div>
                <div className="event-time">10:00 AM • Virtual</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SearchPage;
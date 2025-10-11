import React from 'react';
import styles from './ProfilePage.module.css';
import PostCreation from '../Gists/PostCreation/PostCreation';

const Tab = ({ label, active }) => (
  <button className={`${styles.tab} ${active ? styles.tabActive : ''}`}>{label}</button>
);

const Icon = ({ children }) => (
  <span aria-hidden className={styles.searchIcon}>{children}</span>
);

const ProfilePage = () => {
  return (
    <div id="profile" className={styles.page}>
      {/* Top Nav */}
      {/* <header className={styles.navbar}>
        <div className={styles.navbarInner}>
          <div className={styles.logo}>AK</div>
          <div className={styles.search}>
            <Icon>🔎</Icon>
            <input placeholder="Search on ReddishBook" />
          </div>
          <div className={styles.actions}>
            <button className={styles.iconBtn} title="Home">🏠</button>
            <button className={styles.iconBtn} title="Messages">💬</button>
            <button className={styles.iconBtn} title="Notifications">🔔</button>
            <button className={styles.iconBtn} title="Account">👤</button>
          </div>
        </div>
      </header> */}

      {/* Cover */}
      <section
        className={styles.cover}
        style={{
          background: `
      linear-gradient(
        to top,
        rgba(197, 27, 24, 0.8) 0%,
        rgba(197, 27, 24, 0) 40%,
        rgba(13, 13, 13, 0.0) 80%
      ),
      url('/image.png') center/100% 100% no-repeat
    `
        }}
      >
        <div className={styles.coverOverlay} />
      </section>

      {/* Avatar + Name + Actions */}
      <div className={styles.avatarRow}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>AK</div>
          <div className={styles.statusDot} />
        </div>

        <div className={styles.nameArea}>
          <div className={styles.personName}>Akosua Kwarteng</div>
          <div className={styles.metaRow}>

            <span className={styles.metaChip}>Full-Stack Developer</span>
            <span className={styles.metaChip}>React</span>
            <span className={styles.metaChip}>Node.js</span>
            <span className={styles.metaChip}>AI/ML</span>
            <span className={styles.metaChip}>2.4K reachers</span>
          </div>
          <span style={{ marginTop: 16 }} className={styles.metaChip}>Website: <ion-icon name="link-outline"></ion-icon> <a href="https://mywebsite.onwiciki.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#eba0a7ff" }}>https://mywebsite.onwiciki.com</a></span>
        </div>

        <div className={styles.headerActions}>
          {/* <button className={styles.primaryBtn}>Add friend</button>
          <button className={styles.secondaryBtn}>Message</button> */}
          <button className={styles.iconBtn} title="More">⋯</button>
        </div>
      </div>

      {/* Tabs */}
      <nav className={styles.tabsBar}>
        <div className={styles.tabsInner}>
          <Tab label="Posts" />
          <Tab label="About" />
          <Tab label="Friends" />
          <Tab label="Photos" />
          <Tab label="Videos" />
          <Tab label="Check-ins" />
          <Tab label="More" />
        </div>
      </nav>

      {/* Body */}
      <main className={styles.bodyWrap}>
        {/* Left column */}
        <aside className={styles.leftCol}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>Intro</div>
            <div className={styles.cardBody}>
              <div className={styles.introList}>
                <div className={styles.introItem}>💼 Works at <strong>Reddish Labs</strong></div>
                <div className={styles.introItem}>🎓 Studied Computer Science at <strong>UG</strong></div>
                <div className={styles.introItem}>🏠 Lives in <strong>Accra, Ghana</strong></div>
                <div className={styles.introItem}>📍 From <strong>Kumasi</strong></div>
                <div className={styles.introItem}>❤️ In a relationship</div>
                <button className={styles.secondaryBtn} style={{ width: '100%', marginTop: 10 }}>Edit details</button>
                <button className={styles.secondaryBtn} style={{ width: '100%' }}>Add hobbies</button>
                <button className={styles.secondaryBtn} style={{ width: '100%' }}>Add featured</button>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>Photos</div>
            <div className={styles.cardBody}>
              <div className={styles.photosGrid}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <img key={i} className={styles.photo} src={`https://picsum.photos/seed/p${i}/300/300`} alt="Photo" />
                ))}
              </div>
              <button className={styles.linkBtn} style={{ marginTop: 10 }}>See all photos</button>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>Friends</div>
            <div className={styles.cardBody}>
              <div className={styles.friendsGrid}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={styles.friendCard}>
                    <img className={styles.friendThumb} src={`https://picsum.photos/seed/f${i}/300/300`} alt="Friend" />
                    <div className={styles.friendName}>Friend {i + 1}</div>
                  </div>
                ))}
              </div>
              <button className={styles.linkBtn} style={{ marginTop: 10 }}>See all friends</button>
            </div>
          </section>
        </aside>

        {/* Right column */}
        <section className={styles.rightCol}>
          <div>

            {/* <div className={styles.composer}>
                <div className={styles.composerAvatar}>AK</div>
                <div>
                  <input placeholder="What's on your mind, Akosua?" />
                  <div className={styles.composerActions}>
                    <button className={styles.composerActionBtn}>🎥 Live video</button>
                    <button className={styles.composerActionBtn}>📷 Photo/video</button>
                    <button className={styles.composerActionBtn}>😊 Feeling/activity</button>
                  </div>
                </div>
              </div> */}
            <PostCreation />

          </div>

          <article className={styles.card}>
            <div className={styles.cardBody}>
              <div className={styles.post}>
                <div className={styles.postAvatar}>AK</div>
                <div>
                  <div className={styles.postMeta}>
                    <strong>Akosua Kwarteng</strong>
                    <span>·</span>
                    <span>2h</span>
                    <span>·</span>
                    <span>🌍 Public</span>
                  </div>
                  <div style={{ marginTop: 6 }}>Building a red-accented dark theme today. Love this vibe!</div>
                  <img className={styles.postImage} src="https://images.unsplash.com/photo-1556767576-cfba9fdac20a?q=80&w=1600&auto=format&fit=crop" alt="Post" />
                  <div className={styles.postActions}>
                    <button className={styles.postActionBtn}>👍 Like</button>
                    <button className={styles.postActionBtn}>💬 Comment</button>
                    <button className={styles.postActionBtn}>↗️ Share</button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.cardBody}>
              <div className={styles.post}>
                <div className={styles.postAvatar}>AK</div>
                <div>
                  <div className={styles.postMeta}>
                    <strong>Akosua Kwarteng</strong>
                    <span>·</span>
                    <span>1d</span>
                    <span>·</span>
                    <span>👥 Friends</span>
                  </div>
                  <div style={{ marginTop: 6 }}>New portfolio update is live. Feedback welcome!</div>
                  <div className={styles.postActions}>
                    <button className={styles.postActionBtn}>👍 Like</button>
                    <button className={styles.postActionBtn}>💬 Comment</button>
                    <button className={styles.postActionBtn}>↗️ Share</button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
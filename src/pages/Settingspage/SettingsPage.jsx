// import React, { useEffect, useState } from 'react';
// import { X, ChevronRight, Bell, Shield, Palette, User, Globe, HelpCircle, Menu, SearchCheckIcon, EyeIcon } from 'lucide-react';
// import Cookies from "js-cookie";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const SettingsPage = ({ isOpen, onClose }) => {



//   const [activeSection, setActiveSection] = useState('general');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const [settings, setSettings] = useState({
//     // Notifications
//     pushNotifications: true,
//     emailNotifications: false,
//     smsNotifications: false,
//     soundEnabled: true,
//     vibration: true,

//     // Privacy
//     profileVisibility: 'public',
//     messageRequests: 'everyone',
//     storySharing: true,
//     locationServices: false,
//     dataSaver: false,

//     // Theme & Appearance
//     darkMode: true,
//     reduceMotion: false,
//     fontSize: 'medium',
//     language: 'english',

//     // Account
//     twoFactorAuth: false,
//     loginAlerts: false,
//     backupData: false,
//     profilevisibilitytruefalse: false,
//     allowMessages: false
//   });


//   const toggleSetting = (setting) => {
//     setSettings({
//       ...settings,
//       [setting]: !settings[setting]
//     });
//   };


//   const updateSetting = (setting, value) => {
//     setSettings({
//       ...settings,
//       [setting]: value
//     });
//   };



//   const token = Cookies.get('token');
//   const [user, setuser] = useState([])

//   const [loading, setloading] = useState(false)
//   const navigat = useNavigate()
//   useEffect(() => {

//     const getuser = async () => {
//       try {
//         setloading(true)
//         //making and api call to decode the token
//         const res = await axios.get("https://wicikibackend.onrender.com/decode/me", { token })
//         if (res.status == 200) {
//           setuser(res.data.user)
//           console.log(res.data.user)
//           setSettings(prev => ({
//             ...prev,
//             profilevisibility: res.data.user?.personalised?.profilevisibilitytruefalse ?? prev.profilevisibilitytruefalse

//           }));


//         } else {
//           // toast.error(res.data.message)
//           // navigat("/login")
//           return;
//         }

//       } catch (error) {
//         console.log(error);

//       } finally {
//         setloading(false)
//       }
//     }
//     getuser()
//   }, [token])




//   const settingsSections = {
//     general: {
//       icon: <Bell size={20} />,
//       title: 'Notifications',
//       settings: [
//         {
//           type: 'toggle',
//           key: 'pushNotifications',
//           label: 'Push Notifications',
//           description: 'Receive notifications on your device',
//           value: settings.pushNotifications
//         },
//         {
//           type: 'toggle',
//           key: 'emailNotifications',
//           label: 'Email Notifications',
//           description: 'Get updates via email',
//           value: settings.emailNotifications
//         },
//         {
//           type: 'toggle',
//           key: 'soundEnabled',
//           label: 'Notification Sounds',
//           description: 'Play sounds for new notifications',
//           value: settings.soundEnabled
//         }
//       ]
//     },
//     privacy: {
//       icon: <Shield size={20} />,
//       title: 'Privacy & Security',
//       settings: [
//         {
//           type: 'select',
//           key: 'profileVisibility',
//           label: 'Profile Visibility',
//           description: 'Who can see your profile',
//           value: settings.profileVisibility,
//           options: [
//             { label: 'Public', value: 'public' },
//             { label: 'Friends', value: 'friends' },
//             { label: 'Private', value: 'private' }
//           ]
//         },
//         {
//           type: 'toggle',
//           key: 'twoFactorAuth',
//           label: 'Two-Factor Authentication',
//           description: 'Extra security for your account',
//           value: settings.twoFactorAuth
//         },
//         {
//           type: 'toggle',
//           key: 'loginAlerts',
//           label: 'Login Alerts',
//           description: 'Get notified of new logins',
//           value: settings.loginAlerts
//         },
//         {
//           type: 'toggle',
//           key: 'profilevisibilitytruefalse',
//           label: 'Profile Visibility',
//           description: 'Allow Your History to be read By everyone',
//           value: settings.profilevisibilitytruefalse,
//         },
//         {
//           type: 'toggle',
//           key: 'allowMessages',
//           label: 'Allow Unknown Gists',
//           description: 'Allow unknown people to send you gists',
//           value: settings.allowMessages,
//         },
//       ]
//     },
//     appearance: {
//       icon: <Palette size={20} />,
//       title: 'Theme & Appearance',
//       settings: [
//         {
//           type: 'toggle',
//           key: 'darkMode',
//           label: 'Dark Mode',
//           description: 'Use dark theme across app',
//           value: settings.darkMode
//         },
//         {
//           type: 'select',
//           key: 'fontSize',
//           label: 'Font Size',
//           description: 'Adjust text size',
//           value: settings.fontSize,
//           options: [
//             { label: 'Small', value: 'small' },
//             { label: 'Medium', value: 'medium' },
//             { label: 'Large', value: 'large' }
//           ]
//         },
//         {
//           type: 'toggle',
//           key: 'reduceMotion',
//           label: 'Reduce Motion',
//           description: 'Minimize animations',
//           value: settings.reduceMotion
//         }
//       ]
//     },
//     account: {
//       icon: <User size={20} />,
//       title: 'Account Settings',
//       settings: [
//         {
//           type: 'button',
//           key: 'changePassword',
//           label: 'Change Password',
//           description: 'Update your login password'
//         },
//         {
//           type: 'button',
//           key: 'backupData',
//           label: 'Backup Data',
//           description: 'Download your information'
//         },
//         {
//           type: 'button',
//           key: 'deactivate',
//           label: 'Deactivate Account',
//           description: 'Temporarily disable your account',
//           danger: true
//         }
//       ]
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="aviary-overlay">
//       <div className="aviary">
//         {/* Header */}
//         <div className="aviary-header">
//           <div className="aviary-brand">
//             <div className="feather-logo">W</div>
//             <h1 className="aviary-name">WICIKI {settings?.profilevisibilitytruefalse}</h1>
//           </div>

//           <div className="aviary-actions">
//             <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//               <Menu size={24} />
//             </button>

//             <button className="robin-search">
//               <i className="search-icon"><SearchCheckIcon /> </i>
//               <span className="search-text">Search settings</span>
//             </button>

//             <button className="falcon-exit" onClick={onClose}>
//               <EyeIcon size={24} />

//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="aviary-content">
//           {/* Mobile Navigation Overlay */}
//           {isMobileMenuOpen && (
//             <div className="mobile-nav-overlay" onClick={() => setIsMobileMenuOpen(false)}>
//               <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
//                 <div className="mobile-nav-header">
//                   <h3>Settings & Privacy</h3>
//                   <button onClick={() => setIsMobileMenuOpen(false)}>
//                     <X size={24} />
//                   </button>
//                 </div>

//                 <div className="mobile-nav-sections">
//                   {Object.entries(settingsSections).map(([key, section]) => (
//                     <div
//                       key={key}
//                       className={`mobile-nav-item ${activeSection === key ? 'active' : ''}`}
//                       onClick={() => {
//                         setActiveSection(key);
//                         setIsMobileMenuOpen(false);
//                       }}
//                     >
//                       <div className="mobile-nav-icon">
//                         {section.icon}
//                       </div>
//                       <span className="mobile-nav-text">{section.title}</span>
//                       <ChevronRight size={16} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Side Navigation */}
//           <div className="aviary-nest">
//             <div className="flock-section">
//               <h3 className="flock-title">Settings & Privacy</h3>
//               {Object.entries(settingsSections).map(([key, section]) => (
//                 <div
//                   key={key}
//                   className={`bird-perch ${activeSection === key ? 'active' : ''}`}
//                   onClick={() => setActiveSection(key)}
//                 >
//                   <div className="bird-feather">
//                     {section.icon}
//                   </div>
//                   <span className="bird-call">{section.title}</span>
//                   <ChevronRight size={16} className="bird-wing" />
//                 </div>
//               ))}
//             </div>

//             <div className="flock-section">
//               <h3 className="flock-title">More Options</h3>
//               <div className="bird-perch">
//                 <div className="bird-feather">
//                   <HelpCircle size={20} />
//                 </div>
//                 <span className="bird-call">Help & Support</span>
//                 <ChevronRight size={16} className="bird-wing" />
//               </div>

//               <div className="bird-perch">
//                 <div className="bird-feather">
//                   <Globe size={20} />
//                 </div>
//                 <span className="bird-call">Language & Region</span>
//                 <ChevronRight size={16} className="bird-wing" />
//               </div>
//             </div>
//           </div>

//           {/* Settings Content */}
//           <div className="aviary-main">
//             <div className="aviary-main-header">
//               <h2 className="aviary-main-title">
//                 {settingsSections[activeSection].icon}
//                 {settingsSections[activeSection].title}
//               </h2>
//               <p className="aviary-main-description">
//                 Manage your {settingsSections[activeSection].title.toLowerCase()} preferences
//               </p>
//             </div>
//             <div className={loading && 'toop'}>
//               <div className={loading && "settingsprofileshimmerme"} >
//                 {loading && <p>loading settings....</p>}
//               </div>
//             </div>


//             <div className={"aviary-main-content"}>
//               <div className="bird-grid">
//                 {settingsSections[activeSection].settings.map((item, index) => (
//                   <div key={item.key} className="bird-nest">
//                     <div className="nest-content">
//                       <div className="bird-info">
//                         <h4 className={`bird-name ${item.danger ? 'danger' : ''}`}>
//                           {item.label}
//                         </h4>
//                         {item.description && (
//                           <p className="bird-whisper">{item.description}</p>
//                         )}
//                       </div>

//                       <div className="bird-control">
//                         {item.type === 'toggle' && (
//                           <div
//                             className={`eagle-toggle ${settings[item.key] ? 'active' : ''}`}
//                             onClick={() => toggleSetting(item.key)}
//                           >
//                             <div className="eagle-track"></div>
//                             <div className="eagle-thumb"></div>
//                           </div>
//                         )}

//                         {item.type === 'select' && (
//                           <select
//                             className="hawk-select"
//                             value={settings[item.key]}
//                             onChange={(e) => updateSetting(item.key, e.target.value)}
//                           >
//                             {item.options.map(option => (
//                               <option key={option.value} value={option.value}>
//                                 {option.label}
//                               </option>
//                             ))}
//                           </select>
//                         )}

//                         {item.type === 'button' && (
//                           <button className={`owl-action ${item.danger ? 'danger' : ''}`}>
//                             <ChevronRight size={16} />
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="aviary-footer">
//           <div className="footer-nest">
//             <div className="bird-links">
//               <a href="#" className="bird-link">Privacy</a>
//               <a href="#" className="bird-link">Terms</a>
//               <a href="#" className="bird-link">Advertising</a>
//               <a href="#" className="bird-link">Cookies</a>
//               <a onClick={() => Cookies.remove("token")} className="bird-link">More</a>
//             </div>
//             <div className="bird-song">
//               Vildash Network © {new Date().getFullYear()}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;






















import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronRight,
  Bell,
  Shield,
  Palette,
  User,
  Globe,
  HelpCircle,
  Menu,
  SearchCheckIcon,
  EyeIcon
} from 'lucide-react';
import Cookies from "js-cookie";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Code2, Edit2, Check } from "lucide-react";
const SettingsPage = ({ isOpen, onClose }) => {
  const token = Cookies.get('token');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Use a single consistent key for the boolean
  const [settings, setSettings] = useState({
    // Notifications
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    soundEnabled: true,
    vibration: true,

    // Privacy
    profileVisibility: 'public',
    messageRequests: 'everyone',
    storySharing: true,
    locationServices: false,
    dataSaver: false,


    profilevisibility: false,

    // Theme & Appearance
    darkMode: true,
    reduceMotion: false,
    fontSize: 'medium',
    language: 'english',

    // Account
    twoFactorAuth: false,
    loginAlerts: false,
    backupData: false,
    allowMessages: false,
    showBirthday: false,
    allowTagging: false,
    ShowAllMentors: false
  });

  // Safe toggler using functional setState to avoid stale state
  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const updateSetting = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        // no token: optionally navigate to login or just return
        console.warn('No token found for SettingsPage');
        return;
      }

      try {
        setLoading(true);

        // IMPORTANT: include token as Authorization header (was previously passed incorrectly)
        const res = await axios.get("https://wicikibackend.onrender.com/decode/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.status === 200) {
          const fetchedUser = res.data.user;
          setUser(fetchedUser);


          const backendBool =
            fetchedUser?.personalised?.profilevisibility ??
            fetchedUser?.personalised?.profilevisibilitytruefalse ??
            fetchedUser?.profilevisibility ??
            null;

          const backendBoolallowMessages =
            fetchedUser?.personalised?.allowMessages ??
            fetchedUser?.personalised?.allowMessages ??
            fetchedUser?.allowMessages ??
            null;
          const backendBoolshowBirthday =
            fetchedUser?.personalised?.showBirthday ??
            fetchedUser?.personalised?.showBirthday ??
            fetchedUser?.showBirthday ??
            null;

          const backendBoolallowTagging =
            fetchedUser?.personalised?.allowTagging ??
            fetchedUser?.personalised?.allowTagging ??
            fetchedUser?.allowTagging ??
            null;

          const backendBoolShowAllMentors =
            fetchedUser?.personalised?.ShowAllMentors ??
            fetchedUser?.personalised?.ShowAllMentors ??
            fetchedUser?.ShowAllMentors ??
            null;
          // ShowAllMentors

          if (backendBoolShowAllMentors !== null && backendBoolShowAllMentors !== undefined ||
            backendBoolallowTagging !== null && backendBoolallowTagging !== undefined ||
            backendBool !== null && backendBool !== undefined ||
            backendBoolallowMessages !== null && backendBoolallowMessages !== undefined ||
            backendBoolshowBirthday !== null && backendBoolshowBirthday !== undefined
          ) {
            setSettings(prev => ({
              ...prev,
              allowMessages: Boolean(backendBoolallowMessages),
              profilevisibility: Boolean(backendBool),
              showBirthday: Boolean(backendBoolshowBirthday),
              allowTagging: Boolean(backendBoolallowTagging),
              ShowAllMentors: Boolean(backendBoolShowAllMentors)
            }));
          }

        } else {
          // if backend returns non-200, handle gracefully
          console.warn('Could not fetch user:', res?.data?.message);
          // navigate("/login") // optional
        }
      } catch (err) {
        console.error('Error fetching user in SettingsPage:', err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [token]);

  // Sections (use the consistent key)
  const settingsSections = {
    general: {
      icon: <Bell size={20} />,
      title: 'Notifications',
      settings: [
        { type: 'toggle', key: 'pushNotifications', label: 'Push Notifications', description: 'Receive notifications on your device', value: settings.pushNotifications },
        { type: 'toggle', key: 'emailNotifications', label: 'Email Notifications', description: 'Get updates via email', value: settings.emailNotifications },
        { type: 'toggle', key: 'soundEnabled', label: 'Notification Sounds', description: 'Play sounds for new notifications', value: settings.soundEnabled }
      ]
    },
    privacy: {
      icon: <Shield size={20} />,
      title: 'Privacy & Security',
      settings: [
        {
          type: 'select',
          key: 'profileVisibility',
          label: 'Profile Visibility',
          description: 'Who can see your profile',
          value: settings.profileVisibility,
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Friends', value: 'friends' },
            { label: 'Private', value: 'private' }
          ]
        },
        { type: 'toggle', key: 'twoFactorAuth', label: 'Two-Factor Authentication', description: 'Extra security for your account', value: settings.twoFactorAuth },
        { type: 'toggle', key: 'loginAlerts', label: 'Login Alerts', description: 'Get notified of new logins', value: settings.loginAlerts },
        {
          type: 'toggle',
          key: 'profilevisibility',
          label: loading ? 'loading...' : 'Profile Visibility',
          description: 'Allow Your History to be read By everyone',
          value: settings.profilevisibility
        },
        {
          type: 'toggle',
          key: 'showBirthday',
          label: loading ? 'loading...' : 'Show Birthday For Everyone',
          description: 'Allow Your History to be read By everyone',
          value: settings.showBirthday
        },
        {
          type: 'toggle',
          key: 'allowTagging',
          label: loading ? 'loading...' : 'Allow Tagging',
          description: 'Allow everyone to tag you on thier posts',
          value: settings.allowTagging
        },
        {
          type: 'toggle',
          key: 'ShowAllMentors',
          label: loading ? 'loading...' : 'Show All Mentors',
          description: 'Show all mentors with mentors not of your traid',
          value: settings.ShowAllMentors
        },
        { type: 'toggle', key: 'allowMessages', label: loading ? 'loading...' : 'Allow Unknown Gists', description: 'Allow unknown people to send you gists', value: settings.allowMessages }

      ]
    },
    appearance: {
      icon: <Palette size={20} />,
      title: 'Theme & Appearance',
      settings: [
        { type: 'toggle', key: 'darkMode', label: 'Dark Mode', description: 'Use dark theme across app', value: settings.darkMode },
        { type: 'select', key: 'fontSize', label: 'Font Size', description: 'Adjust text size', value: settings.fontSize, options: [{ label: 'Small', value: 'small' }, { label: 'Medium', value: 'medium' }, { label: 'Large', value: 'large' }] },
        { type: 'toggle', key: 'reduceMotion', label: 'Reduce Motion', description: 'Minimize animations', value: settings.reduceMotion }
      ]
    },
    account: {
      icon: <User size={20} />,
      title: 'Account Settings',
      settings: [
        { type: 'button', key: 'changePassword', label: 'Change Password', description: 'Update your login password' },
        { type: 'button', key: 'backupData', label: 'Backup Data', description: 'Download your information' },
        { type: 'button', key: 'deactivate', label: 'Deactivate Account', description: 'Temporarily disable your account', danger: true }
      ]
    }
  };

  const [isEditing, setIsEditing] = useState(true);
  const [question, setQuestion] = useState("");
  const [selectedLangs, setSelectedLangs] = useState([]);
  const [selectedTech, setSelectedTech] = useState([]);

  const [activeSection, setActiveSection] = useState('general');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!isOpen) return null;

  const spokenLanguages = [
    { name: "English", icon: "🇬🇧" },
    { name: "French", icon: "🇫🇷" },
    { name: "Spanish", icon: "🇪🇸" },
    { name: "Mandarin Chinese", icon: "🇨🇳" },
    { name: "Hindi", icon: "🇮🇳" },
    { name: "Arabic", icon: "🇸🇦" },
    { name: "Bengali", icon: "🇧🇩" },
    { name: "Portuguese", icon: "🇵🇹" },
    { name: "Russian", icon: "🇷🇺" },
    { name: "Japanese", icon: "🇯🇵" },
    { name: "German", icon: "🇩🇪" },
    { name: "Korean", icon: "🇰🇷" },
    { name: "Italian", icon: "🇮🇹" },
    { name: "Turkish", icon: "🇹🇷" },
    { name: "Vietnamese", icon: "🇻🇳" },
    { name: "Swahili", icon: "🇰🇪" },
    { name: "Tamil", icon: "🇱🇰" },
    { name: "Dutch", icon: "🇳🇱" },
    { name: "Polish", icon: "🇵🇱" },
    { name: "Thai", icon: "🇹🇭" },
    { name: "Greek", icon: "🇬🇷" },
    { name: "Hebrew", icon: "🇮🇱" },
    { name: "Amharic", icon: "🇪🇹" },
    { name: "Zulu", icon: "🇿🇦" },
    { name: "Yoruba", icon: "🇳🇬" },
    { name: "Hausa", icon: "🇳🇬" },
    { name: "Igbo", icon: "🇳🇬" },
    { name: "Twi", icon: "🇬🇭" },
  ];


  const techLanguages = [
    // Front-end
    { name: "HTML", icon: "📄" },
    { name: "CSS", icon: "🎨" },
    { name: "JavaScript", icon: "🟨" },
    { name: "TypeScript", icon: "🔷" },
    { name: "React", icon: "⚛️" },
    { name: "Vue.js", icon: "🟩" },
    { name: "Angular", icon: "🔺" },
    { name: "Svelte", icon: "🔥" },
    { name: "Next.js", icon: "⬛" },
    { name: "Nuxt.js", icon: "🟢" },

    // Back-end
    { name: "Node.js", icon: "🟢" },
    { name: "Express", icon: "🚀" },
    { name: "Django", icon: "🐍" },
    { name: "Flask", icon: "🥤" },
    { name: "Laravel", icon: "❤️" },
    { name: "Spring Boot", icon: "🌿" },
    { name: "Ruby on Rails", icon: "💎" },
    { name: ".NET", icon: "🟣" },
    { name: "Go", icon: "💨" },
    { name: "Rust", icon: "🦀" },
    { name: "PHP", icon: "🐘" },
    { name: "C", icon: "🔵" },
    { name: "C++", icon: "💠" },
    { name: "C#", icon: "⚙️" },
    { name: "Java", icon: "☕" },
    { name: "Kotlin", icon: "🟣" },
    { name: "Swift", icon: "🦋" },
    { name: "Objective-C", icon: "🍏" },
    { name: "Scala", icon: "🔥" },
    { name: "Perl", icon: "🧶" },
    { name: "Elixir", icon: "💧" },
    { name: "Erlang", icon: "🧠" },
    { name: "Haskell", icon: "λ" },
    { name: "Clojure", icon: "🌿" },
    { name: "F#", icon: "🧩" },
    { name: "Shell Script", icon: "💻" },
    { name: "PowerShell", icon: "⚡" },
    { name: "SQL", icon: "🗄️" },
    { name: "GraphQL", icon: "🕸️" },
    { name: "Firebase", icon: "🔥" },
    { name: "Supabase", icon: "🟩" },

    // Databases
    { name: "MongoDB", icon: "🍃" },
    { name: "MySQL", icon: "🐬" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "SQLite", icon: "💾" },
    { name: "Redis", icon: "🧠" },
    { name: "Cassandra", icon: "👁️" },
    { name: "Firebase Realtime DB", icon: "🔥" },

    // Mobile
    { name: "React Native", icon: "📱" },
    { name: "Flutter", icon: "💙" },
    { name: "Ionic", icon: "🔵" },

    // DevOps / Tools
    { name: "Docker", icon: "🐳" },
    { name: "Kubernetes", icon: "☸️" },
    { name: "Git", icon: "🔧" },
    { name: "GitHub Actions", icon: "⚙️" },
    { name: "AWS", icon: "☁️" },
    { name: "Azure", icon: "🔷" },
    { name: "Google Cloud", icon: "🌥️" },
    { name: "Linux", icon: "🐧" },
  ];


  const handleSelect = (name, selected, setSelected) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((n) => n !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  return (
    <div className="aviary-overlay">
      <div className="aviary">
        {/* Header */}
        <div className="aviary-header">
          <div className="aviary-brand">
            <div className="feather-logo">W</div>
            <h1 className="aviary-name">WICIKI </h1>
          </div>

          <div className="aviary-actions">
            <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu size={24} />
            </button>

            <button className="robin-search">
              <i className="search-icon"><SearchCheckIcon /> </i>
              <span className="search-text">Search settings</span>
            </button>

            <button className="falcon-exit" onClick={onClose}>
              <EyeIcon size={24} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="aviary-content">
          {/* Mobile Navigation Overlay */}
          {isMobileMenuOpen && (
            <div className="mobile-nav-overlay" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-nav-header">
                  <h3>Settings & Privacy</h3>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X size={24} />
                  </button>
                </div>

                <div className="mobile-nav-sections">
                  {Object.entries(settingsSections).map(([key, section]) => (
                    <div
                      key={key}
                      className={`mobile-nav-item ${activeSection === key ? 'active' : ''}`}
                      onClick={() => { setActiveSection(key); setIsMobileMenuOpen(false); }}
                    >
                      <div className="mobile-nav-icon">{section.icon}</div>
                      <span className="mobile-nav-text">{section.title}</span>
                      <ChevronRight size={16} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Side Navigation */}
          <div className="aviary-nest">
            <div className="flock-section">
              <h3 className="flock-title">Settings & Privacy</h3>
              {Object.entries(settingsSections).map(([key, section]) => (
                <div key={key} className={`bird-perch ${activeSection === key ? 'active' : ''}`} onClick={() => setActiveSection(key)}>
                  <div className="bird-feather">{section.icon}</div>
                  <span className="bird-call">{section.title}</span>
                  <ChevronRight size={16} className="bird-wing" />
                </div>
              ))}
            </div>

            <div className="flock-section">
              <h3 className="flock-title">More Options</h3>
              <div className="bird-perch">
                <div className="bird-feather"><HelpCircle size={20} /></div>
                <span className="bird-call">Help & Support</span>
                <ChevronRight size={16} className="bird-wing" />
              </div>

              <div className="bird-perch">
                <div className="bird-feather"><Globe size={20} /></div>
                <span className="bird-call">Language & Region</span>
                <ChevronRight size={16} className="bird-wing" />
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="aviary-main">
            <div className="aviary-main-header">
              <h2 className="aviary-main-title">
                {settingsSections[activeSection].icon}
                {settingsSections[activeSection].title}
              </h2>
              <p className="aviary-main-description">
                Manage your {settingsSections[activeSection].title.toLowerCase()} preferences
              </p>
            </div>

            <div className={"aviary-main-content"}>
              <div className="bird-grid">
                {activeSection === "account" && (
                  <div className="question-page">
                    <div className="question-section">
                      <div className="header">
                        <h2>Questions:</h2>
                        <button
                          className={`edit-btn ${isEditing ? "disable" : "enable"}`}
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? "Disable Edit ✖" : "Enable Edit ✏️"}
                        </button>
                      </div>

                      <div className="questioning-input-sec">
                        <div className="questioning-input-wrap">
                          <label>Profession:</label>
                          <input type="text" disabled={!isEditing} />
                        </div>

                        <div className="questioning-input-wrap">

                          <label>Years of Experience:</label>
                          <input type="text" disabled={!isEditing} />
                        </div>
                        <div className="questioning-input-wrap">

                          <label>Projects Completed:</label>
                          <input type="number" disabled={!isEditing} />
                        </div>
                        <div className="questioning-input-wrap">

                          <label>Education:</label>
                          <input type="text" disabled={!isEditing} />
                        </div>
                      </div>



                      <div className="selector-group">
                        <h3>🌍 Spoken Languages</h3>
                        <div className="options">
                          {spokenLanguages.map((lang) => (
                            <button
                              key={lang.name}
                              className={`option-btn ${selectedLangs.includes(lang.name) ? "selected" : ""
                                }`}
                              disabled={!isEditing}
                              onClick={() =>
                                handleSelect(lang.name, selectedLangs, setSelectedLangs)
                              }
                            >
                              {lang.icon} {lang.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="selector-group">
                        <h3>
                          💻 Programming Languages
                          <span className="note">
                            (Select this only if you are a programmer)
                          </span>
                        </h3>
                        <div className="options">
                          {techLanguages.map((tech) => (
                            <button
                              key={tech.name}
                              className={`option-btn ${selectedTech.includes(tech.name) ? "selected" : ""
                                }`}
                              disabled={!isEditing}
                              onClick={() =>
                                handleSelect(tech.name, selectedTech, setSelectedTech)
                              }
                            >
                              {tech.icon} {tech.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        className="submit-btn1"
                        disabled={!isEditing || !question.trim()}
                      >
                        Submit Question
                      </button>
                    </div>
                  </div>
                )}

                {settingsSections[activeSection].settings.map((item) => (
                  <div key={item.key} className="bird-nest">


                    <div className="nest-content">
                      <div className="bird-info">
                        <h4 className={`bird-name ${item.danger ? 'danger' : ''}`}>{item.label}</h4>
                        {item.description && <p className="bird-whisper">{item.description}</p>}
                      </div>

                      <div className="bird-control">
                        {item.type === 'toggle' && (
                          <div
                            className={`eagle-toggle ${settings[item.key] ? 'active' : ''}`}
                            onClick={() => toggleSetting(item.key)}
                          >
                            <div className="eagle-track"></div>
                            <div className="eagle-thumb"></div>
                          </div>
                        )}

                        {item.type === 'select' && (
                          <select
                            className="hawk-select"
                            value={settings[item.key]}
                            onChange={(e) => updateSetting(item.key, e.target.value)}
                          >
                            {item.options.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        )}

                        {item.type === 'button' && (
                          <button className={`owl-action ${item.danger ? 'danger' : ''}`}>
                            <ChevronRight size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="aviary-footer">
          <div className="footer-nest">
            <div className="bird-links">
              <a href="#" className="bird-link">Privacy</a>
              <a href="#" className="bird-link">Terms</a>
              <a href="#" className="bird-link">Advertising</a>
              <a href="#" className="bird-link">Cookies</a>
              <a onClick={() => Cookies.remove("token")} className="bird-link">More</a>
            </div>
            <div className="bird-song">Vildash Network © {new Date().getFullYear()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

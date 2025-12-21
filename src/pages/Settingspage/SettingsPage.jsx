



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
  SearchCheckIcon
} from 'lucide-react';
import Cookies from "js-cookie";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SettingsPage = ({ isOpen, onClose }) => {
  const token = Cookies.get('token');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ensure consistent casing for setters
  const [loadingsaving, setLoadingsaving] = useState(false);

  // Settings state (kept keys you had; consider normalizing profileVisibility vs profilevisibility later)
  const [settings, setSettings] = useState({
    pushNotifications: false,
    emailNotifications: false,
    smsNotifications: false,
    soundEnabled: false,
    vibration: true,
    profileVisibility: 'public', // string (select)
    messageRequests: 'everyone',
    storySharing: true,
    locationServices: false,
    dataSaver: false,
    profilevisibility: false, // boolean toggle (confusing duplicate — consider renaming)
    // darkMode: true,
    reduceMotion: false,
    fontSize: 'medium',
    imageQuality: "high",
    language: 'english',
    twoFactorAuth: false,
    Deactivate: false,
    loginAlerts: false,
    backupData: false,
    allowMessages: false,
    showBirthday: false,
    allowTagging: false,
    ShowAllMentors: false
  });

  // toggle/select helper state
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLangs, setSelectedLangs] = useState([]);
  const [selectedTech, setSelectedTech] = useState([]);
  const [activeSection, setActiveSection] = useState('general');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [loadsave, setloadsave] = useState(false)
  const saveprivacy = async (e) => {
    e.preventDefault()
    try {
      setloadsave(true)
      const method = user?.email != null ? "email" : "sms";
      const updateprivacy = await axios.post("https://wiciki-media-backend-ahiu.onrender.com/decode/update/privacy",
        {
          profilevissibility: settings.profileVisibility,
          twofactorenabled: settings.twoFactorAuth,
          twofactormethod: method,
          loginalerts: settings.loginAlerts
        })

      if (updateprivacy.status == 200) {
        toast.success(updateprivacy.data.message, { id: "privacy", duration: 3000 })

      } else {
        toast.error(updateprivacy.data.message)
      }

    } catch (error) {
      console.error(error);
      toast.error(error?.message)
    } finally {
      setloadsave(false)
    }
  }

  const [loadsavegeneral, setloadsavegeneral] = useState(false)

  const savegeneral = async (e) => {
    e.preventDefault()
    try {
      setloadsavegeneral(true)
      const updateprivacy = await axios.post("https://wiciki-media-backend-ahiu.onrender.com/decode/update/notifications",
        {
          PushNotifications: settings.pushNotifications,
          emailsmsNotifications: settings.emailNotifications,
          NotificationSounds: settings.soundEnabled
        })

      if (updateprivacy.status == 200) {
        toast.success(updateprivacy.data.message, { id: "privacy", duration: 3000 })

      } else {
        toast.error(updateprivacy.data.message)
      }

    } catch (error) {
      console.error(error);
      toast.error(error?.message)
    } finally {
      setloadsavegeneral(false)
    }
  }

  const [loadsaveappearance, setloadsaveappearance] = useState(false)

  const saveappearance = async (e) => {
    e.preventDefault()
    try {
      setloadsaveappearance(true)
      const updateprivacy = await axios.post("https://wiciki-media-backend-ahiu.onrender.com/decode/update/display",
        {
          FontSize: settings.fontSize,
          ReduceMotion: settings.reduceMotion,
          imageAndVideoQuality: settings.imageQuality
        })

      if (updateprivacy.status == 200) {
        toast.success(updateprivacy.data.message, { id: "privacy", duration: 3000 })

      } else {
        toast.error(updateprivacy.data.message)
      }

    } catch (error) {
      console.error(error);
      toast.error(error?.message)
    } finally {
      setloadsaveappearance(false)
    }
  }

  const deactivateaccount = async (e) => {
    e.preventDefault()
    try {
      setloadsaveappearance(true)
      const updateprivacy = await axios.post("https://wiciki-media-backend-ahiu.onrender.com/decode/update/deactivate",
        {
          Deactivate: settings.Deactivate
        })

      if (updateprivacy.status == 200) {
        toast.success(updateprivacy.data.message, { id: "privacy", duration: 3000 })

      } else {
        toast.error(updateprivacy.data.message)
      }

    } catch (error) {
      console.error(error);
      toast.error(error?.message)
    } finally {
      setloadsaveappearance(false)
    }
  }












  const [userbio, setuserbio] = useState("")

  const savebio = async (e) => {
    e.preventDefault()
    try {
      setloadsaveappearance(true)
      const updateprivacy = await axios.post("https://wiciki-media-backend-ahiu.onrender.com/decode/update/bio",
        {
          BIO: userbio
        })

      if (updateprivacy.status == 200) {
        toast.success(updateprivacy.data.message, { id: "privacy", duration: 3000 })

      } else {
        toast.error(updateprivacy.data.message)
      }

    } catch (error) {
      console.error(error);
      toast.error(error?.message)
    } finally {
      setloadsaveappearance(false)
    }
  }

  useEffect(() => {
    if (user?.personalised?.BIO !== undefined) {
      setuserbio(user.personalised.BIO);
    }
  }, [user?.personalised?.BIO]);

  // Data lists
  const spokenLanguages = [
    { name: "English", icon: "🇬🇧" }, { name: "French", icon: "🇫🇷" }, { name: "Spanish", icon: "🇪🇸" },
    { name: "Mandarin Chinese", icon: "🇨🇳" }, { name: "Hindi", icon: "🇮🇳" }, { name: "Arabic", icon: "🇸🇦" },
    { name: "Bengali", icon: "🇧🇩" }, { name: "Portuguese", icon: "🇵🇹" }, { name: "Russian", icon: "🇷🇺" },
    { name: "Japanese", icon: "🇯🇵" }, { name: "German", icon: "🇩🇪" }, { name: "Korean", icon: "🇰🇷" },
    { name: "Italian", icon: "🇮🇹" }, { name: "Turkish", icon: "🇹🇷" }, { name: "Vietnamese", icon: "🇻🇳" },
    { name: "Swahili", icon: "🇰🇪" }, { name: "Tamil", icon: "🇱🇰" }, { name: "Dutch", icon: "🇳🇱" },
    { name: "Polish", icon: "🇵🇱" }, { name: "Thai", icon: "🇹🇭" }, { name: "Greek", icon: "🇬🇷" },
    { name: "Hebrew", icon: "🇮🇱" }, { name: "Amharic", icon: "🇪🇹" }, { name: "Zulu", icon: "🇿🇦" },
    { name: "Yoruba", icon: "🇳🇬" }, { name: "Hausa", icon: "🇳🇬" }, { name: "Igbo", icon: "🇳🇬" },
    { name: "Twi", icon: "🇬🇭" },
  ];

  const techLanguages = [
    { name: "HTML", icon: "📄" }, { name: "CSS", icon: "🎨" }, { name: "JavaScript", icon: "🟨" },
    { name: "TypeScript", icon: "🔷" }, { name: "React", icon: "⚛️" }, { name: "Vue.js", icon: "🟩" },
    { name: "Angular", icon: "🔺" }, { name: "Svelte", icon: "🔥" }, { name: "Next.js", icon: "⬛" },
    { name: "Nuxt.js", icon: "🟢" }, { name: "Node.js", icon: "🟢" }, { name: "Express", icon: "🚀" },
    { name: "Django", icon: "🐍" }, { name: "Flask", icon: "🥤" }, { name: "Laravel", icon: "❤️" },
    { name: "Spring Boot", icon: "🌿" }, { name: "Ruby on Rails", icon: "💎" }, { name: ".NET", icon: "🟣" },
    { name: "Go", icon: "💨" }, { name: "Rust", icon: "🦀" }, { name: "PHP", icon: "🐘" },
    { name: "C", icon: "🔵" }, { name: "C++", icon: "💠" }, { name: "C#", icon: "⚙️" },
    { name: "Java", icon: "☕" }, { name: "Kotlin", icon: "🟣" }, { name: "Swift", icon: "🦋" },
    { name: "Objective-C", icon: "🍏" }, { name: "Scala", icon: "🔥" }, { name: "Perl", icon: "🧶" },
    { name: "Elixir", icon: "💧" }, { name: "Erlang", icon: "🧠" }, { name: "Haskell", icon: "λ" },
    { name: "Clojure", icon: "🌿" }, { name: "F#", icon: "🧩" }, { name: "Shell Script", icon: "💻" },
    { name: "PowerShell", icon: "⚡" }, { name: "SQL", icon: "🗄️" }, { name: "GraphQL", icon: "🕸️" },
    { name: "Firebase", icon: "🔥" }, { name: "Supabase", icon: "🟩" }, { name: "MongoDB", icon: "🍃" },
    { name: "MySQL", icon: "🐬" }, { name: "PostgreSQL", icon: "🐘" }, { name: "SQLite", icon: "💾" },
    { name: "Redis", icon: "🧠" }, { name: "Docker", icon: "🐳" }, { name: "Kubernetes", icon: "☸️" },
    { name: "Git", icon: "🔧" }, { name: "GitHub Actions", icon: "⚙️" }, { name: "AWS", icon: "☁️" },
    { name: "Azure", icon: "🔷" }, { name: "Google Cloud", icon: "🌥️" }, { name: "Linux", icon: "🐧" },
  ];

  // helper: map backend lists to canonical names (keeps same logic)
  const mapBackendToCanonical = (backendArr, masterList) => {
    if (!Array.isArray(backendArr)) return [];
    const lowerToCanonical = new Map(masterList.map(m => [m.name.trim().toLowerCase(), m.name]));
    const result = [];
    backendArr.forEach((val) => {
      if (!val) return;
      const lookup = String(val).trim().toLowerCase();
      if (lowerToCanonical.has(lookup)) {
        result.push(lowerToCanonical.get(lookup));
      } else {
        const partial = masterList.find(m => m.name.toLowerCase().includes(lookup) || lookup.includes(m.name.toLowerCase()));
        if (partial) result.push(partial.name);
        else {
          const normalized = String(val).trim();
          if (normalized) result.push(normalized);
        }
      }
    });
    return Array.from(new Set(result));
  };

  // fetch user + initialize UI arrays
  useEffect(() => {
    // const getUser = async () => {

    //   if (!token) {
    //     console.warn('No token for SettingsPage');
    //     return;
    //   }
    //   try {
    //     setLoading(true);
    //     const res = await axios.get("https://wiciki-media-backend-ahiu.onrender.com/decode/me", {
    //       headers: { Authorization: `Bearer ${token}` }
    //     });

    //     if (res.status === 200) {
    //       const fetchedUser = res.data.user;
    //       setUser(fetchedUser);

    //       // set settings booleans (defensive checks)
    //       const backendBool =
    //         fetchedUser?.personalised?.profilevisibility ??
    //         fetchedUser?.profilevisibility ??
    //         null;

    //       const backendBoolallowMessages =
    //         fetchedUser?.personalised?.allowMessages ??
    //         fetchedUser?.allowMessages ??
    //         null;

    //       const backendBoolshowBirthday =
    //         fetchedUser?.personalised?.showBirthday ??
    //         fetchedUser?.showBirthday ??
    //         null;

    //       const backendBoolallowTagging =
    //         fetchedUser?.personalised?.allowTagging ??
    //         fetchedUser?.allowTagging ??
    //         null;

    //       const backendBoolShowAllMentors =
    //         fetchedUser?.personalised?.ShowAllMentors ??
    //         fetchedUser?.ShowAllMentors ??
    //         null;
    //       const backendBooltwoFactorAuth =
    //         fetchedUser?.twofactorenabled;
    //       const backendBoolloginAlerts =
    //         fetchedUser?.loginalerts;
    //       setSettings(prev => ({
    //         ...prev,
    //         allowMessages: backendBoolallowMessages !== null && backendBoolallowMessages !== undefined ? Boolean(backendBoolallowMessages) : prev.allowMessages,
    //         profilevisibility: backendBool !== null && backendBool !== undefined ? Boolean(backendBool) : prev.profilevisibility,
    //         showBirthday: backendBoolshowBirthday !== null && backendBoolshowBirthday !== undefined ? Boolean(backendBoolshowBirthday) : prev.showBirthday,
    //         allowTagging: backendBoolallowTagging !== null && backendBoolallowTagging !== undefined ? Boolean(backendBoolallowTagging) : prev.allowTagging,
    //         ShowAllMentors: backendBoolShowAllMentors !== null && backendBoolShowAllMentors !== undefined ? Boolean(backendBoolShowAllMentors) : prev.ShowAllMentors,
    //         loginAlerts: backendBoolloginAlerts !== null && backendBoolloginAlerts !== undefined ? Boolean(backendBoolloginAlerts) : prev.loginAlerts,

    //         twoFactorAuth: backendBooltwoFactorAuth !== null && backendBooltwoFactorAuth !== undefined ? Boolean(backendBooltwoFactorAuth) : prev.twoFactorAuth,
    //         profileVisibility: user?.profilevissibility != null ? user?.profilevissibility : prev.profileVisibility,
    //       }));

    //       // map backend spoken/programming languages into canonical lists for the UI
    //       setSelectedLangs(mapBackendToCanonical(fetchedUser?.SpokenLanguages || fetchedUser?.spokenLanguages || [], spokenLanguages));
    //       setSelectedTech(mapBackendToCanonical(fetchedUser?.ProgrammingLanguages || fetchedUser?.programmingLanguages || [], techLanguages));
    //     } else {
    //       console.warn('Could not fetch user:', res?.data?.message);
    //     }
    //   } catch (err) {
    //     console.error('Error fetching user in SettingsPage:', err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const getUser = async () => {
      if (!token) {
        console.warn('No token for SettingsPage');
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get("https://wiciki-media-backend-ahiu.onrender.com/decode/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.status === 200) {
          1          // prefer .data.user but fall back to .data
          const fetchedUser = res.data?.user ?? res.data;
          setUser(fetchedUser);

          // helper to normalize booleans that may come as string/number/boolean
          const toBoolOrNull = (val) => {
            if (val === null || val === undefined) return null;
            if (typeof val === 'boolean') return val;
            if (typeof val === 'number') return val !== 0;
            if (typeof val === 'string') {
              const s = val.trim().toLowerCase();
              if (s === 'true') return true;
              if (s === 'false') return false;
            }
            return Boolean(val);
          };

          const backendBool = toBoolOrNull(
            fetchedUser?.personalised?.profilevisibility ??
            fetchedUser?.profilevisibility ??
            null
          );

          const backendBoolallowMessages = toBoolOrNull(
            fetchedUser?.personalised?.allowMessages ??
            fetchedUser?.allowMessages ??
            null
          );

          const backendBoolshowBirthday = toBoolOrNull(
            fetchedUser?.personalised?.showBirthday ??
            fetchedUser?.showBirthday ??
            null
          );

          const backendBoolallowTagging = toBoolOrNull(
            fetchedUser?.personalised?.allowTagging ??
            fetchedUser?.allowTagging ??
            null
          );

          const backendBoolShowAllMentors = toBoolOrNull(
            fetchedUser?.personalised?.ShowAllMentors ??
            fetchedUser?.ShowAllMentors ??
            null
          );

          const backendBooltwoFactorAuth = toBoolOrNull(
            fetchedUser?.personalised?.twofactorenabled ??
            fetchedUser?.twofactorenabled ??
            fetchedUser?.twoFactorEnabled ??
            null
          );

          const backendBoolloginAlerts = toBoolOrNull(
            fetchedUser?.personalised?.loginalerts ??
            fetchedUser?.loginalerts ??
            fetchedUser?.loginAlerts ??
            null
          );
          const backendBoolpushNotifications =
            toBoolOrNull(
              fetchedUser?.personalised?.PushNotifications ??
              fetchedUser?.PushNotifications ??
              fetchedUser?.PushNotifications ??
              null
            );
          const backendBoolemailNotifications = toBoolOrNull(
            fetchedUser?.personalised?.emailsmsNotifications ??
            fetchedUser?.emailsmsNotifications ??
            fetchedUser?.emailsmsNotifications ??
            null
          );
          const backendBoolsoundEnabled = toBoolOrNull(
            fetchedUser?.personalised?.NotificationSounds ??
            fetchedUser?.NotificationSounds ??
            fetchedUser?.NotificationSounds ??
            null
          );

          const backendBoolreduceMotion = toBoolOrNull(
            fetchedUser?.personalised?.ReduceMotion ??
            fetchedUser?.ReduceMotion ??
            fetchedUser?.ReduceMotion ??
            null
          );
          const backendBoolDeactivate = toBoolOrNull(
            fetchedUser?.personalised?.Deactivate ??
            fetchedUser?.Deactivate ??
            fetchedUser?.Deactivate ??
            null
          );
          // pick any profile-visibility string the backend might provide
          const profileVisibilityString =
            fetchedUser?.profileVisibility ??
            fetchedUser?.profilevissibility ?? // possible misspelling in backend
            fetchedUser?.profilevissibility ??
            null;
          const fontSizestring =
            fetchedUser?.FontSize ??
            fetchedUser?.FontSize ?? // possible misspelling in backend
            fetchedUser?.FontSize ??
            null;
          const imageQualitystring =
            fetchedUser?.imageAndVideoQuality ??
            fetchedUser?.imageAndVideoQuality ?? // possible misspelling in backend
            fetchedUser?.imageAndVideoQuality ??
            null;
          setSettings(prev => ({
            ...prev,
            allowMessages: backendBoolallowMessages ?? prev.allowMessages,
            profilevisibility: backendBool ?? prev.profilevisibility,
            showBirthday: backendBoolshowBirthday ?? prev.showBirthday,
            allowTagging: backendBoolallowTagging ?? prev.allowTagging,
            ShowAllMentors: backendBoolShowAllMentors ?? prev.ShowAllMentors,
            loginAlerts: backendBoolloginAlerts ?? prev.loginAlerts,
            twoFactorAuth: backendBooltwoFactorAuth ?? prev.twoFactorAuth,
            pushNotifications: backendBoolpushNotifications ?? prev.pushNotifications,
            emailNotifications: backendBoolemailNotifications ?? prev.emailNotifications,
            soundEnabled: backendBoolsoundEnabled ?? prev.soundEnabled,
            reduceMotion: backendBoolreduceMotion ?? prev.reduceMotion,
            profileVisibility: profileVisibilityString ?? prev.profileVisibility,
            fontSize: fontSizestring ?? prev.fontSize,
            Deactivate: backendBoolDeactivate ?? prev.Deactivate,
            imageQuality: imageQualitystring ?? prev.imageQuality
          }));

          // map backend spoken/programming languages into canonical lists for the UI
          setSelectedLangs(mapBackendToCanonical(
            fetchedUser?.SpokenLanguages ??
            fetchedUser?.spokenLanguages ??
            fetchedUser?.languages ??
            [],
            spokenLanguages
          ));
          setSelectedTech(mapBackendToCanonical(
            fetchedUser?.ProgrammingLanguages ??
            fetchedUser?.programmingLanguages ??
            fetchedUser?.skills ??
            [],
            techLanguages
          ));
        } else {
          console.warn('Could not fetch user:', res?.data?.message);
        }
      } catch (err) {
        console.error('Error fetching user in SettingsPage:', err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [token]); // token dependency

  // safe toggler using functional setState to avoid stale closures
  const toggleSetting = (setting) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const updateSetting = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  // selection helper for language/tech buttons
  const handleSelect = (name, selected, setSelected) => {
    setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  // Save professional/work info
  const handleSaveWorkInfo = async () => {
    if (!isEditing) {
      alert("Enable edit mode before saving changes.");
      return;
    }
    if (!token) {
      alert("No auth token — please log in.");
      return;
    }

    try {
      setLoadingsaving(true);
      const payload = {
        proffession: user?.proffession || "",
        Education: user?.Education || "",
        ProjectsCompleted: user?.ProjectsCompleted || "",
        YearsOfExperience: user?.YearsOfExperience || "",
        SpokenLanguages: selectedLangs,
        ProgrammingLanguages: selectedTech,
        website: user?.website || "",
      };

      const response = await axios.post(
        "https://wiciki-media-backend-ahiu.onrender.com/decode/update/work",
        payload,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      alert((response.data?.message || "Updated"));
      if (response.data?.user) {
        setUser(response.data.user);
        setSelectedLangs(mapBackendToCanonical(response.data.user?.SpokenLanguages || [], spokenLanguages));
        setSelectedTech(mapBackendToCanonical(response.data.user?.ProgrammingLanguages || [], techLanguages));
      }
    } catch (error) {
      console.error("❌ Update Error:", error);
      alert(error.response?.data?.message || "Failed to update professional info.");
    } finally {
      setLoadingsaving(false);
    }
  };

  // settings sections (kept same keys as original)
  const settingsSections = {
    general: {
      icon: <Bell size={20} />,
      title: 'Notifications',
      settings: [
        {
          type: 'toggle', key: 'pushNotifications',
          label: loading ? "loading.." : 'Push Notifications',
          description: 'Receive notifications on your device',
          value: settings.pushNotifications
        },
        {
          type: 'toggle', key: 'emailNotifications',
          label: loading ? "loading.." : 'Email & sms Notifications',
          description: 'Get updates via email',
          value: settings.emailNotifications
        },
        {
          type: 'toggle', key: 'soundEnabled',
          label: loading ? "loading.." : 'Notification Sounds',
          description: 'Play sounds for new notifications',
          value: settings.soundEnabled
        }
      ]
    },
    privacy: {
      icon: <Shield size={20} />,
      title: 'Privacy & Security',
      settings: [
        {
          type: 'select',
          key: 'profileVisibility',
          label: loading ? "loading.." : 'Profile Visibility',
          description: 'Who can see your profile',
          value: settings.profileVisibility,
          options: [
            { label: 'Public', value: 'public' },
            { label: 'Private', value: 'private' }
          ]

        },
        {
          type: 'toggle', key: 'twoFactorAuth',
          label: loading ? "loading.." : 'Two-Factor Authentication',
          description: 'Extra security for your account',
          value: settings.twoFactorAuth
        },
        {
          type: 'toggle', key: 'loginAlerts',
          label: loading ? "loading.." : 'Login Alerts',
          description: 'Get notified of new logins',
          value: settings.loginAlerts
        },
        {
          type: 'toggle', key: 'profilevisibility',
          label: loading ? 'loading...' : 'Profile Visibility (toggle)',
          description: 'Allow Your History to be read By everyone',
          value: settings.profilevisibility
        },
        { type: 'toggle', key: 'showBirthday', label: loading ? 'loading...' : 'Show Birthday For Everyone', description: 'Allow Your Birthday to be visible', value: settings.showBirthday },
        { type: 'toggle', key: 'allowTagging', label: loading ? 'loading...' : 'Allow Tagging', description: 'Allow everyone to tag you on their posts', value: settings.allowTagging },
        { type: 'toggle', key: 'ShowAllMentors', label: loading ? 'loading...' : 'Show All Mentors', description: 'Show all mentors', value: settings.ShowAllMentors },
        { type: 'toggle', key: 'allowMessages', label: loading ? 'loading...' : 'Allow Unknown Gists', description: 'Allow unknown people to send you gists', value: settings.allowMessages }
      ],
    },
    appearance: {
      icon: <Palette size={20} />,
      title: 'Theme & Appearance',
      settings: [
        // { type: 'toggle', key: 'darkMode', label: 'Dark Mode', description: 'Use dark theme across app', value: settings.darkMode },
        { type: 'select', key: 'fontSize', label: loading ? "loading.." : 'Font Size', description: 'Adjust text size', value: settings.fontSize, options: [{ label: 'Small', value: 'small' }, { label: 'Medium', value: 'medium' }, { label: 'Large', value: 'large' }] },
        { type: 'toggle', key: 'reduceMotion', label: loading ? "loading.." : 'Reduce Motion', description: 'Minimize animations', value: settings.reduceMotion },

        { type: 'select', key: 'imageQuality', label: loading ? "loading.." : 'Image And Video Quality', description: 'Adjust text size', value: settings.imageQuality, options: [{ label: 'Low', value: 'low' }, { label: 'Medium', value: 'medium' }, { label: 'High', value: 'high' }] },

      ]
    },
    account: {
      icon: <User size={20} />,
      title: 'Account Settings',
      settings: [
        // { type: 'button', key: 'changePassword', label: 'Change Password', description: 'Update your login password' },
        // { type: 'button', key: 'backupData', label: 'Backup Data', description: 'Download your information' },
        { type: 'toggle', key: 'Deactivate', label: loading ? "loading.." : 'Deactivate Account', description: 'Temporarily disable your account', value: settings.Deactivate }
      ]
    }
  };

  if (!isOpen) return null;

  return (
    <div className="aviary-overlay">
      <div className="aviary">
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
              <span className="search-text">Search something</span>
            </button>

            <button className="robin-close" onClick={onClose} aria-label="Close settings">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="aviary-content">
          {/* Mobile nav overlay */}
          {isMobileMenuOpen && (
            <div className="mobile-nav-overlay" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-nav-header">
                  <h3>Settings & Privacy</h3>
                  <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
                </div>

                <div className="mobile-nav-sections">
                  {Object.entries(settingsSections).map(([key, section]) => (
                    <div key={key} className={`mobile-nav-item ${activeSection === key ? 'active' : ''}`} onClick={() => { setActiveSection(key); setIsMobileMenuOpen(false); }}>
                      <div className="mobile-nav-icon">{section.icon}</div>
                      <span className="mobile-nav-text">{section.title}</span>
                      <ChevronRight size={16} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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

                {activeSection === 'account' && (
                  <div className="question-page">
                    <div className="question-section">
                      <div className="header">
                        <h2>Professional Information</h2>
                        <button className={`edit-btn ${isEditing ? "disable" : "enable"}`} onClick={() => setIsEditing(!isEditing)}>
                          {isEditing ? "Disable Edit ✖" : "Enable Edit ✏️"}
                        </button>
                      </div>

                      <div className="questioning-input-sec">
                        <div className="questioning-input-wrap">
                          <label>Profession:</label>
                          <input type="text" disabled={!isEditing} value={user?.proffession || ''} onChange={(e) => setUser(prev => ({ ...prev, proffession: e.target.value }))} />
                        </div>
                        <div className="questioning-input-wrap">
                          <label>Years of Experience:</label>
                          <input type="text" disabled={!isEditing} value={user?.YearsOfExperience || ''} onChange={(e) => setUser(prev => ({ ...prev, YearsOfExperience: e.target.value }))} />
                        </div>
                        <div className="questioning-input-wrap">
                          <label>Projects Completed:</label>
                          <input type="number" disabled={!isEditing} value={user?.ProjectsCompleted || ''} onChange={(e) => setUser(prev => ({ ...prev, ProjectsCompleted: e.target.value }))} />
                        </div>
                        <div className="questioning-input-wrap">
                          <label>Education:</label>
                          <input type="text" disabled={!isEditing} value={user?.Education || ''} onChange={(e) => setUser(prev => ({ ...prev, Education: e.target.value }))} />
                        </div>
                        <div className="questioning-input-wrap">
                          <label>Website / Portfolio:</label>
                          <input type="text" disabled={!isEditing} value={user?.website || ''} onChange={(e) => setUser(prev => ({ ...prev, website: e.target.value }))} />
                        </div>
                      </div>

                      <div className="selector-group">
                        <h3>🌍 Spoken Languages</h3>
                        {loading ? <p>Loading...</p> :
                          <div className="options">
                            {spokenLanguages.map(lang => (
                              <button key={lang.name} type="button"
                                className={`option-btn ${selectedLangs.includes(lang.name) ? 'selected' : ''}`}
                                disabled={!isEditing}
                                onClick={() => handleSelect(lang.name, selectedLangs, setSelectedLangs)}
                              >
                                <span style={{ marginRight: 8 }}>{lang.icon}</span>{lang.name}
                              </button>
                            ))}
                          </div>
                        }
                      </div>

                      <div className="selector-group">
                        <h3>💻 Programming Languages</h3>
                        {loading ? <p>Loading...</p> :
                          <div className="options">
                            {techLanguages.map(tech => (
                              <button key={tech.name} type="button"
                                className={`option-btn ${selectedTech.includes(tech.name) ? 'selected' : ''}`}
                                disabled={!isEditing}
                                onClick={() => handleSelect(tech.name, selectedTech, setSelectedTech)}
                              >
                                <span style={{ marginRight: 8 }}>{tech.icon}</span>{tech.name}
                              </button>
                            ))}
                          </div>
                        }
                      </div>

                      <div style={{ marginTop: 12 }}>
                        <button className="submit-btn1" onClick={handleSaveWorkInfo} disabled={!isEditing || loadingsaving}>
                          {loadingsaving ? 'Saving...' : 'Save Work Info'}
                        </button>


                      </div>
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
                {(activeSection === "privacy" &&
                  <button className='SaveSettings' style={{ opacity: loadsave && 0.5, cursor: loadsave && "not-allowed" }} onClick={saveprivacy} disabled={loadsave}>{loadsave ? "loading.." : "Save Settings"}</button>
                )}
                {(activeSection === "general" &&
                  <button className='SaveSettings' style={{ opacity: loadsavegeneral && 0.5, cursor: loadsavegeneral && "not-allowed" }} onClick={savegeneral} disabled={loadsavegeneral}>{loadsavegeneral ? "loading.." : "Save Settings"}</button>
                )}
                {(activeSection === "appearance" &&
                  <button className='SaveSettings' style={{ opacity: loadsaveappearance && 0.5, cursor: loadsaveappearance && "not-allowed" }} onClick={saveappearance} disabled={loadsaveappearance}>{loadsaveappearance ? "loading.." : "Save Settings"}</button>
                )}
                {/*  */}
                {(activeSection === "account" &&
                  <>
                    <button className='SaveSettings' style={{ opacity: loadsaveappearance && 0.5, cursor: loadsaveappearance && "not-allowed" }} onClick={deactivateaccount} disabled={loadsaveappearance}>{loadsaveappearance ? "loading.." : "Save Settings"}</button>


                    <div className="account-history">
                      {/* LEFT PANEL */}
                      <div className="account-left">
                        <div className="section-header">
                          <h3>About <span>{user?.name}</span></h3>
                          <button className="edit-btn" onClick={savebio} disabled={loadsaveappearance}>
                            {loadsaveappearance ? "loading.." : "save"}
                          </button>
                        </div>

                        <div className="bio-section">
                          <label htmlFor="bio" className="label">Bio</label>
                          <textarea
                            id="bio"
                            className="textarefore"
                            placeholder="Write something about yourself..."
                            onChange={(e) => setuserbio(e.target.value)}
                            value={userbio}

                          />
                        </div>

                        <div className="details">
                          <label className="label">Email:</label>
                          <p>{user?.email}</p>

                          <label className="labeling">Username:</label>
                          <p>@{user?.name}</p>

                          {/* <label className="labeling">Role:</label>
                          <p>{user?.personalised?.whoareyou}</p> */}
                        </div>
                      </div>

                      {/* RIGHT PANEL */}
                      <div className="account-right">
                        <h3>Account History</h3>
                        <div className="history-card">
                          <p>
                            <strong>Created On:</strong>{" "}
                            {user?.createdAt
                              ? new Date(user.createdAt).toLocaleString()
                              : "Unknown"}
                          </p>
                          {/* <p>
                            <strong>Last Updated:</strong>{" "}
                            {user?.updatedAt
                              ? new Date(user.updatedAt).toLocaleString()
                              : "Not available"}
                          </p> */}
                          <p>
                            <strong>Status:</strong>{" "}
                            <span className="status active">Active</span>
                          </p>
                        </div>
                      </div>
                    </div>

                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="aviary-footer">
          <div className="footer-nest">
            <div className="bird-links">
              <a href="#" className="bird-link">Privacy</a>
              <a href="#" className="bird-link">Terms</a>
              <a href="#" className="bird-link">Advertising</a>
              <a href="#" className="bird-link">Cookies</a>
              <a onClick={() => Cookies.remove("token")} className="bird-link" role="button">More</a>
            </div>
            <div className="bird-song">Vildash Network © {new Date().getFullYear()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


// // pages/VibesPage.js
// import React, { useState, useEffect, useRef } from 'react';

// const VibesPage = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [message, setMessage] = useState('');
//   const [showSettings, setShowSettings] = useState(false);
//   const messagesEndRef = useRef(null);

//   const chats = [
//     {
//       id: 1,
//       name: "Amara Okafor",
//       avatar: "AM",
//       lastMessage: "Great work on the design!",
//       time: "11:30 AM",
//       unread: 2,
//       online: true
//     },
//     {
//       id: 2,
//       name: "Kwame Nkrumah",
//       avatar: "KN",
//       lastMessage: "Let's collaborate on this project",
//       time: "10:15 AM",
//       unread: 0,
//       online: true
//     },
//     {
//       id: 3,
//       name: "Design Team",
//       avatar: "DT",
//       lastMessage: "Meeting at 3 PM tomorrow",
//       time: "Yesterday",
//       unread: 5,
//       online: false
//     },
//     {
//       id: 4,
//       name: "Chidi Mbatha",
//       avatar: "CM",
//       lastMessage: "Sent you the assets",
//       time: "Yesterday",
//       unread: 0,
//       online: false
//     }
//   ];

//   const [messages, setMessages] = useState({
//     1: [
//       {
//         id: 1,
//         text: "Hey! I saw your latest gist about the banking app. The accessibility features are brilliant!",
//         sent: false,
//         time: "11:25 AM"
//       },
//       {
//         id: 2,
//         text: "Thank you! I'd love to hear your thoughts on the color contrast choices.",
//         sent: true,
//         time: "11:27 AM"
//       },
//       {
//         id: 3,
//         text: "The warm earth tones work perfectly with the gold accents. Very Afro-futuristic!",
//         sent: false,
//         time: "11:28 AM"
//       }
//     ],
//     2: [
//       {
//         id: 1,
//         text: "Hey! I loved your portfolio design",
//         sent: false,
//         time: "10:10 AM"
//       },
//       {
//         id: 2,
//         text: "Thanks! Would you like to collaborate on a project?",
//         sent: true,
//         time: "10:12 AM"
//       }
//     ],
//     3: [
//       {
//         id: 1,
//         text: "Team meeting scheduled for tomorrow",
//         sent: false,
//         time: "Yesterday"
//       }
//     ],
//     4: [
//       {
//         id: 1,
//         text: "I've sent the design assets to your email",
//         sent: false,
//         time: "Yesterday"
//       }
//     ]
//   });

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, selectedChat]);

//   const sendMessage = (e) => {
//     if (e && e.key !== 'Enter' && e.type !== 'click') return;

//     if (message.trim() && selectedChat) {
//       const newMessage = {
//         id: messages[selectedChat.id].length + 1,
//         text: message,
//         sent: true,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       };

//       setMessages(prev => ({
//         ...prev,
//         [selectedChat.id]: [...prev[selectedChat.id], newMessage]
//       }));
//       setMessage('');

//       // Simulate response after a delay
//       setTimeout(() => {
//         const responses = [
//           "That's a great point! Let's discuss this further.",
//           "I completely agree with you on this.",
//           "When can we schedule a call to talk more about this?",
//           "I'll send you the files right away.",
//           "Thanks for your feedback!"
//         ];
//         const response = {
//           id: messages[selectedChat.id].length + 2,
//           text: responses[Math.floor(Math.random() * responses.length)],
//           sent: false,
//           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//         };
//         setMessages(prev => ({
//           ...prev,
//           [selectedChat.id]: [...prev[selectedChat.id], response]
//         }));
//       }, 1500);
//     }
//   };

//   const selectChat = (chat) => {
//     setSelectedChat(chat);
//   };

//   const goBack = () => {
//     setSelectedChat(null);
//   };

//   return (
//     <div id="vibes" className="page whatsapp-style">
//       <div className="chat-app-container">
//         {/* Chat List Sidebar */}
//         <div className={`chat-list-sidebar ${selectedChat ? 'hidden' : ''}`}>
//           <div className="chat-list-header">
//             <div className="profile-section">
//               <div className="user-avatar">YO</div>
//               <h3>Your Name</h3>
//             </div>
//             <div className="header-actions">
//               <button className="icon-btn" onClick={() => setShowSettings(true)}>
//                 <span>⚙️</span>
//               </button>
//             </div>
//           </div>

//           <div className="search-container">
//             <input
//               type="text"
//               placeholder="Search or start new chat"
//               className="search-input"
//             />
//           </div>

//           <div className="chats-list">
//             {chats.map(chat => (
//               <div
//                 key={chat.id}
//                 className={`chat-list-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
//                 onClick={() => selectChat(chat)}
//               >
//                 <div className="chat-avatar">
//                   <div className="avatar">{chat.avatar}</div>
//                   {chat.online && <div className="online-indicator"></div>}
//                 </div>
//                 <div className="chat-info">
//                   <div className="chat-header">
//                     <h4>{chat.name}</h4>
//                     <span className="time">{chat.time}</span>
//                   </div>
//                   <div className="last-message">
//                     <p>{chat.lastMessage}</p>
//                     {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Chat Main Area */}
//         <div className={`chat-main-area ${!selectedChat ? 'hidden' : ''}`}>
//           {selectedChat ? (
//             <>
//               <div className="chat-header">
//                 <button className="back-button" onClick={goBack}>
//                   <span>‹</span>
//                 </button>
//                 <div className="chat-user-info">
//                   <div className="chat-avatar">
//                     <div className="avatar">{selectedChat.avatar}</div>
//                     {selectedChat.online && <div className="online-indicator"></div>}
//                   </div>
//                   <div>
//                     <h3>{selectedChat.name}</h3>
//                     <span className="status">Online</span>
//                   </div>
//                 </div>
//                 <div className="chat-actions">
//                   <button className="icon-btn">📹</button>
//                   <button className="icon-btn">📞</button>
//                   <button className="icon-btn" onClick={() => setShowSettings(true)}>⋯</button>
//                 </div>
//               </div>

//               <div className="chat-messages">
//                 <div className="message-date">Today</div>
//                 {messages[selectedChat.id]?.map(msg => (
//                   <div key={msg.id} className={`message ${msg.sent ? 'sent' : 'received'}`}>
//                     <div className="message-content">
//                       <div className="message-bubble">
//                         {msg.text}
//                       </div>
//                       <span className="message-time">{msg.time}</span>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>

//               <div className="chat-input-container">
//                 <div className="input-actions">
//                   <button className="icon-btn">➕</button>
//                   <button className="icon-btn">📎</button>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Type a message"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyPress={(e) => sendMessage(e)}
//                   className="message-input"
//                 />
//                 <button
//                   className="send-button"
//                   onClick={sendMessage}
//                   disabled={!message.trim()}
//                 >
//                   {message.trim() ? '➤' : '🎤'}
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="no-chat-selected">
//               <div className="welcome-message">
//                 <h2>Welcome to Vibes</h2>
//                 <p>Select a chat to start messaging</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Settings Popup */}
//       {showSettings && (
//         <div className="settings-overlay">
//           <div className="settings-popup">
//             <div className="settings-header">
//               <h3>Settings</h3>
//               <button className="close-btn" onClick={() => setShowSettings(false)}>×</button>
//             </div>
//             <div className="settings-content">
//               <div className="settings-item">
//                 <span>Notifications</span>
//                 <label className="switch">
//                   <input type="checkbox" defaultChecked />
//                   <span className="slider"></span>
//                 </label>
//               </div>
//               <div className="settings-item">
//                 <span>Dark Mode</span>
//                 <label className="switch">
//                   <input type="checkbox" defaultChecked />
//                   <span className="slider"></span>
//                 </label>
//               </div>
//               <div className="settings-item">
//                 <span>Privacy</span>
//                 <span>›</span>
//               </div>
//               <div className="settings-item">
//                 <span>Storage</span>
//                 <span>›</span>
//               </div>
//               <div className="settings-item">
//                 <span>Help</span>
//                 <span>›</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VibesPage;















// pages/VibesPage.js
import React, { useState, useEffect, useRef } from 'react';

const VibesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const messagesEndRef = useRef(null);

  const chats = [
    {
      id: 1,
      name: "Amara Okafor",
      avatar: "AM",
      lastMessage: "Great work on the design!",
      time: "11:30 AM",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Kwame Nkrumah",
      avatar: "KN",
      lastMessage: "Let's collaborate on this project",
      time: "10:15 AM",
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: "Design Team",
      avatar: "DT",
      lastMessage: "Meeting at 3 PM tomorrow",
      time: "Yesterday",
      unread: 5,
      online: false
    },
    {
      id: 4,
      name: "Chidi Mbatha",
      avatar: "CM",
      lastMessage: "Sent you the assets",
      time: "Yesterday",
      unread: 0,
      online: false
    }
  ];

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        text: "Hey! I saw your latest gist about the banking app. The accessibility features are brilliant!",
        sent: false,
        time: "11:25 AM"
      },
      {
        id: 2,
        text: "Thank you! I'd love to hear your thoughts on the color contrast choices.",
        sent: true,
        time: "11:27 AM"
      },
      {
        id: 3,
        text: "The warm earth tones work perfectly with the gold accents. Very Afro-futuristic!",
        sent: false,
        time: "11:28 AM"
      }
    ],
    2: [
      {
        id: 1,
        text: "Hey! I loved your portfolio design",
        sent: false,
        time: "10:10 AM"
      },
      {
        id: 2,
        text: "Thanks! Would you like to collaborate on a project?",
        sent: true,
        time: "10:12 AM"
      }
    ],
    3: [
      {
        id: 1,
        text: "Team meeting scheduled for tomorrow",
        sent: false,
        time: "Yesterday"
      }
    ],
    4: [
      {
        id: 1,
        text: "I've sent the design assets to your email",
        sent: false,
        time: "Yesterday"
      }
    ]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]);

  const sendMessage = (e) => {
    if (e && e.key !== 'Enter' && e.type !== 'click') return;

    if (message.trim() && selectedChat) {
      const newMessage = {
        id: messages[selectedChat.id].length + 1,
        text: message,
        sent: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [selectedChat.id]: [...prev[selectedChat.id], newMessage]
      }));
      setMessage('');

      // Simulate response after a delay
      setTimeout(() => {
        const responses = [
          "That's a great point! Let's discuss this further.",
          "I completely agree with you on this.",
          "When can we schedule a call to talk more about this?",
          "I'll send you the files right away.",
          "Thanks for your feedback!"
        ];
        const response = {
          id: messages[selectedChat.id].length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sent: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => ({
          ...prev,
          [selectedChat.id]: [...prev[selectedChat.id], response]
        }));
      }, 1500);
    }
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
  };

  const goBack = () => {
    setSelectedChat(null);
  };

  const enterFullScreen = () => {
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <div id="vibes" className={`page whatsapp-style ${isFullScreen ? 'full-screen-mode' : ''}`}>
      {/* Full Screen Toggle Button - Only show when NOT in full screen */}
      {!isFullScreen && (
        <div className="full-screen-toggle">
          <button className="full-screen-btn" onClick={enterFullScreen}>
            ⛶ Enter Full Screen
          </button>
        </div>
      )}

      <div className="chat-app-container">
        {/* Chat List Sidebar */}
        <div className={`chat-list-sidebar ${selectedChat ? 'hidden' : ''}`}>
          <div className="chat-list-header">
            <div className="profile-section">
              <div className="user-avatar">YO</div>
              <h3>Your Name</h3>
            </div>
            <div className="header-actions">
              <button className="icon-btn" onClick={() => setShowSettings(true)}>
                <span><ion-icon name="settings-outline"></ion-icon></span>
              </button>
            </div>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search or start new chat"
              className="search-input"
            />
          </div>

          <div className="chats-list">
            {chats.map(chat => (
              <div
                key={chat.id}
                className={`chat-list-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => selectChat(chat)}
              >
                <div className="chat-avatar">
                  <div className="avatar">{chat.avatar}</div>
                  {chat.online && <div className="online-indicator"></div>}
                </div>
                <div className="chat-info">
                  <div className="chat-header">
                    <h4>{chat.name}</h4>
                    <span className="time">{chat.time}</span>
                  </div>
                  <div className="last-message">
                    <p>{chat.lastMessage}</p>
                    {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Main Area */}
        <div className={`chat-main-area ${!selectedChat ? 'hidden' : ''}`}>
          {selectedChat ? (
            <>
              {/* Fixed Header in Full Screen Mode */}
              <div className={`chat-header ${isFullScreen ? 'fixed-header' : ''}`}>
                <button className="back-button" onClick={goBack}>
                  <span>‹</span>
                </button>
                <div className="chat-user-info">
                  <div className="chat-avatar">
                    <div className="avatar">{selectedChat.avatar}</div>
                    {selectedChat.online && <div className="online-indicator"></div>}
                  </div>
                  <div className='spaces1'>
                    <h3>{selectedChat.name.slice(0, 3) + "..."}</h3>
                    <span className="status">Online</span>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="icon-btn"><ion-icon name="videocam-outline"></ion-icon></button>
                  <button className="icon-btn"><ion-icon name="call-outline"></ion-icon></button>
                  <button className="icon-btn" onClick={() => setShowSettings(true)}>⋯</button>
                  {isFullScreen && (
                    <button className="icon-btn exit-fullscreen-btn" onClick={exitFullScreen}>
                      <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                  )}
                </div>
              </div>

              <div className={`chat-messages ${isFullScreen ? 'full-screen-messages' : ''}`}>
                <div className="message-date">Today</div>
                {messages[selectedChat.id]?.map(msg => (
                  <div key={msg.id} className={`message ${msg.sent ? 'sent' : 'received'}`}>
                    <div className="message-content">
                      <div className="message-bubble">
                        {msg.text}
                      </div>
                      <span className="message-time">{msg.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Fixed Input Container in Full Screen Mode */}
              <div className={`chat-input-container ${isFullScreen ? 'fixed-input' : ''}`}>
                <div className="input-actions">
                  <button className="icon-btn uploading"><ion-icon name="cloud-upload-outline"></ion-icon></button>
                  {/* <button className="icon-btn">📎</button> */}
                </div>
                <textarea
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => sendMessage(e)}
                  className="message-input"
                />
                <button
                  className="send-button"
                  onClick={sendMessage}
                  disabled={!message.trim()}
                >
                  {message.trim() ? <ion-icon name="send-outline"></ion-icon> : <ion-icon name="mic-outline"></ion-icon>}
                </button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="welcome-message">
                <h2>Welcome to Vibes</h2>
                <p>Select a chat to start messaging</p>
                {isFullScreen && (
                  <button className="exit-fullscreen-btn-large" onClick={exitFullScreen}>
                    ✕ Exit Full Screen
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Popup */}
      {showSettings && (
        <div className="settings-overlay">
          <div className="settings-popup">
            <div className="settings-header">
              <h3>Settings</h3>
              <button className="close-btn" onClick={() => setShowSettings(false)}>×</button>
            </div>
            <div className="settings-content">
              <div className="settings-item">
                <span>Notifications</span>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="settings-item">
                <span>Dark Mode</span>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="settings-item">
                <span>Privacy</span>
                <span>›</span>
              </div>
              <div className="settings-item">
                <span>Storage</span>
                <span>›</span>
              </div>
              <div className="settings-item">
                <span>Help</span>
                <span>›</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VibesPage;

// import React, { useEffect, useRef } from 'react';
// import { useChatStore } from '../store/useChatStore';
// import ChatHeader from './ChatHeader';
// import MessageInput from './MessageInput';
// import MessageSkeleton from './skeletons/MessageSkeleton';
// import { useAuthStore } from '../store/useAuthStore';
// import { formatMessageTime } from '../lib/utils';

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();

//   const { authUser } = useAuthStore();
//   const messageEndRef = useRef(null);

//   console.log("Authenticated user:", authUser);

//   // Only fetch messages and subscribe if selectedUser exists
//   useEffect(() => {
//     if (!selectedUser?._id) return;


//     getMessages(selectedUser._id);
//     subscribeToMessages();

//     return () => unsubscribeFromMessages();


//   }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

//   // Scroll to bottom whenever messages change
//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Show loading skeleton if messages are loading
//   if (!selectedUser) {
//     return (<div className="flex-1 flex items-center justify-center text-gray-500">
//       Select a user to start chatting </div>
//     );
//   }

//   if (isMessagesLoading) {
//     return (<div className="flex-1 flex flex-col overflow-auto"> <ChatHeader /> <MessageSkeleton /> <MessageInput /> </div>
//     );
//   }

//   return (<div className="flex-1 flex flex-col overflow-auto"> <ChatHeader />


//     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//       {messages.map((message) => (
//         <div
//           key={message._id}
//           className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"} `}
//           ref={messageEndRef}
//         >
//           <div className="chat-image avatar">
//             <div className="size-10 rounded-full border">
//               <img
//                 src={
//                   message.senderId === authUser?._id
//                     ? authUser?.picture || "/avatar.png"
//                     : selectedUser?.picture || "/avatar.png"
//                 }
//                 alt="profile pic"
//               />
//             </div>
//           </div>

//           <div className="chat-bubble flex flex-col">
//             {message.image && (
//               <img
//                 src={message.image}
//                 alt="Attachment"
//                 className="sm:max-w-[200px] rounded-md mb-2"
//               />
//             )}

//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>

//               {message.text && <p>{message.text}</p>}
//             </div>

//           </div>
//         </div>
//       ))}
//     </div>

//     <MessageInput />
//   </div>


//   );
// };

// export default ChatContainer;















// src/components/ChatContainer.jsx
import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // When selectedUser changes, fetch messages and (re)subscribe
  useEffect(() => {
    if (!selectedUser || !selectedUser._id) return;

    // fetch messages for selected user
    getMessages(selectedUser._id);

    // subscribe and capture returned unsubscribe (if provided)
    const unsub = subscribeToMessages() || (() => {});

    // cleanup
    return () => {
      try {
        unsub();
      } catch {
        try { unsubscribeFromMessages(); } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser ? selectedUser._id : null]);

  useEffect(() => {
    // scroll to bottom whenever messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    // No conversation selected — keep UI consistent with your layout
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold">No chat selected</h3>
            <p className="text-sm text-muted">Select a user to start messaging</p>
          </div>
        </div>
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto ">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser?.picture || "/avatar.png"
                      : selectedUser?.picture || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

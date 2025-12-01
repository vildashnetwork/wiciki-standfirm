


// import { create } from "zustand";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../lib/axios";
// import { useAuthStore } from "./useAuthStore";

// export const useChatStore = create((set, get) => ({
//   messages: [],
//   users: [],
//   selectedUser: null,
//   isUsersLoading: false,
//   isMessagesLoading: false,

//   getUsers: async () => {
//     set({ isUsersLoading: true });
//     try {
//       const res = await axiosInstance.get("/messages/users");
//       set({ users: res.data });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to fetch users");
//     }
//     set({ isUsersLoading: false });
//   },

//   getMessages: async (userId) => {
//     set({ isMessagesLoading: true });
//     try {
//       const res = await axiosInstance.get(`/messages/${userId}`);
//       set({ messages: res.data });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to fetch messages");
//     } finally {
//       set({ isMessagesLoading: false });
//     }
//   },

//   sendMessage: async (messageData) => {
//     const { selectedUser, messages } = get();
//     if (!selectedUser) return;
//     try {
//       const res = await axiosInstance.post(
//         `/messages/send/${selectedUser._id}`,
//         messageData
//       );
//       set({ messages: [...messages, res.data] });
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to send message");
//     }
//   },

//   subscribeToMessages: () => {
//     const { selectedUser } = get();
//     if (!selectedUser) return;


//     const socket = useAuthStore.getState().socket;
//     if (!socket) return; // <-- prevent null error

//     socket.on("newMessage", (newMessage) => {
//       const isMessageSentFromSelectedUser =
//         newMessage.senderId === selectedUser._id;
//       if (!isMessageSentFromSelectedUser) return;

//       set({ messages: [...get().messages, newMessage] });
//     });


//   },

//   unsubscribeFromMessages: () => {
//     const socket = useAuthStore.getState().socket;
//     if (!socket) return; // <-- prevent null error
//     socket.off("newMessage");
//   },

//   setSelectedUser: (selectedUser) => set({ selectedUser }),
// }));










// src/store/useChatStore.js
import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    if (!userId) return;
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data || [] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return toast.error("No recipient selected");
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
      // emit via socket if present
      const socket = useAuthStore.getState().socket;
      if (socket && socket.connected) socket.emit("sendMessage", res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    const selectedUser = get().selectedUser;
    if (!socket) {
      console.warn("subscribeToMessages: socket not available");
      return () => {};
    }
    if (!selectedUser) {
      console.warn("subscribeToMessages: selectedUser not set");
      return () => {};
    }

    const handler = (newMessage) => {
      // only append messages that belong to the current conversation
      const sel = get().selectedUser;
      if (!sel) return;
      const shouldAppend =
        newMessage.senderId === sel._id || newMessage.receiverId === sel._id;
      if (shouldAppend) {
        set({ messages: [...get().messages, newMessage] });
      }
    };

    socket.on("newMessage", handler);

    // return an unsubscribe function (useful if you want to unsubscribe manually)
    return () => {
      try { socket.off("newMessage", handler); } catch {}
    };
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    try { socket.off("newMessage"); } catch (e) { console.warn(e); }
  },
}));

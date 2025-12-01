


// // src/store/useAuthStore.js
// import { create } from "zustand";
// import axiosInstance from "../lib/axios";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";

// export const useAuthStore = create((set, get) => ({
//   authUser: null,
//   isSigningUp: false,
//   isLoggingIn: false,
//   isUpdatingProfile: false,
//   onlineUsers: [],
//   socket: null,
//   isCheckingAuth: true,

//   // --- helpers ---
//   _saveToken: (token) => {
//     try {
//       if (token) localStorage.setItem("token", token);
//     } catch (e) {
//       console.warn("Failed to save token:", e);
//     }
//   },

//   _clearToken: () => {
//     try {
//       localStorage.removeItem("token");
//     } catch (e) {
//       console.warn("Failed to remove token:", e);
//     }
//   },

//   checkAuth: async () => {
//     try {
//       const res = await axiosInstance.get("/auth/check");
//       // Expect server to return user object (and maybe token)
//       set({ authUser: res.data });
//       // If the endpoint returns token, save it (optional)
//       if (res.data?.token) get()._saveToken(res.data.token);
//       // Connect socket now that we have a user
//       get().connectSocket();
//     } catch (error) {
//       console.log("Error in checkAuth", error);
//       set({ authUser: null });
//       get()._clearToken();
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   signup: async (data) => {
//     set({ isSigningUp: true });
//     try {
//       const res = await axiosInstance.post("/auth/signup", data);
//       // Server should return { user: {...}, token: '...' } or just user with token
//       const payload = res.data;
//       // If server returns token separately, try to capture it
//       if (payload?.token) get()._saveToken(payload.token);
//       // If server returns user object directly:
//       const user = payload.user || payload;
//       set({ authUser: user });
//       toast.success("Account created successfully");
//       get().connectSocket();
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Signup failed");
//     } finally {
//       set({ isSigningUp: false });
//     }
//   },

//   login: async (data) => {
//     set({ isLoggingIn: true });
//     try {
//       const res = await axiosInstance.post("/auth/login", data);
//       const payload = res.data;
//       if (payload?.token) get()._saveToken(payload.token);
//       const user = payload.user || payload;
//       set({ authUser: user });
//       toast.success("Logged in successfully");
//       get().connectSocket();
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Login failed");
//     } finally {
//       set({ isLoggingIn: false });
//     }
//   },

//   logout: async () => {
//     try {
//       await axiosInstance.post("/auth/logout");
//     } catch (err) {
//       // ignore server logout error but continue client cleanup
//       console.warn("Logout request failed:", err);
//     } finally {
//       get().disconnectSocket();
//       get()._clearToken();
//       set({ authUser: null, onlineUsers: [] });
//       toast.success("Logged out");
//     }
//   },

//   updateProfile: async (data) => {
//     set({ isUpdatingProfile: true });
//     try {
//       const res = await axiosInstance.put("/auth/update-profile", data);
//       if (res.data) {
//         set({ authUser: res.data });
//         toast.success("Profile updated successfully");
//       } else {
//         toast.error("Failed to update profile");
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "An unexpected error occurred");
//     } finally {
//       set({ isUpdatingProfile: false });
//     }
//   },

//   connectSocket: () => {
//     // avoid connecting twice
//     if (get().socket?.connected) return;
//     // ensure we have a token
//     const token = (() => {
//       try { return localStorage.getItem("token"); } catch { return null; }
//     })();
//     if (!token) {
//       console.warn("connectSocket: no token found in localStorage");
//       return;
//     }

//     // create socket with token in auth to match server expectations
//     const socket = io(BASE_URL, {
//       auth: { token },
//       withCredentials: true,
//       transports: ["websocket", "polling"],
//     });

//     set({ socket });

//     // safe listeners that update store
//     socket.on("connect", () => {
//       console.log("Socket connected:", socket.id);
//     });

//     socket.on("onlineUsers", (list) => {
//       set({ onlineUsers: Array.isArray(list) ? list : [] });
//     });

//     socket.on("newMessage", (message) => {
//       // You can add logic here to route message into chat store if needed
//       // e.g. useChatStore.getState().handleIncomingMessage(message)
//       console.log("Socket newMessage received:", message);
//     });

//     socket.on("disconnect", (reason) => {
//       console.log("Socket disconnected:", reason);
//       // keep socket ref but it's disconnected
//     });

//     socket.on("connect_error", (err) => console.error("Socket connect_error:", err));
//   },

//   disconnectSocket: () => {
//     const s = get().socket;
//     if (s) {
//       try {
//         s.off();
//         s.disconnect();
//       } catch (e) {
//         console.warn("Error while disconnecting socket:", e);
//       }
//     }
//     set({ socket: null, onlineUsers: [] });
//   },
// }));













import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  onlineUsers: [],
  socket: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    const s = get().socket;
    if (s) {
      s.off();
      s.disconnect();
    }
    set({ authUser: null, socket: null, onlineUsers: [] });
    toast.success("Logged out");
    await axiosInstance.post("/auth/logout");
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser) return;

    if (socket) {
      socket.off();
      socket.disconnect();
    }

    const newSocket = io(BASE_URL, {
      autoConnect: false,
      auth: { userId: String(authUser._id) },
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () =>
      console.log("Socket connected:", newSocket.id)
    );

    newSocket.on("disconnect", (reason) =>
      console.log("Socket disconnected:", reason)
    );

    newSocket.on("connect_error", (err) =>
      console.error("Socket connect_error:", err)
    );

    // **This is the key part**: update Zustand store when server sends online users
    newSocket.on("onlineUsers", (userIds) => {
      const normalized = Array.isArray(userIds) ? userIds.map(String) : [];
      set({ onlineUsers: normalized });
      console.log("onlineUsers updated:", normalized);
    });

    newSocket.connect();
    set({ socket: newSocket });
  },
}));

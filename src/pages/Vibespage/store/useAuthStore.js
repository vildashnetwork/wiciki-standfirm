

// import { create } from "zustand";
// import axiosInstance from "../lib/axios";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// const BASE_URL =
//   import.meta.env.MODE === "development" ? "http://localhost:4000/" : "/";

// export const useAuthStore = create((set, get) => ({
//   authUser: null,
//   isSigningUp: false,
//   isLoggingIn: false,
//   onlineUsers: [],
//   socket: null,
//   isCheckingAuth: true,

//   checkAuth: async () => {
//     try {
//       const res = await axiosInstance.get("/auth/check");
//       set({ authUser: res.data });
//       get().connectSocket();
//     } catch (err) {
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   login: async (data) => {
//     set({ isLoggingIn: true });
//     try {
//       const res = await axiosInstance.post("/auth/login", data);
//       set({ authUser: res.data });
//       toast.success("Logged in successfully");
//       get().connectSocket();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Login failed");
//     } finally {
//       set({ isLoggingIn: false });
//     }
//   },

//   logout: async () => {
//     const s = get().socket;
//     if (s) {
//       s.off();
//       s.disconnect();
//     }
//     set({ authUser: null, socket: null, onlineUsers: [] });
//     toast.success("Logged out");
//     await axiosInstance.post("/auth/logout");
//   },

//   connectSocket: () => {
//     const { authUser, socket } = get();
//     if (!authUser) return;

//     if (socket) {
//       socket.off();
//       socket.disconnect();
//     }

//     const newSocket = io(BASE_URL, {
//       autoConnect: false,
//       auth: { userId: String(authUser._id) },
//       transports: ["websocket", "polling"],
//     });

//     newSocket.on("connect", () =>
//       console.log("Socket connected:", newSocket.id)
//     );

//     newSocket.on("disconnect", (reason) =>
//       console.log("Socket disconnected:", reason)
//     );

//     newSocket.on("connect_error", (err) =>
//       console.error("Socket connect_error:", err)
//     );

//     // **This is the key part**: update Zustand store when server sends online users
//     newSocket.on("onlineUsers", (userIds) => {
//       const normalized = Array.isArray(userIds) ? userIds.map(String) : [];
//       set({ onlineUsers: normalized });
//       console.log("onlineUsers updated:", normalized);
//     });

//     newSocket.connect();
//     set({ socket: newSocket });
//   },
// }));












// src/store/useAuthStore.js
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "https://wicikichatbackend.onrender.com" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axiosInstance.get("/auth/check", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error);
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
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },



  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      localStorage.setItem("token", res.data.token);
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // login: async (data) => {
  //   set({ isLoggingIn: true });
  //   try {
  //     const res = await axiosInstance.post("/auth/login", data);
  //     set({ authUser: res.data });
  //     localStorage.setItem("token", res.data.token);
  //     toast.success("Logged in successfully");
  //     get().connectSocket();
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Login failed");
  //   } finally {
  //     set({ isLoggingIn: false });
  //   }
  // },

  // logout: async () => {
  //   try {
  //     await axiosInstance.post("/auth/logout");
  //     set({ authUser: null });
  //     localStorage.removeItem("token");
  //     toast.success("Logged out successfully");
  //     get().disconnectSocket();
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Logout failed");
  //   }
  // },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      if (res.data) {
        set({ authUser: res.data });
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

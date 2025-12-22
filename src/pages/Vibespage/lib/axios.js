// import axios from "axios";
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.MODE === "development" ? "https://wicikichatbackend-5j7y.onrender.com/api" : "/api",

// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default axiosInstance;













import axios from "axios";

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "https://wicikichatbackend-5j7y.onrender.com/api"
    : "https://wicikichatbackend-5j7y.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

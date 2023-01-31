import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sitelabs-backend.vercel.app/api/",
});

axiosInstance.interceptors.request.use((req) => {
  if (localStorage.getItem("admin")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("admin")).token
    }`;
  }
  return req;
});

export default axiosInstance;

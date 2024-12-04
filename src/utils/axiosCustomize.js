import axios from "axios";
import { postRefreshToken } from "../services/apiService";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:8088/",
});

const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refreshToken");
  if (!refresh_token) throw new Error("No refresh token available");

  try {
    const response = await postRefreshToken(refresh_token); // Gọi hàm từ apiService

    console.log("check response", response);

    const { token, refresh_token: newRefreshToken } = response;

    localStorage.setItem("authToken", token);
    localStorage.setItem("refreshToken", newRefreshToken);

    return token;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

// Add a request interceptor

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    console.log("token", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Luôn trả về response.data nếu có
    console.log("Check response axios Customize", response);
    return response && response.data ? response.data : response;
  },
  async (error) => {
    console.log("error", error);

    const originalRequest = error.config;
    console.log("check originalRequest", originalRequest);
    console.log(">>>>> error", error);

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log(">>>>> Trueeee");
        const newToken = await refreshToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest); // Thử lại yêu cầu
      } catch (refreshError) {
        console.log(">>>>> Falseee", refreshError);
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Chuyển về trang login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

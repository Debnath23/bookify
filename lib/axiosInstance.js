import axios from "axios";
import { useRouter } from "next/navigation";

const getAccessToken = () => localStorage.getItem("accessToken") || "";
const router = useRouter();

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - Redirecting to login...");
      router.push("/sign-in");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

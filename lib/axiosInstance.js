import axios from "axios";

const getAccessToken = () => {
  return localStorage.getItem("accessToken") || "";
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA1MGNjMzBjZmZlMGE0Y2I1Mjc0ZGUiLCJlbWFpbCI6ImRlYm5hdGg0QGFpLmNvbSIsIm5hbWUiOiJEZWJuYXRoNCIsImlhdCI6MTczNzkwMDQ4NywiZXhwIjoxNzM3OTg2ODg3fQ.bL70vQerZhkUBawbGeSOpGpybVNGniCSpQP2Ce8bU2Q";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

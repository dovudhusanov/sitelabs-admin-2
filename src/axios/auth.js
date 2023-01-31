import axiosInstance from ".";

export const LoginApi = (userInfo) =>
  axiosInstance.post("/admin/login", userInfo);

import axiosInstance from ".";

export const getAllAdmin = () => axiosInstance.get("/admin/statistic/admin");

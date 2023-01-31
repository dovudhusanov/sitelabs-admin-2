import axiosInstance from ".";

export const getAllService = () => axiosInstance.get("/service");

import axiosInstance from ".";

export const allSubscriberApi = () => axiosInstance.get("/subscribe");

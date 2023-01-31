import axiosInstance from ".";

export const getAllBlogApi = () => axiosInstance.get("/blog/statistic");

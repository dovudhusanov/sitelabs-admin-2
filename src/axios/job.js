import axiosInstance from ".";
export const getAllJobApi = () => axiosInstance.get("/job/stats/job");
export const getAllJob = () => axiosInstance.get("/job");
export const createJob = (data) => axiosInstance.post("/job", data);
export const deleteJob = (id) => axiosInstance.delete(`/job/${id}`);
export const updateJob = (id, data) => axiosInstance.patch(`/job/${id}`, data);
export const getJobById = (id) => axiosInstance.get(`job/${id}`);

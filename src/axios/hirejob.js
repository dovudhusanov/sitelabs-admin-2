import axiosInstance from ".";

export const getAllHireJobStats = () => axiosInstance.get("hirejob/stats");

export const getAllHireJob = () => axiosInstance.get("/hirejob");
export const deleteHireJob = (id, jobId) =>
  axiosInstance.delete(`/hirejob/${id}/${jobId}`);

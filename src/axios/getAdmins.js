import axiosInstance from ".";

export const getAllAdmins = () => axiosInstance.get("/admin");
export const createAdmin = (data) => axiosInstance.post("/admin", data);
export const deleteAdmin = (id) => axiosInstance.delete(`/admin/${id}`);
export const updateAdmin = (id, data) => axiosInstance.patch(`/admin/${id}`, data);
export const getAdminById = (id) => axiosInstance.get(`admin/${id}`);
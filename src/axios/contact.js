import axiosInstance from ".";

export const getAllContactMessage = () => axiosInstance.get("/contact");

export const deleteContactMessage = (id) =>
  axiosInstance.delete(`/contact/${id}`);

export const updateToRead = (id) => axiosInstance.patch(`/contact/${id}`);

export const sendAnswerToUser = (message) =>
  axiosInstance.post("/contact/answer", message);

import client from "./axiosClient";

export const publicApi = {
  getItem: (token) => client.get(`/api/public/items/${token}`),
  submitFoundReport: (token, data) =>
    client.post(`/api/public/items/${token}/found`, data)
};

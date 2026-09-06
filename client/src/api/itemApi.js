import axiosClient from "./axiosClient";

const BASE = "/api/items";

const itemApi = {
  create: (data) => axiosClient.post(BASE, data),

  updateItem: (itemId, data) =>
    axiosClient.put(`${BASE}/${itemId}`, data),

  list: async () => {
    const res = await axiosClient.get(BASE);
    return res.data;
  },

  deleteItem: async (itemId) => {
    await axiosClient.delete(`${BASE}/${itemId}`);
  },

  getItemById: async (itemId) => {
    console.log(`itemId in ${itemId}`);
    const res = await axiosClient.get(`${BASE}/owner/${itemId}`);
    return res.data;
  },
};

export default itemApi;
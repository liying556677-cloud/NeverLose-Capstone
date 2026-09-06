import axios from "./axiosClient";

const BASE = "/api/reports";

export const reportsApi = {
  list: (itemId) => axios.get(`${BASE}/item/${itemId}`),
  updateStatus: (reportId, data) =>
    axios.patch(`${BASE}/${reportId}`, data),
};
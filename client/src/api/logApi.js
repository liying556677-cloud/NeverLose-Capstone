import client from "./axiosClient";

export const logApi = {
  getLogsItem: (itemId) => client.get(`/api/logs/item/${itemId}`),  
};

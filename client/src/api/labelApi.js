import client from "./axiosClient";

export const labelApi = {
  downloadPdf: (itemId, params) =>
    client.get(`api/labels/${itemId}/pdf`, {
      params,
      responseType: "blob"
    })
};

// src/api/uploadApi.js
// Handles uploading a single photo file and returning the public URL.

import axiosClient from "./axiosClient";

const uploadApi = {
  uploadPhoto: async (file) => {
    

    const formData = new FormData();
    formData.append("photo", file);

    // axiosClient automatically includes auth headers
    const res = await axiosClient.post("/api/upload/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data; // backend returns { photoUrl }
  },
};

export default uploadApi;
import axiosClient from "./axiosClient";

const userApi = {
  signup: (data) => axiosClient.post("/api/users/signup", data),
  login: (data) => axiosClient.post("/api/users/login", data),
  me: () => axiosClient.get("/api/users/me"),
  updateProfile: (data) => axiosClient.put("/api/users/me", data),
};

export default userApi;
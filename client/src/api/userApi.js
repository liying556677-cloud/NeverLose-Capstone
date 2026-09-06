import axiosClient from "./axiosClient";

const userApi = {
  signup: (data) => axiosClient.post("/api/users/signup", data),
  login: (data) => axiosClient.post("/api/users/login", data),
  me: () => axiosClient.get("/api/users/me"),
};

export default userApi;
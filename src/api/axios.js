import axios from "axios";
const BASE_URL = "http://localhost:3500";
const api = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getHireNewsPostsPage = async ( pageParam = 2 ) => {
  const response = await api.get(`/hirenews?page=${pageParam}`);
  return response.data;
};

export default api;

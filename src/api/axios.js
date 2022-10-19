import axios from "axios";
export const BASE_URL = "https://jingyeschool.org.cn:3500";
// export const BASE_URL = "http://localhost:3500/api1";
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

export const getHireNewsPostsPage = async (pageParam = 1, limitParam = 5) => {
  const response = await api.get(
    `/hirenews?page=${pageParam}&limit=${limitParam}`
  );
  return response.data;
};

export default api;

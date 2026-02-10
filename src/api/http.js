import axios from "axios";
import { getToken } from "../utils/storage";

const http = axios.create({
  baseURL: "https://panel.gokhankozak.com/api",
});

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;

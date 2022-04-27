import axios from "axios";
import { getToken, logout } from "./Auth";
const baseURL = "http://127.0.0.1:8000/";
const baseURLProd = "https://api-xpto.yellowsistemas.com.br/";
const api = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? baseURLProd : baseURL,
  //baseURL: (baseURLProd)
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  function (error) {
    // Do something with response error

    return Promise.reject(error.response);
  }
);

export default api;

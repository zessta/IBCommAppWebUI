import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../utils/constants";
import { getItem, removeItem } from "../utils/utils";

const client = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach token to every request
client.interceptors.request.use(
  (config) => {
    const token = getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (error: any) => {
    if (error?.response?.status === 401) {
      removeItem("token");
      window.location.href = "/login";
      return error?.response?.data?.message;
    }
    return error?.response;
  }
);

export { client };

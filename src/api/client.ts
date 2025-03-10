import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../utils/constants";

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
    const token = localStorage.getItem("accessToken");
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
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.message === 'User not Authorized'
    ) {
      return error?.response?.data?.message;
    }
    return error?.response;
  },
);

export { client };

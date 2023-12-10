import axios from "axios";

const api='http://localhost:4500/api';

export const baseURL = api;

let axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
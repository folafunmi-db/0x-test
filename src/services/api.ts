import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.0x.org",
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;

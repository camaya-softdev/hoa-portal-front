import axios from "axios";
import store from "./store";

const axiosClient = axios.create({
  baseURL: "https://apidevhoaportal.camayacoast.com/",
  // baseURL: "https://apihoaportal.camayacoast.com/",
  // baseURL: "http://127.0.0.1:80",
  // baseURL:"http://localhost:80",
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  if (!/^\/api/.test(config.url)) {
    return config;
  }
  const userToken = store.state.auth.user.token;
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.statusText === "Unauthorized") {
      sessionStorage.removeItem("TOKEN");
      alert("You have started a new session so this session will automatically end.");
      window.location.reload();
      // setTimeout(() => window.location.reload(), 2000);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
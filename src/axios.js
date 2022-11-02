import axios from "axios";
import store from "./store";

const axiosClient = axios.create({
  // baseURL:'http://10.90.2.55:8086',
  // baseURL:'http://68.183.179.81:8086',
  baseURL: "https://apidevhoaportal.camayacoast.com/",
  // baseURL: "https://apihoaportal.camayacoast.com",
  // baseURL: "http://hoa-portal.test/",
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
      alert("Invalid user token. Window will reload");
      window.location.reload();
      // setTimeout(() => window.location.reload(), 2000);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

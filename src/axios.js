import axios from "axios";
import store from "./store"

const axiosClient = axios.create({
  // baseURL:'  http://10.90.2.55:8086/api'
  baseURL:'http://localhost:8000/api'
})

axiosClient.interceptors.request.use(config =>{
  config.headers.Authorization = `Bearer ${store.state.auth.user.token}`
  return config
})

export default axiosClient;

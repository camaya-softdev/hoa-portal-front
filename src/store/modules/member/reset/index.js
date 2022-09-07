import axiosClient from "../../../../axios";
import {ElNotification} from "element-plus";

export default {
  namespaced: true,
  actions: {
    forgetPassword({}, forgetPassword) {
      return axiosClient
        .post("/api/admin/forget-password/", forgetPassword)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err;
        });
    },
    resetPassword({}, resetPassword) {
      return axiosClient
        .post("/api/reset-password/", resetPassword)
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err;
        });
    },
  }

};

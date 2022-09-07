import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  actions: {
    addPaymentAddress({}, data) {
      return axiosClient
        .post(`/api/member/bill/payment/cash/${data.id}/`,data.payment)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
  },

};

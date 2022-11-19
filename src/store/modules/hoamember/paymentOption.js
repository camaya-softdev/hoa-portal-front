import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  actions: {
    cashPayment({}, data) {
      return axiosClient
        .post(`/api/member/bill/payment/cash/${data.id}/`,data.payment)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    onlinePayment({},id){
      return axiosClient
      .get(`/api/member/bill/payment/online/paymaya/${id}/`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    }
  },


};

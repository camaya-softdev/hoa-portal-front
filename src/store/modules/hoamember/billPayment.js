import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state: {
    billPayments: {
      loading: false,
      data: [],
    },
  },
  actions: {
    getBillPayments({ commit }, id) {
      commit("setCurrentBillPaymentLoading", true);
      return axiosClient
        .get(`/api/member/bill/payment/${id}/`)
        .then((res) => {
          commit("setCurrentBillPayment", res.data);
          commit("setCurrentBillPaymentLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentBillPaymentLoading", false);
          throw err;
        });
    },
  },
  mutations: {
    setCurrentBillPayment: (state, memberData) => {
      state.billPayments.data = memberData.data;
    },

    setCurrentBillPaymentLoading: (state, loading) => {
      state.billPayments.loading = loading;
    },

  },
};

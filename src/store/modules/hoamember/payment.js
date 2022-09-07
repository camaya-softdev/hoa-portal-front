import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state: {
    payments: {
      loading: false,
      data: [],
    },
  },
  actions: {
    getPayments({ commit }, id) {
      commit("setCurrentPaymentLoading", true);
      return axiosClient
        .get(`/api/member/payment/`)
        .then((res) => {
          commit("setCurrentPayment", res.data);
          commit("setCurrentPaymentLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentPaymentLoading", false);
          throw err;
        });
    },
  },
  mutations: {
    setCurrentPayment: (state, memberData) => {
      state.payments.data = memberData.data[0].history;
    },

    setCurrentPaymentLoading: (state, loading) => {
      state.payments.loading = loading;
    },

  },
};

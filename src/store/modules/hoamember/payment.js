import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state: {
    payments: {
      loading: false,
      data: [],
    },
    memberID: {
      data: 0,
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
      state.memberID.data = memberData.data[0].member_id;
    },

    setCurrentPaymentLoading: (state, loading) => {
      state.payments.loading = loading;
    },
  },
};

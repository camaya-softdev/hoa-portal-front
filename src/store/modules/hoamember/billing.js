import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";
import axios from "axios";

export default {
  namespaced: true,
  state: {
    billings: {
      loading: false,
      data: [],
    },
  },
  actions: {
    getBillings({ commit }, id) {
      commit("setCurrentBillingLoading", true);
      return axiosClient
        .get(`/api/member/billing/${id}/`)
        .then((res) => {
          commit("setCurrentBilling", res.data);
          commit("setCurrentBillingLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentBillingLoading", false);
          throw err;
        });
    },
    downloadPDF({}, data) {
      return axiosClient
        .get(`/invoice/${data.userId}/${data.billingId}/`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          throw err;
        });
    },
  },
  mutations: {
    setCurrentBilling: (state, memberData) => {
      state.billings.data = memberData.data;
    },

    setCurrentBillingLoading: (state, loading) => {
      state.billings.loading = loading;
    },
  },
};

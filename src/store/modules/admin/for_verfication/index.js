import axiosClient from "../../../../axios";

export default {
  namespaced: true,
  state: {
    forVerification: {
      loading: false,
      links: [],
      data: [],
    },
    currentforVerification: {
      loading: false,
      data: {},
    },
  },

  actions: {
    getForVerifications({ commit }, { url = 1 } = {}) {
      commit("setForVerificationsLoading", true);
      url = `/api/admin/forVerification/?page=${Number(url)}`;
      return axiosClient.get(url).then((res) => {
        commit("setForVerificationsLoading", false);
        commit("setForVerifications", res.data);
        return res;
      });
    },

    // getSearchPaymentTransactions({ commit }, link) {
    //   let url = "";
    //   url = `/api/admin/transaction/search/data/${link.id}/?find=${link.data}&page=${link.label}`;
    //   return axiosClient.get(url).then((res) => {
    //     commit("setCurrentPaymentTransactions", res.data);
    //     return res;
    //   });
    // },

    getForVerification({ commit }, id) {
      commit("setCurrentForVerificationLoading", true);
      return axiosClient
        .get(`/api/admin/forVerification/${id}/`)
        .then((res) => {
          commit("setCurrentForVerification", res.data);
          commit("setCurrentForVerificationLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentPaymentTransactionLoading", false);
          throw err;
        });
    },
  },
  mutations: {
    setCurrentForVerification: (state, forVerificationData) => {
      state.currentforVerification.data = forVerificationData;
    },

    setCurrentForVerificationLoading: (state, loading) => {
      state.currentforVerification.loading = loading;
    },

    setForVerifications: (state, forVerificationData) => {
      state.forVerification.links = forVerificationData.meta.links;
      state.forVerification.data = forVerificationData.data;
    },

    setForVerificationsLoading: (state, loading) => {
      state.forVerification.loading = loading;
    },
  },
};

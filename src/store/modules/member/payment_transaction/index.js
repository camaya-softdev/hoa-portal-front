import axiosClient from "../../../../axios";

export default {
  namespaced: true,
  state: {
    paymentTransaction: {
      loading: false,
      links: [],
      data: [],
    },
    currentPaymentTransaction: {
      loading: false,
      data: {},
    },
  },

  actions: {
    addPaymentTransaction({}, payment_transaction) {
      return axiosClient
        .post("/api/admin/transaction/", payment_transaction)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getPaymentTransactions({ commit }, link) {
      commit("setCurrentPaymentTransactionsLoading", true);
      let url = `/api/admin/transaction/${link.id}/rfid/?page=${link.url}`;
      return axiosClient.get(url).then((res) => {
        commit("setCurrentPaymentTransactionsLoading", false);
        commit("setCurrentPaymentTransactions", res.data);
        return res;
      });
    },

    getSearchPaymentTransactions({ commit }, link) {
      let url = "";
      url = `/api/admin/transaction/search/data/${link.id}/?find=${link.data}&page=${link.label}`;
      return axiosClient.get(url).then((res) => {
        commit("setCurrentPaymentTransactions", res.data);
        return res;
      });
    },

    getRFID({ commit }, id) {
      commit("setCurrentRFIDLoading", true);
      return axiosClient
        .get(`/api/admin/privilege/transaction/${id}/`)
        .then((res) => {
          commit("setCurrentPaymentTransaction", res.data);
          commit("setCurrentPaymentTransactionLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentPaymentTransactionLoading", false);
          throw err;
        });
    },

    deletePaymentTransaction({}, id) {
      return axiosClient.delete(`/api/admin/privilege/transaction/${id}/`);
    },

    exportPaymentTransaction({}) {
      return axiosClient
        .get("/api/admin/transaction/export/data/", {
          responseType: "blob",
        })
        .then((response) => {
          let fileUrl = window.URL.createObjectURL(response.data);
          let fileLink = document.createElement("a");

          fileLink.href = fileUrl;
          fileLink.setAttribute("download", "member_privilege.xlsx");
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
  mutations: {
    setCurrentPaymentTransaction: (state, paymentTransactionData) => {
      state.currentPaymentTransaction.data = rfidData;
    },

    setCurrentPaymentTransactionLoading: (state, loading) => {
      state.currentPaymentTransaction.loading = loading;
    },

    setCurrentPaymentTransactions: (state, paymentTransactionData) => {
      state.paymentTransaction.links = paymentTransactionData.meta.links;
      state.paymentTransaction.data = paymentTransactionData.data;
    },

    setCurrentPaymentTransactionsLoading: (state, loading) => {
      state.paymentTransaction.loading = loading;
    },
  },
};

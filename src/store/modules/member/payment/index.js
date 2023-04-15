import axiosClient from "../../../../axios";

export default {
  namespaced: true,
  state: {
    paymentHistory: {
      loading: false,
      links: [],
      // billing: [],
      data: [],
    },
    currentPaymentHistory: {
      loading: false,
      data: {},
    },
  },

  actions: {
    editPaymentHistory({commit}, payment) {
      return axiosClient
        .put(`/api/admin/payment/transaction/${payment.id}/`, payment)
        .then((res) => {
          commit("setPaymentHistories",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getPaymentHistories({ commit }, data) {
      commit("setPaymentHistoryLoading", true);
      let url = `/api/admin/payment/transaction/${data.id}/history/?page=${data.url}`;
      return axiosClient.get(url).then((res) => {
        commit("setPaymentHistoryLoading", false);
        commit("setPaymentHistory", res.data);
        return res;
      });
    },

    getSearchPaymentHistories({ commit }, link) {
      let url = "";
      url = `/api/admin/payment/transaction/search/data/${link.id}?find=${link.data}&page=${link.label}`;
      return axiosClient.get(url).then((res) => {
        commit("setPaymentHistory", res.data);
        return res;
      });
    },


    getCurrentPaymentHistory({ commit }, data) {
      commit("setCurrentPaymentHistoryLoading", true);
      return axiosClient
        .get(
          `/api/admin/payment/transaction/${data.userid}/${data.id}/${data.defaultNum}/`,
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          let fileUrl = window.URL.createObjectURL(response.data);
          let fileLink = document.createElement("a");

          fileLink.href = fileUrl;
          fileLink.setAttribute("download", "invoice.xlsx");
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },

    generateSOA({ commit }, data) {
      commit("setCurrentPaymentHistoryLoading", true);
      return axiosClient
        .get(
          `/api/admin/payment/transaction/soa/${data.userid}/${data.id}/${data.defaultNum}/`,
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          let fileUrl = window.URL.createObjectURL(response.data);
          let fileLink = document.createElement("a");

          fileLink.href = fileUrl;
          fileLink.setAttribute("download", "SOA.pdf");
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    getAllLedger({ commit }, userId) {
      commit("setCurrentPaymentHistoryLoading", true);
      return axiosClient
        .get(`/api/admin/payment/transaction/allhistory/${userId}/`, {
          responseType: "blob",
        })
        .then((response) => {
          let fileUrl = window.URL.createObjectURL(response.data);
          let fileLink = document.createElement("a");

          fileLink.href = fileUrl;
          fileLink.setAttribute("download", "ledger.xlsx");
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    deletePaymentTransaction({}, id) {
      return axiosClient.delete(`/api/admin/transaction/${id}/`);
    },

    exportPayment({}) {
      return axiosClient
        .get("/api/admin/payment/transaction/export/data/", {
          responseType: "blob",
        })
        .then((response) => {
          let fileUrl = window.URL.createObjectURL(response.data);
          let fileLink = document.createElement("a");

          fileLink.href = fileUrl;
          fileLink.setAttribute("download", "payment.xlsx");
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
  mutations: {
    setEditPaymentHistory:(state,paymentHistoryData)=>{
      let paymentHistories = state.paymentHistory.data 
      const update_obj = paymentHistories.findIndex((obj=>obj.id == paymentHistoryData.data.id))
      paymentHistories[update_obj] = {...paymentHistoryData.data};
    },
    setCurrentPaymentHistory: (state, paymentHistoryData) => {
      state.currentPaymentHistory.data = paymentHistoryData;
    },

    setCurrentPaymentHistoryLoading: (state, loading) => {
      state.currentPaymentHistory.loading = loading;
    },

    setPaymentHistory: (state, paymentHistoryData) => {
      state.paymentHistory.links = paymentHistoryData.meta.links;
      state.paymentHistory.data = paymentHistoryData.data;
      // state.paymentHistory.billing = paymentHistoryData.billing;
    },

    setPaymentHistoryLoading: (state, loading) => {
      state.paymentHistory.loading = loading;
    },
  },
};

import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    paymentHistory: {
      loading: false,
      links: [],
      data: [],
    },
    currentPaymentHistory: {
      loading: false,
      data: {},
    },

  },

  actions: {
    editPaymentHistory({}, payment) {
      return axiosClient
        .put(`/api/admin/payment/transaction/${payment.id}/`,payment)
        .then((res) => {
          console.log(res.status)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getPaymentHistories({ commit }, data) {
      commit("setPaymentHistoryLoading", true);
      let url = `/api/admin/payment/transaction/${data.id}/history/?page=${data.url}`
      return axiosClient.get(url).then((res) => {
        commit("setPaymentHistoryLoading", false);
        commit("setPaymentHistory", res.data);
        return res;
      });
    },

    getSearchPaymentHistories({commit},link){
      let url = ''
      url = `/api/admin/payment/transaction/search/data/${link.id}?find=${link.data}&page=${link.label}`
      return axiosClient.get(url).then((res) => {
        commit("setPaymentHistory", res.data);
        return res;
      });
    },

    getCurrentPaymentHistory({ commit }, id) {
      commit("setCurrentPaymentHistoryLoading", true);
      return axiosClient
        .get(`/api/admin/payment/transaction/${id}/`)
        .then((res) => {
          commit("setCurrentPaymentHistory", res.data);
          commit("setCurrentPaymentHistoryLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentPaymentHistoryLoading", false);
          throw err;
        });
    },

    deletePaymentTransaction({}, id) {
      return axiosClient.delete(`/api/admin/transaction/${id}/`);
    },

    exportPayment({}){
      return axiosClient.get('/api/admin/payment/transaction/export/data/', {
        responseType: 'blob'
      }).then(response => {
        let fileUrl = window.URL.createObjectURL(response.data);
        let fileLink = document.createElement('a');

        fileLink.href = fileUrl;
        fileLink.setAttribute('download', 'payment.xlsx');
        document.body.appendChild(fileLink)

        fileLink.click();
      }).catch(error => {
        console.log(error.response.data)
      })
    }
  },
  mutations: {
    setCurrentPaymentHistory: (state, paymentHistoryData) => {
      state.currentPaymentHistory.data = paymentHistoryData;

    },

    setCurrentPaymentHistoryLoading: (state, loading) => {
      state.currentPaymentHistory.loading = loading;
    },

    setPaymentHistory: (state, paymentHistoryDataData) => {
      state.paymentHistory.links = paymentHistoryDataData.meta.links;
      state.paymentHistory.data = paymentHistoryDataData.data;
    },

    setPaymentHistoryLoading: (state, loading) => {
      state.paymentHistory.loading = loading;
    },

  },
};

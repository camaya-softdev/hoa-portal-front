import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    fee: {
      loading: false,
      links: [],
      data: [],
    },
    currentFee: {
      loading: false,
      data: {},
    },

  },

  actions: {
    addFee({}, fee) {
      return axiosClient
        .post("/api/admin/fee/",fee)
        .then((res) => {
          commit("setAddFee",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editFee({}, fee) {
      return axiosClient
        .put(`/api/admin/fee/${fee.id}/`, fee)
        .then((res) => {
          commit("setEditFee",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getFees({ commit }, data) {
      commit("setFeesLoading", true);
      let url='';
      url = `/api/admin/fee/${data}/lot/?page=${1}`
      return axiosClient.get(url).then((res) => {
        commit("setFeesLoading", false);
        commit("setFees", res.data);
        return res;
      });
    },

    getSearchFees({commit},link){
      let url = ''
      url = `/api/admin/fee/search/data/?find=${link.data}&page=${link.label}`
      return axiosClient.get(url).then((res) => {
        commit("setFees", res.data);
        return res;
      });
    },


    getFee({ commit }, id) {
      commit("setCurrentFeeLoading", true);
      return axiosClient
        .get(`/api/admin/fee/${id}/`)
        .then((res) => {
          commit("setCurrentFee", res.data);
          commit("setCurrentFeeLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentFeeLoading", false);
          throw err;
        });
    },

    deleteFee({}, id) {
      return axiosClient.delete(`/api/admin/fee/${id}/`);
    },
  },
  mutations: {
    setAddFee:(state,feeData)=>{
      state.fee.data.push(feeData.data);
    },
    setEditFee:(state,feeData)=>{
      let fees = state.fee.data;
      const update_obj = fess.findIndex((obj=>obj.id == feeData.data.id))
      fess[update_obj] = {...feeData.data}
    },
    setCurrentFee: (state, feeData) => {
      state.currentFee.data = feeData;
    },

    setCurrentFeeLoading: (state, loading) => {
      state.currentFee.loading = loading;
    },

    setFees: (state, feeData) => {
      state.fee.links = feeData.meta.links;
      state.fee.data = feeData.data;
    },

    setFeesLoading: (state, loading) => {
      state.fee.loading = loading;
    },

  },
};

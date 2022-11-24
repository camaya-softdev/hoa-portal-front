import axiosClient from "../../../axios";


export default {
  namespaced: true,
  state: {
    lots: {
      loading: false,
      data: [],
    },
  
  },
  actions: {
    editLots({},id){
        return axiosClient
            .put(`/api/member/change-lot/${id}/default`)
            .then((res)=>{
                return res;
            })
            .catch((err)=>{
                return err;
            })
    },
    getLots({ commit }) {
      commit("setLotsLoading", true);
      return axiosClient
        .get(`/api/member/pick-lot/`)
        .then((res) => {
          commit("setLots", res.data);
          commit("setLotsLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setLotsLoading", false);
          throw err;
        });
    },
  },
  mutations: {
    setLots: (state, lotData) => {
      state.lots.data = lotData.data;
    },

    setLotsLoading: (state, loading) => {
      state.lots.loading = loading;
    },
  },
};

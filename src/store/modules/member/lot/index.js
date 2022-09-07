import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    lot: {
      loading: false,
      links: [],
      data: [],
    },
    currentLot: {
      loading: false,
      data: {},
    },
    lotSubdivision:{
      loading:false,
      data:[]
    },
    lotAgent:{
      loading:false,
      data:[]
    }
  },

  actions: {
    addLot({}, lot) {
      return axiosClient
        .post("/api/admin/lot/",lot)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editLot({}, lot) {
      return axiosClient
        .put(`/api/admin/lot/${lot.id}/`, lot)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getLots({ commit }, data) {
      commit("setLotsLoading", true);
      return axiosClient.get(`/api/admin/lot/${data}/member/`).then((res) => {
        commit("setLotsLoading", false);
        commit("setLots", res.data);
        return res;
      });
    },
    getLotSubdivision({commit}){
      commit("setLotSubdivisionLoading",true);
      return axiosClient.get("/api/admin/lot/show/subdivision/").then((res)=>{
        commit("setLotSubdivisionLoading",false);
        commit("setLotSubdivision",res.data);
        return res;
      })
    },
    getSearchLotSubdivision({commit},data){
      commit("setLotSubdivisionLoading",true);
      return axiosClient.get(`/api/admin/lot/search/subdivision/?find=${data}`).then((res)=>{
        commit("setLotSubdivisionLoading",false);
        commit("setLotSubdivision",res.data);
        return res;
      })
    },

    getLotAgent({commit}){
      commit("setLotAgentLoading",true);
      return axiosClient.get("/api/admin/lot/show/agent/").then((res)=>{
        commit("setLotAgentLoading",false);
        commit("setLotAgent",res.data);
        return res;
      })
    },
    getLot({ commit }, id) {
      commit("setCurrentLotLoading", true);
      return axiosClient
        .get(`/api/admin/lot/${id}/`)
        .then((res) => {
          commit("setCurrentLot", res.data);
          commit("setCurrentLotLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentLotLoading", false);
          throw err;
        });
    },
    deleteLot({}, id) {
      return axiosClient.delete(`/api/admin/lot/${id}/`);
    },
  },
  mutations: {
    setCurrentLot: (state, lotData) => {
      state.currentLot.data = lotData;
    },

    setCurrentLotLoading: (state, loading) => {
      state.currentLot.loading = loading;
    },

    setLots: (state, lotData) => {
      state.lot.links = lotData.meta.links;
      state.lot.data = lotData.data;
    },

    setLotsLoading: (state, loading) => {
      state.lot.loading = loading;
    },

    setLotSubdivisionLoading:(state,loading)=>{
      state.lotSubdivision.loading = loading
    },

    setLotSubdivision:(state,lotSubdivisionData)=>{
      state.lotSubdivision.data = lotSubdivisionData.data
    },
    setLotAgentLoading:(state,loading)=>{
      state.lotAgent.loading = loading
    },

    setLotAgent:(state,lotAgentData)=>{
      state.lotAgent.data = lotAgentData.data
    },
  },
};

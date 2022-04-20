import axiosClient from "../../../axios";


export default {
  namespaced: true,
  state: {
    subdivision: {
      loading: false,
      links: [],
      data: [],
    },
    currentSubdivision: {
      loading: false,
      data: {},
    },
    subdivisionEmail:{
      loading:false,
      data:[]
    }
  },

  actions: {
    addSubdivision({}, subdivision) {
      return axiosClient
        .post("/admin/subdivision", subdivision)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editSubdivision({}, subdivision) {
      return axiosClient
        .put(`/admin/subdivision/${subdivision.id}`, subdivision)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    changeStatus({}, id) {
      return axiosClient
        .put(`/admin/subdivision/change/status/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getSubdivisions({ commit }, {url = null} = {}) {
      commit("setSubdivisionsLoading", true);
      url = url || "/admin/subdivision";
      return axiosClient.get(url).then((res) => {
        commit("setSubdivisionsLoading", false);
        commit("setSubdivisions", res.data);
        return res;
      });
    },
    getShowEmail({commit}){
      commit("setShowEmailLoading",true);
      return axiosClient.get("/admin/subdivision/show/email").then((res)=>{
        commit("setShowEmailLoading",false);
        commit("setShowEmail",res.data);
        return res;
      })
    },
    getSubdivision({ commit }, id) {
      commit("setCurrentSubdivisionLoading", true);
      return axiosClient
        .get(`/admin/subdivision/${id}`)
        .then((res) => {
          commit("setCurrentSubdivision", res.data);
          commit("setCurrentSubdivisionLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSubdivisionLoading", false);
          throw err;
        });
    },
    deleteSubdivision({}, id) {
      return axiosClient.delete(`/admin/subdivision/${id}`);
    },
  },
  mutations: {
    setCurrentSubdivision: (state, subdivisionData) => {
      state.currentSubdivision.data = subdivisionData;
    },

    setCurrentSubdivisionLoading: (state, loading) => {
      state.currentSubdivision.loading = loading;
    },

    setSubdivisions: (state, subdivisionData) => {
      state.subdivision.links = subdivisionData.meta.links;
      state.subdivision.data = subdivisionData.data;
    },

    setSubdivisionsLoading: (state, loading) => {
      state.subdivision.loading = loading;
    },

    setShowEmailLoading:(state,loading)=>{
      state.subdivisionEmail.loading = loading
    },

    setShowEmail:(state,emailData)=>{
      state.subdivisionEmail.data = emailData.data
    }
  },
};

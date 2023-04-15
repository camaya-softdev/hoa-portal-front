import axiosClient from "../../../../axios";


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
    addSubdivision({commit}, subdivision) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .post("/api/admin/subdivision/", subdivision)
        .then((res) => {
          commit("setAddSubdivision",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editSubdivision({commit}, subdivision) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .put(`/api/admin/subdivision/${subdivision.id}/`, subdivision)
        .then((res) => {
          commit("setEditSubdivision",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    changeStatus({}, id) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .put(`/api/admin/subdivision/change/status/${id}/`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getSubdivisions({ commit }, {url = 1} = {}) {
      commit("setSubdivisionsLoading", true);
      url = `/api/admin/subdivision/?page=${Number(url)}`
      return axiosClient.get(url).then((res) => {
        commit("setSubdivisionsLoading", false);
        commit("setSubdivisions", res.data);
        return res;
      });
    },
    getSearchSubdivision({commit},link){
      let url = ''
      url = `/api/admin/subdivision/search/data/?find=${link.data}&page=${link.label}`
      return axiosClient.get(url).then((res) => {
        commit("setSubdivisions", res.data);
        return res;
      });
    },
    getShowEmail({commit}){
      commit("setShowEmailLoading",true);
      return axiosClient.get("/api/admin/subdivision/show/email/").then((res)=>{
        commit("setShowEmailLoading",false);
        commit("setShowEmail",res.data);
        return res;
      })
    },
    getSearchUser({commit},data){
      commit("setShowEmailLoading",true);
      return axiosClient.get(`/api/admin/subdivision/search/user/?q=${data}/`).then((res)=>{
        commit("setShowEmailLoading",false);
        commit("setShowEmail",res.data);
        return res;
      })
    },
    getSubdivision({ commit }, id) {
      commit("setCurrentSubdivisionLoading", true);
      return axiosClient
        .get(`/api/admin/subdivision/${id}/`)
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
      return axiosClient.delete(`/api/admin/subdivision/${id}/`);
    },
  },
  mutations: {
    setAddSubdivision:(state,subdivisionData)=>{
      state.subdivision.data.push(subdivisionData.data);
    },
    setEditSubdivision:(state,subdivisionData)=>{
      let subdivisions = state.subdivision.data
      const update_obj = subdivisions.findIndex((obj=>obj.id == subdivisionData.data.id))

      subdivisions[update_obj] = {...subdivisionData.data}
    },
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

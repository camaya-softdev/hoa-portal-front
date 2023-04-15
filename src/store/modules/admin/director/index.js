import axiosClient from "../../../../axios";

export default {
  namespaced: true,
  state: {
    director: {
      loading: false,
      links: [],
      data: [],
    },
    currentDirector: {
      loading: false,
      data: [],
    },
    directorPerson:{
      loading:false,
      data:[]
    }
  },

  actions: {
    addDirector({commit}, director) {
      delete director.image_url;
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .post("/api/admin/directors/", director)
        .then((res) => {
          commit("setAddDirector",res.data);
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editDirector({commit}, director) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .put(`/api/admin/directors/${director.id}/`, director)
        .then((res) => {
          commit("setEditDirector",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getDirectors({ commit }, data) {
      commit("setDirectorsLoading", true);
      return axiosClient.get(`/api/admin/directors/${data}/subdivision/`).then((res) => {
        commit("setDirectorsLoading", false);
        commit("setDirectors", res.data);
        return res;
      });
    },

    getShowPerson({commit}, data){
      commit("setShowPersonLoading",true);
      return axiosClient.get(`/api/admin/directors/show/user/${data}/`).then((res)=>{
        commit("setShowPersonLoading",false);
        commit("setShowPerson",res.data);
        return res;
      })
    },
    getSearchUser({commit},data){
      commit("setShowPersonLoading",true);
      return axiosClient.get(`/api/admin/directors/search/user/?q=${data}`).then((res)=>{
        commit("setShowPersonLoading",false);
        commit("setShowPerson",res.data);
        return res;
      })
    },
    getDirector({ commit }, id) {
      commit("setCurrentDirectorLoading", true);
      return axiosClient
        .get(`/api/admin/directors/${id}/`)
        .then((res) => {
          commit("setCurrentDirector", res.data);
          commit("setCurrentDirectorLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentDirectorLoading", false);
          throw err;
        });
    },
    deleteDirector({}, id) {
      return axiosClient.delete(`/api/admin/directors/${id}/`);
    },
  },
  mutations: {
    setAddDirector:(state,directorData)=>{
      state.director.data = directorData.data
    },
    setEditDirector:(state,directorData)=>{
      let directors = state.director.data;
      const update_obj = directors.findIndex((obj=>obj.id == directors.data.id))
      directors[update_obj] = {...directorData.data}
    },
    setCurrentDirector: (state, directorData) => {
      state.currentDirector.data = directorData;
    },

    setCurrentDirectorLoading: (state, loading) => {
      state.currentDirector.loading = loading;
    },

    setDirectors: (state, directorData) => {
      state.director.links = directorData.meta.links;
      state.director.data = directorData.data;
    },

    setDirectorsLoading: (state, loading) => {
      state.director.loading = loading;
    },

    setShowPersonLoading:(state,loading)=>{
      state.directorPerson.loading = loading
    },

    setShowPerson:(state,emailData)=>{
      state.directorPerson.data = emailData.data
    }
  },
};

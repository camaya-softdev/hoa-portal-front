import axiosClient from "../../../../axios";

export default {
  namespaced: true,
  state: {
    autogate: {
      loading: false,
      links: [],
      data: [],
    },
    currentAutogate: {
      loading: false,
      data: {},
    },
    user_subdivision: {
      loading: false,
      data: {},
    },
    autogate_template: {
      loading: false,
      data: {},
    },
  },

  actions: {
    addAutogate({}, autogate) {
      return axiosClient
        .post("/api/admin/autogate/", autogate)
        .then((res) => {
          commit("setAddAutogate",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editAutogate({}, autogate) {
      return axiosClient
        .put(`/api/admin/autogate/${autogate.id}/`, autogate)
        .then((res) => {
          commit("setEditAutogate",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getAutogates({ commit }, { url = 1 } = {}) {
      commit("setAutogatesLoading", true);
      url = `/api/admin/autogate/?page=${Number(url)}`;
      return axiosClient.get(url).then((res) => {
        commit("setAutogatesLoading", false);
        commit("setAutogates", res.data);
        return res;
      });
    },
    getAutogate({ commit }, id) {
      commit("setCurrentAutogateLoading", true);
      return axiosClient
        .get(`/api/admin/autogate/${id}/`)
        .then((res) => {
          commit("setCurrentAutogate", res.data);
          commit("setCurrentAutogateLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentAutogateLoading", false);
          throw err;
        });
    },
    getSearchAutogates({ commit }, link) {
      let url = "";
      url = `/api/admin/autogate/search/data/?find=${link.data}&page=${link.label}`;
      return axiosClient.get(url).then((res) => {
        commit("setAutogates", res.data);
        return res;
      });
    },
    getSearchShowAutogates({ commit }, data) {
      let url = "";
      url = `/api/admin/autogate/search/show/data/?find=${data}`;
      return axiosClient.get(url).then((res) => {
        commit("setUserSubdivisions", res.data);
        return res;
      });
    },
    getUserSubdivision({ commit }) {
      commit("setUserSubdivisionsLoading", true);
      return axiosClient
        .get(`/api/admin/autogate/user/subdivision/`)
        .then((res) => {
          commit("setUserSubdivisionsLoading", false);
          commit("setUserSubdivisions", res.data);
          return res;
        });
    },
    getAutogateTemplates({ commit }) {
      commit("setAutogateTemplatesLoading", true);
      return axiosClient
        .get(`/api/admin/autogate/templates/data/`)
        .then((res) => {
          commit("setAutogateTemplatesLoading", false);
          commit("setAutogateTemplates", res.data);
        });
    },
    deleteAutogate({}, id) {
      return axiosClient.delete(`/api/admin/autogate/${id}/`);
    },
  },
  mutations: {
    setAddAutogate:(state,autogateData)=>{
      state.autogate.data.push(autogateData.data);
    },
    setEditAutogate:(state,autogateData)=>{
      let autogates = state.autogate.data
      const update_obj = autogates.findIndex((obj=>obj.id == autogateData.data.id));
      autogates[update_obj] = {...autogateData.data}
    },
    setCurrentAutogate: (state, autogateData) => {
      state.currentAutogate.data = autogateData;
    },

    setCurrentAutogateLoading: (state, loading) => {
      state.currentAutogate.loading = loading;
    },

    setAutogates: (state, autogateData) => {
      state.autogate.links = autogateData.meta.links;
      state.autogate.data = autogateData.data;
    },

    setAutogatesLoading: (state, loading) => {
      state.autogate.loading = loading;
    },
    setUserSubdivisions: (state, autogateData) => {
      state.user_subdivision.data = autogateData.data;
    },

    setUserSubdivisionsLoading: (state, loading) => {
      state.user_subdivision.loading = loading;
    },

    setAutogateTemplates: (state, templateData) => {
      state.autogate_template.links = templateData.meta.links;
      state.autogate_template.data = templateData.data;
    },

    setAutogateTemplatesLoading: (state, loading) => {
      state.autogate_template.loading = loading;
    },
  },
};

import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    template: {
      loading: false,
      links: [],
      data: [],
    },
    currentTemplate: {
      loading: false,
      data: {},
    },

  },

  actions: {
    addTemplate({}, template) {
      return axiosClient
        .post("/api/admin/template/",template)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editTemplate({}, template) {
      return axiosClient
        .put(`/api/admin/template/${template.id}/`, template)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getTemplates({ commit }, url) {
      commit("setTemplatesLoading", true);
      url = `/api/admin/template/?page=${Number(url)}`
      return axiosClient.get(url).then((res) => {
        commit("setTemplatesLoading", false);
        commit("setTemplates", res.data);
        return res;
      });
    },
    getSearchTemplates({commit},link){
      let url = ''
      url = `/api/admin/template/search/data/?find=${link.data}&page=${link.url}`
      return axiosClient.get(url).then((res) => {
        commit("setTemplates", res.data);
        return res;
      });
    },

    getTemplate({ commit }, id) {
      commit("setCurrentTemplateLoading", true);
      return axiosClient
        .get(`/api/admin/template/${id}/`)
        .then((res) => {
          commit("setCurrentTemplate", res.data);
          commit("setCurrentTemplateLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentTemplateLoading", false);
          throw err;
        });
    },

    deleteTemplate({}, id) {
      return axiosClient.delete(`/api/admin/template/${id}/`);
    },
  },
  mutations: {
    setCurrentTemplate: (state, templateData) => {
      state.currentTemplate.data = templateData;
    },

    setCurrentTemplateLoading: (state, loading) => {
      state.currentTemplate.loading = loading;
    },

    setTemplates: (state, templateData) => {
      state.template.links = templateData.meta.links;
      state.template.data = templateData.data;
    },

    setTemplatesLoading: (state, loading) => {
      state.template.loading = loading;
    },

  },
};
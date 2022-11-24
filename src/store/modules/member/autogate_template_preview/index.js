import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    currentAutogateTemplate: {
      loading: false,
      data: {},
    },

  },

  actions: {
    getAutogateTemplate({ commit }, id) {
      commit("setCurrentAutogateTemplateLoading", true);
      return axiosClient
        .get(`/api/admin/template/preview/${id}/template/`)
        .then((res) => {
          commit("setCurrentAutogateTemplate", res.data);
          commit("setCurrentAutogateTemplateLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentAutogateTemplateLoading", false);
          throw err;
        });
    },
  },
  mutations: {
    setCurrentAutogateTemplate: (state, templateData) => {

      state.currentAutogateTemplate.data = templateData.data;
      console.log( state.currentAutogateTemplate.data )
    },

    setCurrentAutogateTemplateLoading: (state, loading) => {
      state.currentAutogateTemplate.loading = loading;
      console.log(loading)
    },

  },
};

import axiosClient from "../../../../axios";
export default {
  namespaced: true,
  state: {
    information: {
      loading: false,
      data: [],
    },
  },

  actions: {
    editInformation({}, information) {
      return axiosClient
        .put(`/api/member/information/${information.id}/`, information)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getInformations({ commit }) {
      commit("setInformationsLoading", true);
      return axiosClient.get( '/api/member/information/').then((res) => {
        commit("setInformationsLoading", false);
        commit("setInformations", res.data);
        return res;
      });
    },
},
  mutations: {
    setInformations: (state, informationsData) => {
      state.information.data = informationsData.data;
    },
    setInformationsLoading: (state, loading) => {
      state.information.loading = loading;
    },
  },
};

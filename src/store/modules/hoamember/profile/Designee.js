import axiosClient from "../../../../axios";
export default {
  namespaced: true,
  state: {
    designee: {
      loading: false,
      data: [],
    },
  },

  actions: {
    getDesignees({ commit }) {
      commit("setDesigneesLoading", true);
      return axiosClient.get("/api/member/designee/").then((res) => {
        commit("setDesigneesLoading", false);
        commit("setDesignees", res.data);
        return res;
      });
    },
    addDesignee({}, designee) {
      axiosClient.get("/sanctum/csrf-cookie");
      return axiosClient
        .post("/api/member/designee/", designee)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    deleteDesignee({}, id) {
      return axiosClient.delete(`/api/member/designee/${id}/`);
    },
  },
  mutations: {
    setDesignees: (state, designeesData) => {
      state.designee.data = designeesData.data;
    },
    setDesigneesLoading: (state, loading) => {
      state.designee.loading = loading;
    },
  },
};

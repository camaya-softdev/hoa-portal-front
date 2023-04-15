import axiosClient from "../../../../axios";

export default {
  namespaced: true,
  state: {
    member: {
      loading: false,
      data: [],
    },
  },
  actions: {
    getUser({ commit }, id) {
      commit("setCurrentMemberLoading", true);
      return axiosClient
        .get(`/api/navigation/`)
        .then((res) => {
          commit("setCurrentMember", res.data);
          commit("setCurrentMemberLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentMemberLoading", false);
          throw err;
        });
    },
  },
  mutations: {
    setCurrentMember: (state, memberData) => {
      state.member.data = memberData;
    },

    setCurrentMemberLoading: (state, loading) => {
      state.member.loading = loading;
    },

  },
};

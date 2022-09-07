import axiosClient from "../../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state: {
    profile: {
      loading: false,
      data: [],
    },
  },
  actions: {
    getProfiles({ commit }, id) {
      commit("setCurrentProfileLoading", true);
      return axiosClient
        .get(`/api/member/profile/`)
        .then((res) => {
          commit("setCurrentProfile", res.data);
          commit("setCurrentProfileLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentProfileLoading", false);
          throw err;
        });
    },
  },
  mutations: {
    setCurrentProfile: (state, profileData) => {
      state.profile.data = profileData.data;
    },

    setCurrentProfileLoading: (state, loading) => {
      state.profile.loading = loading;
    },

  },
};

import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state: {
    directors: {
      loading: false,
      data: [],
    },
  },
  actions: {
    getDirectors({ commit }, id) {
      commit("setCurrentDirectorLoading", true);
      return axiosClient
        .get(`/api/member/director/`)
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
  },
  mutations: {
    setCurrentDirector: (state, memberData) => {
      state.directors.data = memberData.data;
    },

    setCurrentDirectorLoading: (state, loading) => {
      state.directors.loading = loading;
    },

  },
};

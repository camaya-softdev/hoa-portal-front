import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state: {
    news: {
      loading: false,
      data: [],
    },
  },
  actions: {
    getNews({ commit }, id) {
      commit("setCurrentNewLoading", true);
      return axiosClient
        .get(`/api/member/news/`)
        .then((res) => {
          commit("setCurrentNew", res.data);
          commit("setCurrentNewLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentNewLoading", false);
          throw err;
        });
    },
  },
  mutations: {
    setCurrentNew: (state, memberData) => {
      state.news.data = memberData.data;
    },

    setCurrentNewLoading: (state, loading) => {
      state.news.loading = loading;
    },

  },
};

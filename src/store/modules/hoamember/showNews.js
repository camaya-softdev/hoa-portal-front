import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state: {
    currentNews: {
      loading: false,
      data: [],
    },
  },
  actions: {
    getNews({ commit }, id) {
      commit("setCurrentNewLoading", true);
      return axiosClient
        .get(`/api/member/show/news/${id}/`)
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
    setCurrentNew: (state, eventData) => {
      state.currentNews.data = eventData.data;
    },

    setCurrentNewLoading: (state, loading) => {
      state.currentNews.loading = loading;
    },

  },
};

import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state: {
    event: {
      loading: false,
      data: [],
    },
  },
  actions: {
    getEvents({ commit }, id) {
      commit("setCurrentEventLoading", true);
      return axiosClient
        .get(`/api/member/events/`)
        .then((res) => {
          commit("setCurrentEvent", res.data);
          commit("setCurrentEventLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentEventLoading", false);
          throw err;
        });
    },
  },
  mutations: {
    setCurrentEvent: (state, memberData) => {
      state.event.data = memberData.data;
    },

    setCurrentEventLoading: (state, loading) => {
      state.event.loading = loading;
    },

  },
};

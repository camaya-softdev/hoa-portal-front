import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state: {
    currentEvent: {
      loading: false,
      data: [],
    },
  },
  actions: {
    getEvents({ commit }, id) {
      commit("setCurrentEventLoading", true);
      return axiosClient
        .get(`/api/member/show/events/${id}/`)
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
    setCurrentEvent: (state, eventData) => {
      state.currentEvent.data = eventData.data;
    },

    setCurrentEventLoading: (state, loading) => {
      state.currentEvent.loading = loading;
    },

  },
};

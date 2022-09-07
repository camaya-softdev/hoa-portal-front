import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state: {
    dashboard: {
      loading: false,
      data: [],
    },
  },
  actions: {
    getDashboard({ commit }, id) {
      commit("setCurrentDashboardLoading", true);
      return axiosClient
        .get(`/api/member/dashboard/`)
        .then((res) => {
          commit("setCurrentDashboard", res.data);
          commit("setCurrentDashboardLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentDashboardLoading", false);
          throw err;
        });
    },
  },
  mutations: {
    setCurrentDashboard: (state, memberData) => {
      state.dashboard.data = {...JSON.parse(JSON.stringify(memberData))};
    },

    setCurrentDashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },

  },
};

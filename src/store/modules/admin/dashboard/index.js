import axiosClient from "../../../../axios";
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
        .get(`/api/admin/dashboard/`)
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
      state.dashboard.data = memberData;
    },

    setCurrentDashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },

  },
};

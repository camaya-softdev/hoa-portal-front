import axiosClient from "../../../../axios";
export default {
  namespaced: true,
  state: {
    notification: {
      loading: false,
      data: [],
    },
  },

  actions: {
    editNotification({}, notification) {
      return axiosClient
        .put(`/api/member/notification/${notification.id}/`, notification)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getNotifications({ commit }) {
      commit("setNotificationsLoading", true);
      return axiosClient.get( '/api/member/notification/').then((res) => {
        commit("setNotificationsLoading", false);
        commit("setNotifications", res.data);
        return res;
      });
    },
  },
  mutations: {
    setNotifications: (state, notificationsData) => {
      state.notification.data = notificationsData.data;
    },
    setNotificationsLoading: (state, loading) => {
      state.notification.loading = loading;
    },
  },
};

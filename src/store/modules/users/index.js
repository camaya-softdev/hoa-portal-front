import axiosClient from "../../../axios";


export default {
  namespaced: true,
  state: {
    users: {
      loading: false,
      links: [],
      data: [],
    },
    currentUser: {
      loading: false,
      data: {},
    },
    // notification:{
    //   show:false,
    //   message:null
    // }
  },

  actions: {
    updateUser({}, user) {
      return axiosClient
        .put(`/admin/user/${user.id}`, user)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    changeStatus({}, id) {
      return axiosClient
        .put(`/admin/user/change/status/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getUsers({ commit }, {url = null} = {}) {
      commit("setUsersLoading", true);
      url = url || "/admin/user";
      return axiosClient.get("/admin/user").then((res) => {
        commit("setUsersLoading", false);
        commit("setUsers", res.data);
        return res;
      });
    },
    getUser({ commit }, id) {
      commit("setCurrentUserLoading", true);
      return axiosClient
        .get(`/admin/user/${id}`)
        .then((res) => {
          commit("setCurrentUser", res.data);
          commit("setCurrentUserLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentUserLoading", false);
          throw err;
        });
    },
    deleteUser({}, id) {
      return axiosClient.delete(`/admin/user/${id}`);
    },
  },
  mutations: {
    setCurrentUser: (state, userData) => {
      state.currentUser.data = userData;
    },

    setCurrentUserLoading: (state, loading) => {
      state.currentUser.loading = loading;
    },

    setUsers: (state, userData) => {
      state.users.links = userData.meta.links;
      state.users.data = userData.data;
    },

    setUsersLoading: (state, loading) => {
      state.users.loading = loading;
    },
  },
};

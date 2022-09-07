import axiosClient from "../../../../axios";
export default{
  namespaced:true,
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
      hoa_admin:sessionStorage.getItem("hoa_admin"),
      hoa_member:sessionStorage.getItem("hoa_member"),
      hoa_access_type:sessionStorage.getItem('hoa_access_type'),
      hoa_member_registered:sessionStorage.getItem('hoa_member_registered')
    }
  },
  getters: {},
  actions: {
    login({ commit }, user) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient.post("/api/login/", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    logout({ commit }, user) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient.post("/api/logout/").then((res) => {
        commit("logout");
        return res;
      });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
      sessionStorage.removeItem("hoa_admin");
      sessionStorage.removeItem("hoa_member");
      sessionStorage.removeItem("hoa_member_registered");

    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      // hoa_admin = userData.user.hoa_admin,
      // hoa_member = userData.user.hoa_member
      sessionStorage.setItem("TOKEN", userData.token);
      sessionStorage.setItem("hoa_access_type",userData.user.hoa_access_type)
      sessionStorage.setItem("hoa_admin",userData.user.hoa_admin)
      sessionStorage.setItem("hoa_member",userData.user.hoa_member)
      sessionStorage.setItem("hoa_member_registered",userData.user.hoa_member_registered)

    },
  },
}

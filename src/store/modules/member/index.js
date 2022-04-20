import axiosClient from "../../../axios";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state: {
    members: {
      loading: false,
      links: [],
      data: [],
    },
    currentMember: {
      loading: false,
      data: {},
    },
    // notification:{
    //   show:false,
    //   message:null
    // }
  },
  getters: {
    allMembers(state) {
      return state.members.data;
    },
  },
  actions: {
    addMember({}, member) {
      return axiosClient
        .post("/admin/member", member)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    updateMember({}, member) {
      return axiosClient
        .put(`/admin/member/${member.id}`, member)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    changeStatus({}, id) {
      return axiosClient
        .put(`/admin/member/change/status/${id}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getMembers({ commit }, {url = null} = {}) {
      commit("setMemberLoading", true);
      url = url || "/admin/member";
      return axiosClient.get(url).then((res) => {
        commit("setMemberLoading", false);
        commit("setMembers", res.data);
        return res;
      });
    },
    getMember({ commit }, id) {
      commit("setCurrentMemberLoading", true);
      return axiosClient
        .get(`/admin/member/${id}`)
        .then((res) => {
          commit("setCurrentMember", res.data);
          commit("setCurrentMemberLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentMemberLoading", false);
          throw err;
        });
    },
    deleteMember({}, id) {
      return axiosClient.delete(`/admin/member/${id}`);
    },
  },
  mutations: {
    setCurrentMember: (state, memberData) => {
      state.currentMember.data = memberData;
    },

    setCurrentMemberLoading: (state, loading) => {
      state.currentMember.loading = loading;
    },

    setMembers: (state, memberData) => {
      state.members.links = memberData.meta.links;
      state.members.data = memberData.data;
    },

    setMemberLoading: (state, loading) => {
      state.members.loading = loading;
    },
    notify: (state, { message, type, title }) => {
      ElNotification({
        title: title,
        message: message,
        type: type,
        offset: 200,
      });
      // state.notification.show = true;
      // state.notification.type = type;
      // state.notification.message = message;
      // setTimeout(() => {
      //   state.notification.show = false;
      // }, 3000)
    },
  },
};

import axiosClient from "../../../../axios";
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
  },
  getters: {
    allMembers(state) {
      return state.members.data;
    },
  },
  actions: {
    addMember({}, member) {
  
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .post("/api/admin/member/", member)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    updateMember({}, member) {
      return axiosClient
        .put(`/api/admin/member/${member.id}/`, member)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    changeStatus({}, id) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .put(`/api/admin/member/change/status/${id}/`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getMembers({ commit }, {url=1} = {}) {
      commit("setMemberLoading", true);
      url = `/api/admin/member/?page=${Number(url)}`
      return axiosClient.get(url).then((res) => {
        commit("setMemberLoading", false);
        commit("setMembers", res.data);
        return res;
      });
    },
    getSearchMembers({commit},link){
      let url = ''
      url = `/api/admin/member/search/data/?find=${link.data}&page=${link.label}`
      return axiosClient.get(url).then((res) => {
        commit("setMembers", res.data);
        return res;
      });
    },
    getMember({ commit }, id) {
      commit("setCurrentMemberLoading", true);
      return axiosClient
        .get(`/api/admin/member/${id}/`)
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
      return axiosClient.delete(`/api/admin/member/${id}/`);
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
  },
};

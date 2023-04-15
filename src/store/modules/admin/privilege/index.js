import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    privilege: {
      loading: false,
      links: [],
      data: [],
    },
    currentPrivilege: {
      loading: false,
      data: {},
    },
  },

  actions: {
    addPrivilege({commit}, privilege) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .post("/api/admin/privilege/", privilege)
        .then((res) => {
          commit("setAddPrivilege",res.data)
          return res;
        })
        .catch((err) => {
      
          return err;
        });
    },
    editPrivilege({commit}, privilege) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .put(`/api/admin/privilege/${privilege.id}/`, privilege)
        .then((res) => {
          commit("setEditPrivilege",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    changeStatus({}, id) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .put(`/api/admin/privilege/change/status/${id}/`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getPrivileges({ commit }, {url = 1} = {}) {
      commit("setPrivilegesLoading", true);
      url = `/api/admin/privilege/?page=${Number(url)}`
      return axiosClient.get(url).then((res) => {
        commit("setPrivilegesLoading", false);
        commit("setPrivileges", res.data);
        return res;
      });
    },

    getSearchPrivileges({commit},link){
      let url = ''
      url = `/api/admin/privilege/search/data/?find=${link.data}&page=${link.label}`
      return axiosClient.get(url).then((res) => {
        commit("setPrivileges", res.data);
        return res;
      });
    },

    getPrivilege({ commit }, id) {
      commit("setCurrentPrivilegeLoading", true);
      return axiosClient
        .get(`/api/admin/privilege/${id}/`)
        .then((res) => {
          commit("setCurrentPrivilege", res.data);
          commit("setCurrentPrivilegeLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentPrivilegeLoading", false);
          throw err;
        });
    },
    deletePrivilege({}, id) {
      return axiosClient.delete(`/api/admin/privilege/${id}/`);
    },
  },
  mutations: {
    setAddPrivilege:(state,privilegeData)=>{
      state.privilege.data.push(privilegeData.data);
    },
    setEditPrivilege:(state,privilegeData)=>{
      let privileges = state.privilege.data;
      const update_obj = privileges.findIndex((obj=>obj.id == privilegeData.data.id));
      privileges[update_obj] = {...privilegeData.data}
    },
    setCurrentPrivilege: (state, privilegeData) => {
      state.currentPrivilege.data = privilegeData;
    },

    setCurrentPrivilegeLoading: (state, loading) => {
      state.currentPrivilege.loading = loading;
    },

    setPrivileges: (state, privilegeData) => {
      state.privilege.links = privilegeData.meta.links;
      state.privilege.data = privilegeData.data;
    },

    setPrivilegesLoading: (state, loading) => {
      state.privilege.loading = loading;
    },
  },
};

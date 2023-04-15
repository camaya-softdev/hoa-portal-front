import axiosClient from "../../../../axios";


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
    userEmail:{
      loading:false,
      data:[]
    },
    user_subdivision:{
      loading:false,
      data:[]
    }
  },

  actions: {
    addUser({}, user) {
      return axiosClient
        .put(`/api/admin/user/add/user/${user.id}/`, user)
        .then((res) => {
          commit("setAddUser",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editUser({}, user) {
      return axiosClient
        .put(`/api/admin/user/${user.id}/`, user)
        .then((res) => {
          commit("setEditUser",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    changeStatus({}, id) {
      return axiosClient
        .put(`/api/admin/user/change/status/${id}/`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getUsers({ commit }, {url = 1} = {}) {
      commit("setUsersLoading", true);
      url = `/api/admin/user/?page=${Number(url)}`
      return axiosClient.get(url).then((res) => {
        commit("setUsersLoading", false);
        commit("setUsers", res.data);
        return res;
      });
    },

    getSearchUsers({commit},link){
      let url = ''
      url = `/api/admin/user/search/data/?find=${link.data}&page=${link.label}`
      return axiosClient.get(url).then((res) => {
        commit("setUsers", res.data);
        return res;
      });
    },

    getSearchShowUsers({commit},data){
      let url = ''
        url = `/api/admin/search/show/email/data/?find=${data}`
      commit("setShowEmailLoading",true);
      return axiosClient.get(url).then((res) => {
        commit("setShowEmailLoading",false);
        commit("setShowEmail",res.data);
        return res;
      });
    },

    getUser({ commit }, id) {
      commit("setCurrentUserLoading", true);
      return axiosClient
        .get(`/api/admin/user/${id}/`)
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
    getShowEmail({commit}){
      commit("setShowEmailLoading",true);
      return axiosClient.get("/api/admin/user/show/email/").then((res)=>{
        commit("setShowEmailLoading",false);
        commit("setShowEmail",res.data);
        return res;
      })
    },
    getShowSubdivision({commit}){
      commit('setSubdivisionLoading',true);
      return axiosClient.get('/api/admin/user/show/subdivision/').then((res)=>{
        commit("setSubdivisionLoading",false)
        commit('setSubdivision',res.data)
        return res
      })
    },
    deleteUser({}, id) {
      return axiosClient.delete(`/api/admin/user/${id}/`);
    },

  
    exportUser({}){
      return axiosClient.get('/api/admin/user/export/data/', {
        responseType: 'blob'
      }).then(response => {
        let fileUrl = window.URL.createObjectURL(response.data);
        let fileLink = document.createElement('a');

        fileLink.href = fileUrl;
        fileLink.setAttribute('download', 'users.xlsx');
        document.body.appendChild(fileLink)

        fileLink.click();
      }).catch(error => {
        console.log(error.response.data)
      })
    }
  },
  mutations: {
    setAddUser: (state,userData)=>{
      state.user.data.push(userData.data);
    },
    setEditUser:(state,userData)=>{
      let users = state.user.data
      const update_obj = users.findIndex((obj=>obj.id == userData.data.id));
      users[update_obj] = {...userData.data}
    },
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
    setShowEmailLoading:(state,loading)=>{
      state.userEmail.loading = loading
    },

    setShowEmail:(state,emailData)=>{
      state.userEmail.data = emailData.data
    },
    setSubdivisionLoading:(state,loading)=>{
      state.user_subdivision.loading = loading;
    },
    setSubdivision:(state,subdivisionData)=>{
      state.user_subdivision.data = subdivisionData.data
    }

  },
};

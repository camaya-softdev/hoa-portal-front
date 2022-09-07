import axiosClient from "../../../axios";


export default {
  namespaced: true,
  state: {
    showMemberUser:{
      loading:false,
      data:[]
    },
  },

  actions: {
    getSearchShowMemberUsers({commit},data){
      let url = ''
      url = `/api/show/member/user/search/data/?find=${data}`
      commit("setShowMemberUserLoading",true);
      return axiosClient.get(url).then((res) => {
        commit("setShowMemberUserLoading",false);
        commit("setShowMemberUser",res.data);
        return res;
      });
    },


    getShowMemberUsers({commit}){
      return axiosClient.get("/api/show/member/user/").then((res)=>{
        commit("setShowMemberUser",res.data);
        return res;
      })
    },

  },
  mutations: {
    setShowMemberUserLoading:(state,loading)=>{
      state.showMemberUser.loading = loading
    },
    setShowMemberUser:(state,emailData)=>{
      state.showMemberUser.data = emailData.data
    },
  },
};

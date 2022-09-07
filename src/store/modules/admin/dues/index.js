import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    due: {
      loading: false,
      links: [],
      data: [],
    },
    currentDue: {
      loading: false,
      data: {},
    },
    paymentSchedule:{
      loading:false,
      data:[]
    },
    duesSchedule:{
      loading:false,
      data:[]
    },
    duesUnits:{
      loading:false,
      data:[]
    }
  },

  actions: {
    addDue({}, due) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .post("/api/admin/due/",due)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editDue({}, due) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .put(`/api/admin/due/${due.id}/`, due)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    changeStatus({}, id) {
      return axiosClient
        .put(`/api/admin/due/change/status/${id}/`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getDues({ commit }, data) {
      commit("setDuesLoading", true);
      return axiosClient.get(`/api/admin/due/${data}/subdivision/`).then((res) => {
        commit("setDuesLoading", false);
        commit("setDues", res.data);
        return res;
      });
    },
    getShowSchedule({commit}, data){
      commit("setShowScheduleLoading",true);
      return axiosClient.get("/api/admin/due/show/schedule/").then((res)=>{
        commit("setShowScheduleLoading",false);
        commit("setShowSchedule",res.data);
        return res;
      })
    },
    getShowUnits({commit}, data){
      commit("setShowUnitsLoading",true);
      return axiosClient.get("/api/admin/due/show/unit/").then((res)=>{
        commit("setShowUnitsLoading",false);
        commit("setShowUnits",res.data);
        return res;
      })
    },
    getPaymentSchedule({commit}){
      commit("setShowEmailLoading",true);
      return axiosClient.get("/api/admin/subdivision/show/email/").then((res)=>{
        commit("setShowEmailLoading",false);
        commit("setShowEmail",res.data);
        return res;
      })
    },
    getSearchPaymentSchedule({commit},data){
      commit("setShowEmailLoading",true);
      return axiosClient.get(`/api/admin/subdivision/search/user/?q=${data}/`).then((res)=>{
        commit("setShowEmailLoading",false);
        commit("setShowEmail",res.data);
        return res;
      })
    },
    getDue({ commit }, id) {
      commit("setCurrentDueLoading", true);
      return axiosClient
        .get(`/api/admin/due/${id}/`)
        .then((res) => {
          commit("setCurrentDue", res.data);
          commit("setCurrentDueLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentDueLoading", false);
          throw err;
        });
    },
    deleteDue({}, id) {
      return axiosClient.delete(`/api/admin/due/${id}/`);
    },
  },
  mutations: {
    setCurrentDue: (state, dueData) => {
      state.currentDue.data = dueData;
    },

    setCurrentDueLoading: (state, loading) => {
      state.currentDue.loading = loading;
    },

    setDues: (state, dueData) => {
      state.due.links = dueData.meta.links;
      state.due.data = dueData.data;
    },

    setDuesLoading: (state, loading) => {
      state.due.loading = loading;
    },

    setPaymentScheduleoading:(state,loading)=>{
      state.paymentSchedule.loading = loading
    },

    setPaymentSchedule:(state,paymentScheduleData)=>{
      state.paymentSchedule.data = paymentScheduleData.data
    },
    setShowScheduleLoading:(state,loading)=>{
      state.duesSchedule.loading = loading
    },

    setShowSchedule:(state,scheduleData)=>{
      state.duesSchedule.data = scheduleData.data
    },
    setShowUnitsLoading:(state,loading)=>{
      state.duesUnits.loading = loading
    },

    setShowUnits:(state,unitData)=>{
      state.duesUnits.data = unitData
    }
  },
};

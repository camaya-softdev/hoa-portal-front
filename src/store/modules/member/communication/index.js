import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    communication: {
      loading: false,
      links: [],
      data: [],
    },
    currentCommunication: {
      loading: false,
      data: {},
    },

  },

  actions: {
    addCommunication({commit}, communication) {
      return axiosClient
        .post("/api/admin/communication/",communication)
        .then((res) => {
          commit("setAddCommunication",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editCommunication({commit}, communication) {
      return axiosClient
        .put(`/api/admin/communication/${communication.id}/`, communication)
        .then((res) => {
          commit("setEditCommunication",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getCommunications({ commit }, url) {
      commit("setCommunicationsLoading", true);
      url = `/api/admin/communication/?page=${Number(url)}`
      return axiosClient.get(url).then((res) => {
        commit("setCommunicationsLoading", false);
        commit("setCommunications", res.data);
        return res;
      });
    },

    getSearchCommunications({commit},link){
      let url = ''
      url = `/api/admin/communication/search/data/?find=${link.data}&page=${link.label}`
      return axiosClient.get(url).then((res) => {
        commit("setCommunications", res.data);
        return res;
      });
    },

    getCommunication({ commit }, id) {
      commit("setCurrentCommunicationLoading", true);
      return axiosClient
        .get(`/api/admin/communication/${id}/`)
        .then((res) => {
          commit("setCurrentCommunication", res.data);
          commit("setCurrentCommunicationLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentCommunicationLoading", false);
          throw err;
        });
    },

    deleteCommunication({}, id) {
      return axiosClient.delete(`/api/admin/communication/${id}/`);
    },
  },
  mutations: {
    setAddCommunication:(state,communicationData)=>{
      state.communication.data.push(communicationData);
    },
    setEditCommunication:(state,communicationData)=>{
      let communications = state.communication.data;
      const update_obj = communications.findIndex((obj=>obj.id == communicationData.data.id));
      communications[update_obj]={...communicationData.data}
    },
    setCurrentCommunication: (state, communicationData) => {
      state.currentCommunication.data = communicationData;
    },

    setCurrentCommunicationLoading: (state, loading) => {
      state.currentCommunication.loading = loading;
    },

    setCommunications: (state, communicationData) => {
      state.communication.links = communicationData.meta.links;
      state.communication.data = communicationData.data;
    },

    setCommunicationsLoading: (state, loading) => {
      state.communication.loading = loading;
    },

  },
};

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
    addCommunication({}, communication) {
      return axiosClient
        .post("/api/admin/communication/",communication)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editCommunication({}, communication) {
      return axiosClient
        .put(`/api/admin/communication/${communication.id}/`, communication)
        .then((res) => {
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

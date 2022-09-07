import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    message: {
      loading: false,
      links: [],
      data: [],
    },
    currentMessage: {
      loading: false,
      data: {},
    },

  },

  actions: {
    addMessage({}, message) {
      return axiosClient
        .post("/api/admin/template/message/",message)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editMessage({}, message) {
      return axiosClient
        .put(`/api/admin/template/message/${message.id}/`, message)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getMessages({ commit }, id) {
      commit("setMessagesLoading", true);
      let url = `/api/admin/template/message/${id}/autogate/`
      return axiosClient.get(url).then((res) => {
        commit("setMessagesLoading", false);
        commit("setMessages", res.data);
        return res;
      });
    },

    getMessage({ commit }, id) {
      commit("setCurrentMessageLoading", true);
      return axiosClient
        .get(`/api/admin/template/message/${id}/`)
        .then((res) => {
          commit("setCurrentMessage", res.data);
          commit("setCurrentMessageLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentMessageLoading", false);
          throw err;
        });
    },

    deleteMessage({}, id) {
      return axiosClient.delete(`/api/admin/template/message/${id}/`);
    },
  },
  mutations: {
    setCurrentMessage: (state, templateData) => {
      state.currentMessage.data = templateData;
    },

    setCurrentMessageLoading: (state, loading) => {
      state.currentMessage.loading = loading;
    },

    setMessages: (state, templateData) => {
      state.message.data = templateData.data;
    },

    setMessagesLoading: (state, loading) => {
      state.message.loading = loading;
    },

  },
};

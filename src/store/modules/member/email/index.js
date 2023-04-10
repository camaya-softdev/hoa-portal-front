import axiosClient from "../../../../axios";

export default {
  namespaced: true,
  state: {
    email: {
      loading: false,
      links: [],
      data: [],
    },
    currentEmail: {
      loading: false,
      data: {},
    },
    users: {
      loading: false,
      data: {},
    },
    schedules: {
      loading: false,
      data: {},
    },
    email_templates: {
      loading: false,
      data: {},
    },
  },

  actions: {
    addEmail({}, email) {
      return axiosClient
        .post("/api/admin/email", email)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editEmail({}, email) {
      return axiosClient
        .put(`/api/admin/email/${email.id}`, email)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    getEmails({ commit }, { url = 1 } = {}) {
      commit("setEmailsLoading", true);
      url = `/api/admin/email/?page=${Number(url)}`;
      return axiosClient.get(url).then((res) => {
        commit("setEmailsLoading", false);
        commit("setEmails", res.data);
        return res;
      });
    },
    getEmail({ commit }, id) {
      commit("setCurrentEmailLoading", true);
      return axiosClient
        .get(`/api/admin/email/${id}/`)
        .then((res) => {
          commit("setCurrentEmail", res.data);
          commit("setCurrentEmailLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentEmailLoading", false);
          throw err;
        });
    },
    getSearchEmails({ commit }, link) {
      let url = "";
      url = `/api/admin/email/search/data/?find=${link.data}&page=${link.label}`;
      return axiosClient.get(url).then((res) => {
        commit("setEmails", res.data);
        return res;
      });
    },

    getEmailTemplates({ commit }) {
      commit("setEmailTemplatesLoading", true);
      return axiosClient.get(`/api/admin/email/templates/data/`).then((res) => {
        commit("setEmailTemplatesLoading", false);
        commit("setEmailTemplates", res.data);
      });
    },
    deleteEmail({}, id) {
      return axiosClient.delete(`/api/admin/email/${id}/`);
    },
  },
  mutations: {
    setCurrentEmail: (state, emailData) => {
      state.currentEmail.data = emailData;
    },

    setCurrentEmailLoading: (state, loading) => {
      state.currentEmail.loading = loading;
    },

    setEmails: (state, emailData) => {
      state.email.links = emailData.meta.links;
      state.email.data = emailData.data;
    },

    setEmailsLoading: (state, loading) => {
      state.email.loading = loading;
    },
    setUserSubdivisions: (state, autogateData) => {
      state.user_subdivision.links = autogateData.meta.links;
      state.user_subdivision.data = autogateData.data;
    },

    setUserSubdivisionsLoading: (state, loading) => {
      state.user_subdivision.loading = loading;
    },

    setEmailTemplates: (state, templateData) => {
      state.email_templates.links = templateData.meta.links;
      state.email_templates.data = templateData.data;
    },

    setEmailTemplatesLoading: (state, loading) => {
      state.email_templates.loading = loading;
    },
  },
};

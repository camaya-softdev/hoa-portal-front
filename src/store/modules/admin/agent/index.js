import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    agent: {
      loading: false,
      links: [],
      data: [],
    },
    currentAgent: {
      loading: false,
      data: {},
    },
  },

  actions: {
    addAgent({}, agent) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .post("/api/admin/agent/", agent)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editAgent({}, agent) {
      axiosClient.get('/sanctum/csrf-cookie/')
      return axiosClient
        .put(`/api/admin/agent/${agent.id}/`, agent)
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
        .put(`/api/admin/agent/change/status/${id}/`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getAgents({ commit }, {url = 1} = {}) {
      commit("setAgentsLoading", true);
      url = `/api/admin/agent/?page=${Number(url)}/`
      return axiosClient.get(url).then((res) => {
        commit("setAgentsLoading", false);
        commit("setAgents", res.data);
        return res;
      });
    },

    getSearchAgents({commit},link){
      let url = ''
      url = `/api/admin/agent/search/data/?find=${link.data}&page=${link.label}/`
      return axiosClient.get(url).then((res) => {
        commit("setAgents", res.data);
        return res;
      });
    },

    getAgent({ commit }, id) {
      commit("setCurrentAgentLoading", true);
      return axiosClient
        .get(`/api/admin/agent/${id}/`)
        .then((res) => {
          commit("setCurrentAgent", res.data);
          commit("setCurrentAgentLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentAgentLoading", false);
          throw err;
        });
    },
    deleteAgent({}, id) {
      return axiosClient.delete(`/api/admin/agent/${id}/`);
    },
  },
  mutations: {
    setCurrentAgent: (state, agentData) => {
      state.currentAgent.data = agentData;
    },

    setCurrentAgentLoading: (state, loading) => {
      state.currentAgent.loading = loading;
    },

    setAgents: (state, agentData) => {
      state.agent.links = agentData.meta.links;
      state.agent.data = agentData.data;
    },

    setAgentsLoading: (state, loading) => {
      state.agent.loading = loading;
    },
  },
};

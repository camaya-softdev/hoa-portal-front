import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    designee: {
      loading: false,
      links: [],
      data: [],
    },
    currentDesignee: {
      loading: false,
      data: {},
    },

  },

  actions: {
    addDesignee({}, designee) {
      return axiosClient
        .post("/api/admin/member/designee/",designee)
        .then((res) => {
          commit("setAddDesignee",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editDesignee({}, designee) {
      return axiosClient
        .put(`/api/admin/member/designee/${designee.id}/`, designee)
        .then((res) => {
          commit("setEditDesignee",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getDesignees({ commit }, data) {
      commit("setDesigneesLoading", true);
      let url='';
      url = `/api/admin/member/user/designee/${data}/`
      return axiosClient.get(url).then((res) => {
        commit("setDesigneesLoading", false);
        commit("setDesignees", res.data);
        return res;
      });
    },


    getDesignee({ commit }, id) {
      commit("setCurrentDesigneeLoading", true);
      return axiosClient
        .get(`/api/admin/member/designee/${id}/`)
        .then((res) => {
          commit("setCurrentDesignee", res.data);
          commit("setCurrentDesigneeLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentDesigneeLoading", false);
          throw err;
        });
    },

    deleteFee({}, id) {
      return axiosClient.delete(`/api/admin/member/designee/${id}/`);
    },
  },
  mutations: {
    setAddDesignee:(state,designeeData)=>{
      state.designee.data.push(designeeData);
    },
    setEditDesignee:(state,designeeData)=>{
      let designees = state.designee.data;
      const update_obj = designee.findIndex((obj=>obj.id == designeeData.data.id));
      designees[update_obj] = {...designeeData.data}
    },
    setCurrentDesignee: (state, designeeData) => {
      state.currentDesignee.data = designeeData;
    },

    setCurrentDesigneeLoading: (state, loading) => {
      state.currentDesignee.loading = loading;
    },

    setDesignees: (state, designeeData) => {
      state.designee.links = designeeData.meta.links;
      state.designee.data = designeeData.data;
    },

    setDesigneesLoading: (state, loading) => {
      state.designee.loading = loading;
    },

  },
};

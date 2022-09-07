import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    dues_fees: {
      loading: false,
      links: [],
      data: [],
    },
    due_subdivision_lot:{
      loading:false,
      links:[],
      data:[]
    }
  },

  actions: {
    getDueFees({ commit }, {url = 1}={}) {
      commit("setDueFeesLoading", true);
      url = `/api/admin/duefee/?page=${Number(url)}`
      return axiosClient.get(url).then((res) => {
        commit("setDueFeesLoading", false);
        commit("setDueFees", res.data);
        return res;
      });
    },

    getDueSubdivisionLot({ commit }, id) {
      commit("setDueSubdivisionLotLoading", true);
      return axiosClient
        .get(`/api/admin/due/subdivision/lot/${id}/`)
        .then((res) => {
          commit("setDueSubdivisionLot", res.data);
          commit("setDueSubdivisionLotLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setDueSubdivisionLotLoading", false);
          throw err;
        });
    },
    getSearchDueFees({commit},link){
      let url = ''

      url = `/api/admin/duefee/search/data/?find=${link.data}&page=${link.label}`
      return axiosClient.get(url).then((res) => {
        commit("setDueFees", res.data);
        return res;
      });
    },

  },
  mutations: {

    setDueFees: (state, dues_feesData) => {
      state.dues_fees.links = dues_feesData.meta.links;
      state.dues_fees.data = dues_feesData.data;
    },
    setDueFeesLoading: (state, loading) => {
      state.dues_fees.loading = loading;
    },
    setDueSubdivisionLot: (state, due_subdivision_lotData) => {
      // state.due_subdivision_lot.links = due_subdivision_lotData.meta.links;
      // let item = {...due_subdivision_lotData.data.item}
      // console.log(item)
      state.due_subdivision_lot.data = due_subdivision_lotData.data;
    },
    setDueSubdivisionLotLoading: (state, loading) => {
      state.due_subdivision_lot.loading = loading;
    },
  },
};

import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    rfid: {
      loading: false,
      links: [],
      meta:[],
      data: [],
    },
    currentRFID: {
      loading: false,
      data: {},
    },
    cardEmail:{
      loading:false,
      data:[]
    }

  },

  actions: {
    addRFID({}, rfid) {
      return axiosClient
        .post("/api/admin/rfid/",rfid)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editRFID({}, rfid) {
      return axiosClient
        .put(`/api/admin/rfid/${rfid.id}/`, rfid)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getRFIDs({ commit }, {url = 1} = {}) {
      commit("setRFIDsLoading", true);
      url = `/api/admin/rfid/?page=${Number(url)}`
      return axiosClient.get(url).then((res) => {
        commit("setRFIDsLoading", false);
        commit("setRFIDs", res.data);
        return res;
      });
    },

    getSearchRFIDs({commit},link){
      let url = ''
      console.log(link)
      console.log(link.label)
      url = `/api/admin/rfid/search/data/?find=${link.data}&page=${link.label}`
      return axiosClient.get(url).then((res) => {
        commit("setRFIDs", res.data);
        return res;
      });
    },

    getShowEmail({commit}){
      commit("setShowEmailLoading",true);
      return axiosClient.get("/api/admin/rfid/show/email/").then((res)=>{
        commit("setShowEmailLoading",false);
        commit("setShowEmail",res.data);
        return res;
      })
    },

    getRFID({ commit }, id) {
      commit("setCurrentRFIDLoading", true);
      return axiosClient
        .get(`/api/admin/rfid/${id}/`)
        .then((res) => {
          commit("setCurrentRFID", res.data);
          commit("setCurrentRFIDLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentRFIDLoading", false);
          throw err;
        });
    },

    deleteRFID({}, id) {
      return axiosClient.delete(`/api/admin/rfid/${id}/`);
    },

    exportRFID({}){
      return axiosClient.get('/api/admin/rfid/export/data/', {
        responseType: 'blob'
      }).then(response => {
        let fileUrl = window.URL.createObjectURL(response.data);
        let fileLink = document.createElement('a');

        fileLink.href = fileUrl;
        fileLink.setAttribute('download', 'rfid.xlsx');
        document.body.appendChild(fileLink)

        fileLink.click();
      }).catch(error => {
        console.log(error.response.data)
      })
    }
  },
  mutations: {
    setCurrentRFID: (state, rfidData) => {
      state.currentRFID.data = rfidData;

    },

    setCurrentRFIDLoading: (state, loading) => {
      state.currentRFID.loading = loading;
    },

    setRFIDs: (state, rfidData) => {
      state.rfid.links = rfidData.meta.links;
      state.rfid.meta = rfidData.meta
      state.rfid.data = rfidData.data;
    },

    setRFIDsLoading: (state, loading) => {
      state.rfid.loading = loading;
    },

    setShowEmailLoading:(state,loading)=>{
      state.cardEmail.loading = loading
    },

    setShowEmail:(state,emailData)=>{
      state.cardEmail.data = emailData.data
    }

  },
};

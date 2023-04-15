import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    document: {
      loading: false,
      links: [],
      data: [],
    },
    currentDocument: {
      loading: false,
      data: {},
    },

  },

  actions: {
    addDocument({commit}, document) {
      return axiosClient
        .post("/api/admin/document/",document)
        .then((res) => {
          commit("setAddDocument",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editDocument({commit}, document) {
      return axiosClient
        .put(`/api/admin/document/${document.id}/`, document)
        .then((res) => {
          commit("setEditDocument",res.data)
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getDocuments({ commit }, data) {
      commit("setDocumentsLoading", true);
      return axiosClient.get(`/api/admin/document/${data}/member/`).then((res) => {
        commit("setDocumentsLoading", false);
        commit("setDocuments", res.data);
        return res;
      });
    },
    getDocument({ commit }, id) {
      commit("setCurrentDocumentLoading", true);
      return axiosClient
        .get(`/api/admin/document/${id}/`)
        .then((res) => {
          commit("setCurrentDocument", res.data);
          commit("setCurrentDocumentLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentDocumentLoading", false);
          throw err;
        });
    },
    deleteFile({},id){
      return axiosClient.delete(`/api/admin/file/${id}/`)
    },
    deleteDocument({}, id) {
      return axiosClient.delete(`/api/admin/document/${id}`);
    },
  },
  mutations: {
    setAddDocument:(state,documentData)=>{
      state.document.data.push(documentData.data);
    },
    setEditDocument:(state,documentData)=>{
      let documents = state.document.data
      const update_obj = documents.findIndex((obj=>obj.id == documentData.data.id));
      documents[update_obj] = {...documentData.data}
    },
    setCurrentDocument: (state, documentData) => {
      state.currentDocument.data = documentData;
    },

    setCurrentDocumentLoading: (state, loading) => {
      state.currentDocument.loading = loading;
    },

    setDocuments: (state, documentData) => {
      state.document.links = documentData.meta.links;
      state.document.data = documentData.data;
    },

    setDocumentsLoading: (state, loading) => {
      state.document.loading = loading;
    },

  },
};

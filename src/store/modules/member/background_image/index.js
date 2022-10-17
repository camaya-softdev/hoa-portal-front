import axiosClient from "../../../../axios";

export default {
  namespaced: true,
  state: {
    backgroundImage: {
      loading: false,
      links: [],
      data: [],
    },
    currentBackgroundImage: {
      loading: false,
      data: {},
    },
  },

  actions: {
    addBackgroundImage({}, backgroundImage) {
      return axiosClient
        .post("/api/admin/background-image/", backgroundImage)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editBackgroundImage({}, backgroundImage) {
      return axiosClient
        .put(
          `/api/admin/background-image/${backgroundImage.id}/`,
          backgroundImage
        )
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getBackgroundImages({ commit }, { url = 1 } = {}) {
      commit("setBackgroundImagesLoading", true);
      url = `/api/admin/background-image/?page=${Number(url)}`;
      return axiosClient.get(url).then((res) => {
        commit("setBackgroundImagesLoading", false);
        commit("setBackgroundImages", res.data);
        return res;
      });
    },

    getSearchBackgroundImages({ commit }, link) {
      let url = "";
      url = `/api/admin/background/search/background-image/?find=${link.data}&page=${link.url}`;
      return axiosClient.get(url).then((res) => {
        commit("setBackgroundImages", res.data);
        return res;
      });
    },

    getBackgroundImage({ commit }, id) {
      commit("setCurrentBackgroundImageLoading", true);
      return axiosClient
        .get(`/api/admin/background-image/${id}/`)
        .then((res) => {
          commit("setCurrentBackgroundImage", res.data);
          commit("setCurrentBackgroundImageLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentBackgroundImageLoading", false);
          throw err;
        });
    },

    deleteBackgroundImage({}, id) {
      return axiosClient.delete(`/api/admin/template/background-image/${id}/`);
    },
  },
  mutations: {
    setCurrentBackgroundImage: (state, backgroundImageData) => {
      state.currentBackgroundImage.data = backgroundImageData;
    },

    setCurrentBackgroundImageLoading: (state, loading) => {
      state.currentBackgroundImage.loading = loading;
    },

    setBackgroundImages: (state, backgroundImageData) => {
      state.backgroundImage.links = backgroundImageData.meta.links;
      state.backgroundImage.data = backgroundImageData.data;
    },

    setBackgroundImagesLoading: (state, loading) => {
      state.backgroundImage.loading = loading;
    },
  },
};

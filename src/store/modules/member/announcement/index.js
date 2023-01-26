import axiosClient from "../../../../axios";


export default {
  namespaced: true,
  state: {
    announcement: {
      loading: false,
      links: [],
      data: [],
    },
    currentAnnouncement: {
      loading: false,
      data: {},
    },
    announcementFullStory: {
      loading:false,
      data:{}
    }

  },

  actions: {
    addAnnouncement({}, announcement) {
      return axiosClient
        .post("/api/admin/announcement/",announcement)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    editAnnouncement({}, announcement) {
      return axiosClient
        .put(`/api/admin/announcement/${announcement.id}/`, announcement)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },

    getAnnouncements({ commit }, {url=1}={}) {
      commit("setAnnouncementsLoading", true);
      url = `/api/admin/announcement/?page=${Number(url)}`
      return axiosClient.get(url).then((res) => {
        commit("setAnnouncementsLoading", false);
        commit("setAnnouncements", res.data);
        return res;
      });
    },
    getAnnouncement({ commit }, id) {
      commit("setCurrentAnnouncementLoading", true);
      return axiosClient
        .get(`/api/admin/announcement/${id}/`)
        .then((res) => {
          commit("setCurrentAnnouncement", res.data);
          commit("setCurrentAnnouncementLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentAnnouncementLoading", false);
          throw err;
        });
    },
    getSearchAnnouncements({commit},link){
      let url = ''
      url = `/api/admin/announcement/search/data/?find=${link.data}&page=${link.label}`
      return axiosClient.get(url).then((res) => {
        commit("setAnnouncements", res.data);
        return res;
      });
    },
    getAnnouncementFullStory({commit},id){
      commit("setAnnouncementsFullStoryLoading", true);
      return axiosClient
        .get(`/api/admin/announcement/fullstory/${id}/`)
        .then((res) => {
          commit("setAnnouncementsFullStory", res.data);
          commit("setAnnouncementsFullStoryLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setAnnouncementsFullStoryLoading", false);
          throw err;
        });
    },
    editAnnouncementFullStory({}, announcementFullStory) {
      return axiosClient
        .put(`/api/admin/announcement/updateStory/${announcementFullStory.id}/`, announcementFullStory)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    deleteAnnouncement({}, id) {
      return axiosClient.delete(`/api/admin/announcement/${id}/`);
    },
  },
  mutations: {
    setCurrentAnnouncement: (state, announcementData) => {
      state.currentAnnouncement.data = announcementData;
    },

    setCurrentAnnouncementLoading: (state, loading) => {
      state.currentAnnouncement.loading = loading;
    },

    setAnnouncements: (state, announcementData) => {
      state.announcement.links = announcementData.meta.links;
      state.announcement.data = announcementData.data;
    },

    setAnnouncementsLoading: (state, loading) => {
      state.announcement.loading = loading;
    },
    setAnnouncementsFullStoryLoading: (state, loading) => {
      state.announcementFullStory.loading = loading;
    },
    setAnnouncementsFullStory: (state, data) => {
      state.announcementFullStory.data = data;

    },

  },
};

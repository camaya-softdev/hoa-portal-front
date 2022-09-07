import axiosClient from "../../../../../axios";
export default {
  namespaced: true,
  actions: {
    changePassword({}, changePassword) {
      return axiosClient
        .put(`/api/admin/change_password/`, changePassword)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
  },
};

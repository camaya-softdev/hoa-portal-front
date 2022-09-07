import axiosClient from "../../../../axios";
export default {
  namespaced: true,
  actions: {
    generateNewPassword({}, changePassword) {
      return axiosClient
        .put(`/api/admin/user/change-password/${changePassword.id}/`, changePassword)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
  },
};
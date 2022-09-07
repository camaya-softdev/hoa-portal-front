import axiosClient from "../../../../axios";
export default {
  namespaced: true,
  actions: {
    editChangePassword({}, changePassword) {
      return axiosClient
        .post(`/api/member/changePassword/`, changePassword)
        .then((res) => {
          sessionStorage.removeItem("hoa_member_registered");
          sessionStorage.setItem("hoa_member_registered", 1);
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
  },
};

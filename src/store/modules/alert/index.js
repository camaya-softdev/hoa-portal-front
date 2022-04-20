import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  mutations: {
    notify: (state, { message, type, title }) => {
      ElNotification({
        title: title,
        message: message,
        type: type,
        offset: 200,
      });
      // state.notification.show = true;
      // state.notification.type = type;
      // state.notification.message = message;
      // setTimeout(() => {
      //   state.notification.show = false;
      // }, 3000)
    },
  },
};

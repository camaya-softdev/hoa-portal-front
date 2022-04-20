import { createStore } from "vuex";

import auth from "./modules/auth";
import member from "./modules/member";
import alert from "./modules/alert";
import user from "./modules/users";
import subdivision from "./modules/subdivision";

const store = createStore({
  modules: {
    auth: auth,
    member: member,
    alert:alert,
    user:user,
    subdivision:subdivision
  },
});

export default store;

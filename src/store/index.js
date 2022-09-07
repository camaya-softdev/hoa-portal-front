import { createStore } from "vuex";

import auth from "./modules/admin/auth";
import member from "./modules/admin/member";
import alert from "./modules/admin/alert";
import user from "./modules/admin/users";
import subdivision from "./modules/admin/subdivision";
import privilege from "./modules/admin/privilege";
import agent from "./modules/admin/agent";
import director from "./modules/admin/director";
import dues from "./modules/admin/dues";
import navigation from "./modules/admin/navigation";
import dashboard from "./modules/admin/Dashboard";
import forVerification from "./modules/admin/for_verfication";
import adminChangePassword from "./modules/admin/profile/change_password";
//hoa admin member management

import lot from "./modules/member/lot";
import reset from "./modules/member/reset";
import document from "./modules/member/document";
import announcement from "./modules/member/announcement";
import rfid from "./modules/member/rfid";
import payment_transaction from "./modules/member/payment_transaction";
import autogate from "./modules/member/autogate";
import template from "./modules/member/template";
import email from "./modules/member/email";
import communication from "./modules/member/communication";
import dues_fees from "./modules/member/dues_fees";
import fee from "./modules/member/fee";
import paymentHistory from "./modules/member/payment";
import temp_msg from "./modules/member/template_message";
import background_image from "./modules/member/background_image";

//hoa member/profile
import information from "./modules/hoamember/profile/information";
import notification from "./modules/hoamember/profile/notification";
import changePassword from "./modules/hoamember/profile/changePassword";
import designee from "./modules/hoamember/profile/Designee";
import profile from "./modules/hoamember/profile";

//hoamember/dashboard
import memberDashboard from "./modules/hoamember/dashboard";
import news from "./modules/hoamember/news";
import directorMember from "./modules/hoamember/director";
import event from "./modules/hoamember/event";
import showEvent from "./modules/hoamember/showEvent";
import showNews from "./modules/hoamember/showNews";
import billing from "./modules/hoamember/billing";
import payment from "./modules/hoamember/payment";
import billPayment from "./modules/hoamember/billPayment";
import paymentCash from "./modules/hoamember/paymentCash";

//helpers
import show_member_user from "./modules/helpers/show_member_user";
import generate_new_password from "./modules/admin/generate_new_password";

const store = createStore({
  modules: {
    auth: auth,
    member: member,
    alert: alert,
    user: user,
    subdivision: subdivision,
    privilege: privilege,
    agent: agent,
    director: director,
    dues: dues,
    lot: lot,
    reset: reset,
    document: document,
    announcement: announcement,
    rfid: rfid,
    payment_transaction: payment_transaction,
    autogate: autogate,
    template: template,
    email: email,
    communication: communication,
    dues_fees: dues_fees,
    fee: fee,
    navigation: navigation,
    dashboard: dashboard,
    paymentHistory: paymentHistory,
    temp_msg: temp_msg,
    background_image: background_image,
    generate_new_password: generate_new_password,
    forVerification: forVerification,
    adminChangePassword: adminChangePassword,

    information: information,
    notification: notification,
    changePassword: changePassword,
    designee: designee,
    profile: profile,

    memberDashboard: memberDashboard,
    news: news,
    directorMember: directorMember,
    event: event,
    showEvent: showEvent,
    showNews: showNews,
    billing: billing,
    payment: payment,
    billPayment: billPayment,
    paymentCash: paymentCash,

    //helpers
    show_member_user: show_member_user,
  },
});

export default store;

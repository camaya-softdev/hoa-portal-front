import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
//login routes
import Login from "../views/Login.vue";
//admin routes
import Dashboard from "../views/admin/Dashboard.vue";
import Subdivision from "../views/admin/AdminManagement/subdivision/Subdivision.vue";

import DefaultLayout from "../components/DefaultLayout.vue";
import BoardOfDirector from "../views/admin/AdminManagement/subdivision/directors.vue";
import MemberRegistration from "../views/admin/HoaManagement/registration/MemberRegistration.vue";
import MemberAddress from "../views/admin/HoaManagement/registration/MemberAddress.vue";
import PaymentHistory from "../views/admin/HoaManagement/registration/PaymentHistory.vue";
import UserManagement from "../views/admin/AdminManagement/usermanagement/UserManagement.vue";
import RFID from "../views/admin/HoaManagement/rfid/RFID.vue";
import Announcement from "../views/admin/HoaManagement/Announcement/Announcement.vue";
import AnnouncementTemplate from "../views/admin/HoaManagement/Announcement/Template.vue";
import MemberDues from "../views/admin/HoaManagement/Dues/MemberDues.vue";
import MemberFees from "../views/admin/HoaManagement/Dues/MemberFees.vue";
import Communication from "../views/admin/HoaManagement/Messages/Communication.vue";
import Template from "../views/admin/HoaManagement/Messages/Template.vue";
import Autogate from "../views/admin/HoaManagement/Autogate/Autogate.vue";
import AutogateTemplate from "../views/admin/HoaManagement/Autogate/AutogateTemplate.vue";
import MemberDocuments from "../views/admin/HoaManagement/registration/MemberDocuments.vue";
import Priveleges from "../views/admin/HoaManagement/rfid/Priveleges.vue";
import PrivilegeManagement from "../views/admin/AdminManagement/Privilege/PrivilegeManagement.vue";
import FullStory from "../views/admin/HoaManagement/Announcement/FullStory.vue";
import Fees from "../views/admin/AdminManagement/subdivision/Actions/Fees.vue";
import Agent from "../views/admin/AdminManagement/Agent/Agent.vue";
//member routes
import MemberLayout from "../components/MemberLayout.vue";
import Profile from "../views/member/profile/Profile.vue";
import Index from "../views/member/Index.vue";
import Billing from "../views/member/billing/Billing.vue";
import Payment from "../views/member/billing/Payment.vue";
const routes = [
  {
    path: "/dashboard",
    redirect: "/dashboard",
    name: "Dashboard",
    meta: { requiresAuth: true },
    component: DefaultLayout,

    children: [
      { path: "/dashboard", name: "Dashboard", component: Dashboard },
      { path: "/subdivision", name: "Subdivision", component: Subdivision },
      {
        path: "/board-of-directors",
        name: "BoardOfDirectors",
        component: BoardOfDirector,
      },
      {
        path: "/member-registration",
        name: "MemberRegistration",
        component: MemberRegistration,
      },
      {
        path: "/member-address",
        name: "MemberAddress",
        component: MemberAddress,
      },
      {
        path: "/member-payment-history",
        name: "MemberPaymentHistory",
        component: PaymentHistory,
      },
      {
        path: "/member-documents",
        name: "MemberDocuments",
        component: MemberDocuments,
      },
      {
        path: "/user-management",
        name: "UserManagement",
        component: UserManagement,
      },
      { path: "/rfid-registration", name: "RFIDRegistration", component: RFID },
      { path: "/announcement", name: "Announcement", component: Announcement },
      {
        path: "/preview/announcement-template",
        name: "AnnouncementTemplate",
        component: AnnouncementTemplate,
      },
      { path: "/member-dues", name: "MemberDues", component: MemberDues },
      { path: "/member-fees", name: "MemberFees", component: MemberFees },
      { path: "/messages", name: "Messages", component: Communication },
      {
        path: "/create-message-template",
        name: "MessageTemplate",
        component: Template,
      },
      { path: "/autogate", name: "Autogate", component: Autogate },
      {
        path: "/create-autogate-template",
        name: "AutogateTemplate",
        component: AutogateTemplate,
      },
      { path: "/billing", name: "Billing", component: Billing },
      {
        path: "/privilege/management",
        name: "PrivilegeManagement",
        component: PrivilegeManagement,
      },
      { path: "/full-story", name: "FullStory", component: FullStory },
      { path: "/privileges", name: "Priveleges", component: Priveleges },
      { path: "/subdivision-fees", name: "Fees", component: Fees },
      { path: "/sales-agent", name: "SalesAgent", component: Agent },
    ],
  },
  {
    path: "/",
    redirect: "/home",
    component: MemberLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "/home", name: "Home", component: Index },
      { path: "/billing", name: "Billing", component: Billing },
      { path: "/payment", name: "Payment", component: Payment },
    ],
  },
  {
    path: "/profile",
    meta: { requiresAuth: true },
    name: "Profile",
    component: Profile,

  },

  {
    path: "/login",
    meta: { isGuest: true },
    name: "Login",
    component: Login,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.auth.user.token) {
    next({ name: "Login" });
  } else if (store.state.auth.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;

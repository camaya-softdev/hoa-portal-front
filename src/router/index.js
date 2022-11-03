import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Login from "../views/Login.vue";
import ResetPassword from "../views/ResetPassword.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import MemberLayout from "../components/MemberLayout.vue";
import Profile from "../views/member/profile/Profile.vue";

const routes = [
  {
    path: "/dashboard",
    redirect: "/dashboard",
    name: "Dashboard",
    meta: { requiresAuth: true },
    component: DefaultLayout,

    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/admin/Dashboard.vue"),
      },
      {
        path: "/subdivision",
        name: "Subdivision",
        component: () =>
          import("../views/admin/AdminManagement/subdivision/Subdivision.vue"),
      },
      {
        path: "/board-of-director/:id/:name",
        name: "BoardOfDirectors",
        component: () =>
          import("../views/admin/AdminManagement/subdivision/Directors.vue"),
      },
      {
        path: "/member-registration",
        name: "MemberRegistration",
        component: () =>
          import(
            "../views/admin/HoaManagement/registration/MemberRegistration.vue"
          ),
      },
      {
        path: "/member-address/:email/:id",
        name: "MemberAddress",
        component: () =>
          import("../views/admin/HoaManagement/registration/MemberAddress.vue"),
      },
      {
        path: "/member-payment-history/:email/:id",
        name: "MemberPaymentHistory",
        component: () =>
          import(
            "../views/admin/HoaManagement/registration/PaymentHistory.vue"
          ),
      },
      {
        path: "/member-documents/:id",
        name: "MemberDocuments",
        component: () =>
          import(
            "../views/admin/HoaManagement/registration/MemberDocuments.vue"
          ),
      },
      {
        path: "/add/member-documents/:documentEmail/:userId",
        name: "AddMemberDocuments",
        component: () =>
          import(
            "../views/admin/HoaManagement/registration/Actions/AddMemberDocuments.vue"
          ),
      },
      {
        path: "/edit/member-documents/:userId/:documentId",
        name: "EditMemberDocuments",
        component: () =>
          import(
            "../views/admin/HoaManagement/registration/Actions/EditMemberDocuments.vue"
          ),
      },
      {
        path: "/user-management",
        name: "UserManagement",
        component: () =>
          import(
            "../views/admin/AdminManagement/usermanagement/UserManagement.vue"
          ),
      },
      {
        path: "/rfid-registration",
        name: "RFIDRegistration",
        component: () => import("../views/admin/HoaManagement/rfid/RFID.vue"),
      },
      {
        path: "/announcement",
        name: "Announcement",
        component: () =>
          import("../views/admin/HoaManagement/Announcement/Announcement.vue"),
      },
      {
        path: "/preview/announcement-template",
        name: "AnnouncementTemplate",
        component: () =>
          import("../views/admin/HoaManagement/Announcement/Template.vue"),
      },
      {
        path: "/member-dues_fees",
        name: "MemberDues",
        component: () =>
          import("../views/admin/HoaManagement/Dues/MemberDues.vue"),
      },
      {
        path: "/member-fees/:id/:name/:address",
        name: "MemberFees",
        component: () =>
          import("../views/admin/HoaManagement/Dues/MemberFees.vue"),
      },
      {
        path: "/messages",
        name: "Messages",
        component: () =>
          import("../views/admin/HoaManagement/Messages/Communication.vue"),
      },
      {
        path: "/create-template-template",
        name: "MessageTemplate",
        component: () =>
          import("../views/admin/HoaManagement/Messages/Template.vue"),
      },
      {
        path: "/autogate",
        name: "Autogate",
        component: () =>
          import("../views/admin/HoaManagement/Autogate/Autogate.vue"),
      },
      {
        path: "/create-autogate-template",
        name: "AutogateTemplate",
        component: () =>
          import("../views/admin/HoaManagement/Autogate/AutogateTemplate.vue"),
      },

      {
        path: "/background-image",
        name: "BackgroundImage",
        component: () =>
          import(
            "../views/admin/HoaManagement/background_image/BackgroundImage.vue"
          ),
      },
      {
        path: "/autogate-template-message/:id",
        name: "TemplateMessage",
        component: () =>
          import(
            "../views/admin/HoaManagement/template_message/TemplateMessage.vue"
          ),
      },
      {
        path: "/billing",
        name: "Billing",
        component: () =>
          import(
            "../views/admin/HoaManagement/registration/MemberDocuments.vue"
          ),
      },
      {
        path: "/privilege/management",
        name: "PrivilegeManagement",
        component: () =>
          import(
            "../views/admin/AdminManagement/Privilege/PrivilegeManagement.vue"
          ),
      },
      {
        path: "/full-story/:id",
        name: "FullStory",
        component: () =>
          import("../views/admin/HoaManagement/Announcement/FullStory.vue"),
      },
      {
        path: "/privileges/:id/:name/:load",
        name: "Priveleges",
        component: () =>
          import("../views/admin/HoaManagement/rfid/Priveleges.vue"),
      },
      {
        path: "/subdivision-dues_fees/:id/:name",
        name: "Fees",
        component: () =>
          import("../views/admin/AdminManagement/subdivision/Dues.vue"),
      },
      {
        path: "/sales-agent",
        name: "SalesAgent",
        component: () =>
          import("../views/admin/AdminManagement/Agent/Agent.vue"),
      },
      {
        path:"/privacy-policy",
        name:"PrivacyPolicy",
        component:()=>
          import("../views/member/reminders/PrivacyPolicy.vue")
      },
      {
        path:"/disclaimer",
        name:"Disclaimer",
        component:()=>
          import("../views/member/reminders/Disclaimer.vue")
      }
    ],
  },
  {
    path: "/",
    redirect: "/home",
    component: MemberLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("../views/member/Index.vue"),
      },
      {
        path: "/billing",
        name: "Billing",
        component: () => import("../views/member/billing/Billing.vue"),
      },
      {
        path: "/payment/:id",
        name: "Payment",
        component: () => import("../views/member/billing/Payment.vue"),
      },
    ],
  },
  {
    path: "/profile",
    meta: { requiresAuth: true },
    name: "Profile",
    component: () => import("../views/member/profile/Profile.vue"),
  },

  {
    path: "/login",
    meta: { isGuest: true },
    name: "Login",
    component: Login,
  },

  {
    path: "/reset-password/:token",
    name: "ResetPassword",
    component: ResetPassword,
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

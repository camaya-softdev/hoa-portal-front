<template>
  <div
    v-if="profileLoading"
    v-loading.fullscreen.lock="profileLoading"
    element-loading-text="Fetching Data..."
  ></div>
  <div class="w-screen" v-else>
    <header class="bg-white shadow opacity-80">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h3 class="font-bold text-red-700 text-center">
          NOTICE: COMPLETE THE REGISTRATION FORM BELOW TO PROCEED
        </h3>
        <p class="text-center text-sm text-gray-700 mt-2">
          Thank you and Welcome to {{ data.subdivision_name }}
        </p>
      </div>
    </header>
    <main class="w-screen" style="backdrop-filter: blur(5px)">
      <div class="max-w-7xl mx-auto py-6 sm:px-7 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <!--personal information -->
          <PersonalInformation />
          <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
              <div class="border-t border-gray-200" />
            </div>
          </div>
          <!-- Designee -->
          <Designee />

          <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
              <div class="border-t border-gray-200" />
            </div>
          </div>
          <!-- Notifications -->
          <Notification />
        </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200" />
          </div>
          <!-- change password -->
          <ChangePassword />
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200" />
          </div>
        </div>
        <!-- /End replace -->
        <div class="bg-gray-100 px-4 py-3 text-right sm:px-6 mt-10 opacity-80">
          <a
            type="button"
            href="/"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import PersonalInformation from "./actions/PersonalInformation.vue";
import Designee from "./actions/Designee.vue";
import Notification from "./actions/Notifications.vue";
import ChangePassword from "./actions/ChangePassword.vue";
import store from "../../../store";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
// if (parseInt(store.state.auth.user.hoa_member_registered) === 1) {
//   router.push({
//     name:'Home'
//   })
// }
if (
  parseInt(store.state.auth.user.hoa_admin) === 1 &&
  parseInt(store.state.auth.user.hoa_member) === 0
) {
  store.commit("alert/notify", {
    title: "Unathourized",
    type: "error",
    message: "You are Hoa Admin and not registered as Hoa Member",
  });
  router.push({
    name: "Dashboard",
  });
}

store.dispatch("profile/getProfiles");
const data = computed(() => store.state.profile.profile.data);
const profileLoading = computed(() => store.state.profile.profile.loading);
</script>

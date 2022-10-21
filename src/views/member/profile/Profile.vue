<template>
  <div
    v-if="profileLoading"
    v-loading.fullscreen.lock="profileLoading"
    element-loading-text="Fetching Data..."
  ></div>

  <div class="w-screen" v-else>
    <main class="w-screen">
      <!-- style="backdrop-filter: blur(2.5px)" -->
      <div class="max-w-7xl mx-auto py-6 sm:px-7 lg:px-8">
        <div class="px-4 py-6 sm:px-0">

          <h3 class="font-bold text-red-700 text-center">
          NOTICE: COMPLETE THE REGISTRATION FORM BELOW TO PROCEED
          </h3>
          <p class="text-center text-sm text-gray-700 mt-2 mb-12">
            Thank you and welcome to {{ data.subdivision_name }}!
          </p>

          <!--personal information -->
          <PersonalInformation />
          <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
              <div class="border-t border-gray-200"></div>
            </div>
          </div>

          <!-- Designee -->
          <Designee />
          <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
              <div class="border-t border-gray-200"></div>
            </div>
          </div>

          <!-- Notifications -->
          <Notification />
          <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
              <div class="border-t border-gray-200"></div>
            </div>
            
          </div>

          <!-- change password -->
          <ChangePassword />
          <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
              <div class="border-t border-gray-200"></div>
            </div>
          </div>

          <div class="text-right mt-8">
            <a type="button" class="group inline-flex items-center justify-center rounded-full py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-yellow-700 hover:bg-yellow-700 hover:text-white active:bg-white active:text-yellow-900 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105 shadow-xl shadow-slate-900/10" href="/">
              <span class="mr-2">Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </a>
          </div>

        </div>

        <!-- /End replace -->

        <!-- <div class="bg-gray-100 px-4 py-3 text-right sm:px-6 mt-10 opacity-80">
          <a
            type="button"
            href="/"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Next
          </a>
        </div> -->

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

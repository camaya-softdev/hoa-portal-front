<template>
  <div
    v-if="navigationLoading"
    v-loading.fullscreen.lock="navigationLoading"
    element-loading-text="Fetching Data..."
  ></div>
  <div v-else class="flex h-full flex-col">
    <header class="py-5">
      <Disclosure as="nav" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="hidden md:block flex-shrink-0">
                <router-link :to="{ name: 'Home' }">
                  <img
                    class="w-auto ml-2"
                    style="height: 5rem"
                    src="/logo/camayacoast.webp"
                    alt="Camaya Coast"
                  />
                </router-link>
              </div>
              <div class="md:hidden flex-shrink-0">
                <router-link :to="{ name: 'Home' }">
                  <img
                    class="w-auto"
                    style="height: 3.5rem"
                    src="/logo/camayacoast.webp"
                    alt="Camaya Coast"
                  />
                </router-link>
              </div>
            </div>

            <!-- desktop view -->
            <div class="hidden md:block">
              <div class="m-0 p-0 text-sm text-right" style="color: gray">
                {{ dateNow + ' ' +timeDate }}
              </div>
              <div class="ml-4 flex items-center">
                <router-link
                  class="group inline-flex items-center justify-center"
                  style="font-size: 1.3rem"
                  :to="{ name: 'Home' }"
                  >HOA<span style="color: #ca8a04"
                    ><strong>PORTAL</strong></span
                  ></router-link
                >
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Profile Page"
                  placement="bottom"
                >
                  <router-link
                    :to="{ name: 'Profile' }"
                    :class="[
                      active ? 'text-black' : '',
                      'block px-4 py-2 text-sm text-black',
                    ]"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </router-link>
                </el-tooltip>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Change Lot Page"
                  placement="bottom"
                >
                  <router-link
                    :to="{ name: 'PickLot' }"
                    :class="[
                      active ? 'text-black' : '',
                      'block px-4 py-2 text-sm text-black',
                    ]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                      />
                    </svg>
                  </router-link>
                </el-tooltip>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="Logout"
                  placement="bottom"
                >
                  <DisclosureButton
                    v-slot="{ active }"
                    @click="logout"
                    as="a"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                  </DisclosureButton>
                </el-tooltip>
              </div>
            </div>

            <!-- mobile view -->
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="relative z-10 inline-flex items-center justify-center p-2 rounded-md hover:text-gray focus:outline-none gap-x-3 md:gap-x-5"
              >
                <text
                  class="group inline-flex items-center justify-center"
                  style="font-size: 1.3rem"
                  >HOA<span style="color: #ca8a04"
                    ><strong>PORTAL</strong></span
                  ></text
                >
                <MenuIcon
                  v-if="!open"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
                <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel class="-mr-1 md:hidden px-5">
          <div
            class="fixed inset-0 bg-slate-300/50 opacity-100"
            aria-hidden="true"
          ></div>
          <div
            class="px-5 pt-2 pb-3 space-y-1 sm:px-3 inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 opacity-100 scale-100"
          >
            <router-link
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :to="{ name: item.to }"
              :class="[
                item.current
                  ? 'text-black'
                  : 'text-black hover:text-yellow-700 hover:bg-white',
                'block px-3 py-2 rounded-md text-base font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</router-link
            >
            <router-link
              as="a"
              :to="{ name: 'Profile' }"
              class="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-yellow-700 hover:bg-white"
              >Profile
            </router-link>
            <DisclosureButton
              @click="logout"
              as="a"
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-yellow-700 hover:bg-white"
              >Sign Out
            </DisclosureButton>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </header>

    <div class="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center text-3xl font-medium leading-none">
        Hey, {{ user.data.hoa_member_name }}!
      </div>
      <div class="mt-3">
        <p class="inline-flex items-center justify-center py-2 px-4 text-sm">
          <router-link :to="{ name: 'Home' }"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="stroke-yellow-600 w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              /></svg
          ></router-link>
          <span class="ml-1">{{ user.data.subdivision_name }}</span>
          <span>
            <router-link
              class="ml-3 group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-yellow-600 text-white hover:bg-yellow-600 hover:text-white active:bg-yellow-600 active:text-slate-300 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105"
              :to="{ name: 'Billing' }"
            >
              <span class="">View Billing</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </router-link>
          </span>
        </p>
      </div>
    </div>
    <AutoLogout v-if="user"></AutoLogout>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import { format } from "date-fns";
import AutoLogout from "./AutoLogout.vue";
import Footer from "./Footer.vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex";
import { computed, ref, watchEffect, watch } from "vue";
import { useRouter } from "vue-router";

const user = "";
const navigation = [
  { name: "Home", to: "Home", current: false },
  { name: "Billing", to: "Billing", current: false },
];
const userNavigation = [
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const getCurrentTime = () => format(new Date(), "h:mm:ss a");
let timeDate = ref(getCurrentTime());
let dateNow = ref(format(new Date(), 'yyyy-MM-dd'));
export default {
  components: {
    Disclosure,
    Footer,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcon,
    XIcon,
    AutoLogout,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    // if (parseInt(store.state.auth.user.hoa_member_registered) !== 1) {
    //   store.commit("alert/notify", {
    //     title: "ATTENTION",
    //     type: "warning",
    //     message: "Complete all fields in profile first before you proceed",
    //   });
    //   router.push({
    //     name: "Profile",
    //   });
    // }
    store.dispatch("navigation/getUser");

    watch(
      () => store.state.navigation.member.data,
      (newValue, oldValue) => {
        console.log(newValue);
        if (parseInt(newValue.data.lot_default) === 0) {
          router.push({ name: "PickLot" });
        }
      }
    );

    function logout() {
      store.dispatch("auth/logout").then(() => {
        router.push({
          name: "Login",
        });
      });
    }

    if (
      parseInt(store.state.auth.user.hoa_admin) === 1 &&
      parseInt(store.state.auth.user.hoa_member) === 0
    ) {
      store.commit("alert/notify", {
        title: "Unauthorized",
        type: "error",
        message: "You are HOA Admin and not registered as HOA Member",
      });
      router.push({
        name: "Dashboard",
      });
    }

    function runningClock() {

      timeDate.value = getCurrentTime();
    }
    watchEffect((onInvalidate) => {
      const timer = setInterval(() => runningClock(), 1000);

      onInvalidate(() => {
        clearInterval(timer);
      });
    });

    return {
      user: computed(() => store.state.navigation.member.data),
      navigationLoading: computed(() => store.state.navigation.member.loading),
      navigation,
      userNavigation,
      timeDate,
      dateNow,
      logout,
    };
  },
};
</script>

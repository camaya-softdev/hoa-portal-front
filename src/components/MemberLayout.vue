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
                    style="height: 5rem;"
                    src="/logo/camayacoast.webp"
                    alt="Camaya Coast"
                  />
                </router-link>
              </div>
              <div class="md:hidden flex-shrink-0">
                <router-link :to="{ name: 'Home' }">
                  <img
                    class="w-auto"
                    style="height: 3.5rem;"
                    src="/logo/camayacoast.webp"
                    alt="Camaya Coast"
                  />
                </router-link>
              </div>
              <!-- <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="{ name: item.to }"
                    :class="[
                      item.current
                        ? 'text-black'
                        : 'text-black hover:text-yellow-700 hover:bg-whitesmoke',
                      'px-3 py-2 rounded-md text-base',
                    ]"
                    :aria-current="item.current ? 'page' : undefined"
                    >{{ item.name }}</router-link
                  >
                </div>
              </div> -->
            </div>

            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-">
                <!-- Profile dropdown -->
                <!-- <Menu as="div" class="ml-3 relative">
                  <div>
                    <MenuButton
                      class="max-w-xs bg-orange-900 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-900 focus:ring-white"
                    >
                      <span class="sr-only">Open user menu</span>
                      <div class="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div class="mx-3">
                        <div
                          class="text-left text-base font-medium leading-none text-white"
                        >
                          {{ user.data.hoa_member_name }}
                        </div>

                        <div
                          class="text-left text-sm leading-none text-white" style="line-height: 1rem;"
                        >
                          {{ user.data.subdivision_name }}
                        </div>
                        <div class="text-sm font-medium leading-none text-gray-400">
                          {{ user.data.email }}
                        </div>
                        <div
                          class="text-left text-sm leading-none text-white"
                        >
                          {{ displayClock() }}
                        </div>
                      </div>
                    </MenuButton>
                  </div>
                  
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <MenuItem v-slot="{ active }">
                        <router-link
                          :to="{ name: 'Profile' }"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          ]"
                          >Profile</router-link
                        >
                      </MenuItem>
                      <MenuItem @click="logout" v-slot="{ active }">
                        <a
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          ]"
                          >Sign Out</a
                        >
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu> -->
                <a class="group inline-flex items-center justify-center" style="font-size: 1.3rem;" href="/Home">HOA<span style="color:#CA8A04;"><strong>PORTAL</strong></span></a>
                <router-link
                  :to="{ name: 'Profile' }"
                  :class="[
                    active ? 'text-black' : '',
                    'block px-4 py-2 text-sm text-black',
                  ]"
                  ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                </router-link>
                <DisclosureButton v-slot="{ active }"
                  @click="logout"
                  as="a"
                  href="#"
                  ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>

                </DisclosureButton>
              </div>
            </div>

            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="relative z-10 inline-flex items-center justify-center p-2 rounded-md hover:text-gray focus:outline-none gap-x-3 md:gap-x-5">
                <text class="group inline-flex items-center justify-center" style="font-size: 1.3rem;">HOA<span style="color:#CA8A04;"><strong>PORTAL</strong></span></text>
                <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>

          </div>
        </div>

        <DisclosurePanel class="-mr-1 md:hidden px-5">
            <div class="fixed inset-0 bg-slate-300/50 opacity-100" aria-hidden="true"></div>
            <div class="px-5 pt-2 pb-3 space-y-1 sm:px-3 inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 opacity-100 scale-100">
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

          <!-- <div class="px-5 pb-3">
            <hr class="m-2 border-t border-gray">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">
                  {{ user.data.hoa_member_name }}
                </div>
                <div class="text-left text-base font-medium leading-none text-white">
                  {{ user.data.subdivision_name }}
                </div>
                <div class="text-sm font-medium leading-none text-gray-400">
                  {{ user.data.email }}
                </div>

                <div class="text-left text-base font-medium leading-none text-white">
                  {{ displayClock() }}
                </div>
              </div>
            </div>
            <div class="mt-3 px-2 space-y-1">
              <router-link
                as="a"
                :to="{ name: 'Profile' }"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-orange-600"
                >Profile</router-link
              >
              <DisclosureButton
                @click="logout"
                as="a"
                href="#"
                class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-orange-700"
                >Sign Out</DisclosureButton
              >
            </div>
          </div> -->

        </DisclosurePanel>
      
      </Disclosure>

    </header>

    <div class="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center text-3xl font-medium leading-none">
        Hey, {{ user.data.hoa_member_name }}!
      </div>

      <!-- <div class="text-sm font-medium leading-none">
        {{ user.data.email }}
      </div>

      <div class="text-left text-base leading-none" style="line-height: 1.5rem;">
        {{ user.data.subdivision_name }}
      </div>

      <div class="text-left text-sm leading-none">
        {{ displayClock() }}
      </div> -->

      <div class="mt-3">
          <p class="inline-flex items-center justify-center py-2 px-4 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-yellow-600 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
            <span class="ml-1">{{ user.data.subdivision_name }}</span>

          <span>
            
            <!-- <a class="ml-3 group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-yellow-600 ring-yellow-600 text-yellow-600 hover:text-yellow-600 hover:ring-yellow-500 active:bg-yellow-500 active:text-white focus-visible:outline-yellow-600 focus-visible:ring-yellow-600" href="/Billing">
              <span class="mr-3">View Billing</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </a> -->

            <a class="ml-3 group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-yellow-600 text-white hover:bg-yellow-600 hover:text-white active:bg-yellow-600 active:text-slate-300 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105" href="/Billing">
              <span class="">View Billing</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </a>

          </span>
        </p>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import moment from "moment";
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
import { computed } from "vue";
import { useRouter } from "vue-router";
import store from "../store";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", to: "Home", current: false },
  { name: "Billing", to: "Billing", current: false },
];
const userNavigation = [
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcon,
    XIcon,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    if (parseInt(store.state.auth.user.hoa_member_registered) !== 1) {
      store.commit("alert/notify", {
        title: "ATTENTION",
        type: "warning",
        message: "Complete all fields in profile first before you proceed",
      });
      router.push({
        name: "Profile",
      });
    }
    function logout() {
      store.dispatch("auth/logout").then(() => {
        router.push({
          name: "Login",
        });
      });
    }
    store.dispatch("navigation/getUser");
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

    function displayClock() {
      let display = moment().format("DD MMM YYYY, h:mm A");
      setTimeout(displayClock, 1000);
      return display;
    }
    return {
      user: computed(() => store.state.navigation.member.data),
      navigationLoading: computed(() => store.state.navigation.member.loading),
      navigation,
      userNavigation,
      displayClock,
      logout,
    };
  },
};
</script>

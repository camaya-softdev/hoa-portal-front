<template>
  <div
    v-if="navigationLoading"
    v-loading.fullscreen.lock="navigationLoading"
    element-loading-text="Fetching Data..."
  ></div>
  <div v-else class="flex h-full flex-col">
    <Disclosure as="nav" class="bg-none py-5" v-slot="{ open }" style="z-index: 1000">
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

          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4 space-y-4">
              <router-link
                :to="{ name: 'Dashboard' }"
                :class="[
                  navigation.current
                    ? 'text-yellow-600'
                    : 'hover:bg-none hover:text-yellow-700',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                :aria-current="navigation.current ? 'page' : undefined"
                >Dashboard
              </router-link>
              <Menu as="div" class="relative">
                <MenuButton
                  :class="[
                    navigation.current
                      ? 'text-yellow-600'
                      : 'hover:bg-none hover:text-yellow-700',
                    'px-3 py-2 rounded-md text-sm font-medium',
                  ]"
                  :aria-current="navigation.current ? 'page' : undefined"
                  >Admin Management
                </MenuButton>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="opacity-100 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem
                      v-for="item in adminManagement"
                      :key="item.name"
                      v-slot="{ active }"
                    >
                      <router-link
                        :to="{ name: item.to }"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >{{ item.name }}
                      </router-link>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>

              <Menu as="div" class="ml-3 relative">
                <MenuButton
                  :class="[
                    navigation.current
                      ? 'text-yellow-600'
                      : 'hover:bg-none hover:text-yellow-700',
                    'px-3 py-2 rounded-md text-sm font-medium',
                  ]"
                  :aria-current="navigation.current ? 'page' : undefined"
                  >Member Management
                </MenuButton>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="opacity-100 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem
                      v-for="item in hoaManagement"
                      :key="item.name"
                      v-slot="{ active }"
                    >
                      <router-link
                        :to="{ name: item.to }"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >{{ item.name }}
                      </router-link>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>

          <div class="hidden md:block">
            <div class="m-0 p-0 text-sm text-right" style="color: gray">
              {{ timeDate }}
            </div>

            <div class="ml-4 flex items-center">
              <a
                class="group inline-flex items-center justify-center"
                style="font-size: 1.3rem"
                href="/Dashboard"
                >HOA<span style="color: #ca8a04"><strong>PORTAL</strong></span></a
              >

              <DisclosureButton
                v-slot="{ active }"
                @click="logout"
                as="a"
                href="#"
                class="ml-4"
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
            </div>
          </div>

          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative z-10 inline-flex items-center justify-center p-2 rounded-md hover:text-gray focus:outline-none gap-x-3 md:gap-x-5"
            >
              <text
                class="group inline-flex items-center justify-center"
                style="font-size: 1.3rem"
                >HOA<span style="color: #ca8a04"><strong>PORTAL</strong></span></text
              >
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="-mr-1 md:hidden px-5">
        <div class="fixed inset-0 bg-slate-300/50 opacity-100" aria-hidden="true"></div>
        <div
          class="px-5 pt-2 pb-3 space-y-1 sm:px-3 inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 opacity-100 scale-100"
        >
          <DisclosureButton
            as="a"
            class="cursor-pointer"
            :to="{ name: 'Dashboard' }"
            :class="[
              navigation.current
                ? 'text-black'
                : 'text-black hover:text-yellow-700 hover:bg-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            :aria-current="navigation.current ? 'page' : undefined"
            >Dashboard
          </DisclosureButton>

          <DisclosureButton
            class="cursor-pointer"
            :class="[
              navigation.current
                ? 'text-black'
                : 'text-black hover:text-yellow-700 hover:bg-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
          >
            <Menu>
              <MenuButton
                :class="[
                  navigation.current
                    ? 'text-black'
                    : 'text-black hover:text-yellow-700 hover:bg-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                :aria-current="navigation.current ? 'page' : undefined"
                >Admin Management
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none text-left"
                >
                  <MenuItem
                    v-for="item in adminManagement"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <router-link
                      :to="{ name: item.to }"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-black',
                      ]"
                      >{{ item.name }}
                    </router-link>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </DisclosureButton>

          <DisclosureButton
            class="cursor-pointer"
            :class="[
              navigation.current
                ? 'text-black'
                : 'text-black hover:text-yellow-700 hover:bg-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
          >
            <Menu as="div">
              <MenuButton
                :class="[
                  navigation.current
                    ? 'text-black'
                    : 'text-black hover:text-yellow-700 hover:bg-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                :aria-current="navigation.current ? 'page' : undefined"
                >Member Management
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none text-left"
                >
                  <MenuItem
                    v-for="item in hoaManagement"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <router-link
                      :to="{ name: item.to }"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-black',
                      ]"
                      >{{ item.name }}
                    </router-link>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </DisclosureButton>

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
    <AutoLogout v-if="user"></AutoLogout>
    <router-view></router-view>
    <change-password
      :changePassword="changePassword"
      @closeModal="changePassword = false"
    ></change-password>
  </div>
</template>

<script>
import { format } from "date-fns";
import AutoLogout from "./AutoLogout.vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import moment from "moment";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import ChangePassword from "../views/admin/Dashboard/Profile/ChangePassword.vue";
import { useRouter } from "vue-router";
import { now } from "lodash";

let user = "";
let changePassword = ref(false);
let navigationLoading = "";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Admin Management", href: "#", current: false },
  { name: "Member Management", href: "#", current: false },
];
const getCurrentTime = () => format(new Date(), "h:mm:ss a");
let timeDate = ref(getCurrentTime());
export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
    ChangePassword,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    store.dispatch("navigation/getUser");
    let hoaManagement = [];
    let adminManagement = [];

    if (store.state.auth.user.hoa_access_type === "2") {
      adminManagement = [
        { name: "Subdivision Management", to: "Subdivision" },
        { name: "User Management", to: "UserManagement" },
        { name: "RFID Registration", to: "RFIDRegistration" },
      ];
    } else {
      adminManagement = [
        { name: "Subdivision Management", to: "Subdivision" },
        { name: "User Management", to: "UserManagement" },
        { name: "RFID Registration", to: "RFIDRegistration" },
        { name: "Privilege Management", to: "PrivilegeManagement" },
        { name: "Sales Agent", to: "SalesAgent" },
      ];
    }

    hoaManagement = [
      { name: "Member Registration", to: "MemberRegistration" },
      { name: "Dues & Fees", to: "MemberDues" },
      { name: "Event", to: "Announcement" },
      { name: "Email Management", to: "Messages" },
      { name: "Autogate", to: "Autogate" },
    ];
    if (parseInt(store.state.auth.user.hoa_admin) !== 1) {
      store.commit("alert/notify", {
        title: "Unauthorized",
        type: "error",
        message: "You are HOA Member and not registered as HOA Admin",
      });
      router.push({
        name: "Home",
      });
    }

    function logout() {
      store.dispatch("auth/logout").then(() => {
        router.push({
          name: "Login",
        });
      });
    }

    function runningClock() {
      timeDate.value = getCurrentTime();
    }
    setInterval(() => runningClock(), 1000);

    return {
      changePassword,
      ChangePassword,
      user: computed(() => store.state.navigation.member.data),
      navigationLoading: computed(() => store.state.navigation.member.loading),
      adminManagement,
      hoaManagement,
      navigation,
      timeDate,
      logout,
    };
  },
};
</script>

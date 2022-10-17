<template>
  <div
    v-if="navigationLoading"
    v-loading.fullscreen.lock="navigationLoading"
    element-loading-text="Fetching Data..."
  ></div>
  <div v-else class="min-h-full">
    <Disclosure as="nav" class="bg-orange-900" v-slot="{ open }">
      <div class="max-w-8xl mx-auto sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <router-link :to="{ name: 'Dashboard' }">
                <img class="h-16 w-auto" src="/logo/hoa-logo.webp" alt="HOA Portal" />
              </router-link>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link
                  :to="{ name: 'Dashboard' }"
                  :class="[
                    navigation.current
                      ? 'bg-orange-900 text-white'
                      : 'text-gray-300 hover:bg-orange-600 hover:text-white',
                    'px-3 py-2 rounded-md text-sm font-medium',
                  ]"
                  :aria-current="navigation.current ? 'page' : undefined"
                  >Dashboard
                </router-link>
                <Menu as="div" class="ml-3 relative">
                  <MenuButton
                    :class="[
                      navigation.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-orange-600 hover:text-white',
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
                      class="opacity-80 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-orange-600 hover:text-white',
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
                      class="opacity-80 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                <!-- <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a> -->
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- <button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button> -->

              <!-- Profile dropdown -->
              <Menu as="div" class="ml-3 relative">
                <div>
                  <MenuButton
                    class="max-w-xs bg-orange-900 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-800 focus:ring-white"
                  >
                    <span class="sr-only">Open user menu</span>
                    <div class="mx-3">
                      <div
                        class="text-left text-base font-medium leading-none text-white"
                      >
                        {{ user.data.hoa_member_name }}
                      </div>
                      <div class="text-sm font-medium leading-none text-gray-400">
                        {{ user.data.email }}
                      </div>
                      <div
                        v-if="user.data.subdivision_name"
                        class="text-left text-base font-medium leading-none text-white"
                      >
                        {{ user.data.subdivision_name }}
                      </div>
                    </div>
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
                    <MenuItem @click="changePassword = true" v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >Change Password</a
                      >
                    </MenuItem>

                    <MenuItem @click="logout" v-slot="{ active }">
                      <a
                        href="#"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >Sign Out</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="bg-orange-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-900 focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <DisclosureButton
            as="a"
            class="cursor-pointer"
            :to="{ name: 'Dashboard' }"
            :class="[
              navigation.current
                ? 'bg-orange-900 text-white'
                : 'text-gray-300 hover:bg-orange-600 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
            :aria-current="navigation.current ? 'page' : undefined"
            >Dashboard
          </DisclosureButton>
          <DisclosureButton
            class="cursor-pointer"
            :class="[
              navigation.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-orange-600 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
          >
            <Menu as="div">
              <MenuButton
                :class="[
                  navigation.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-orange-600 hover:text-white',
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
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
          </DisclosureButton>
          <DisclosureButton
            class="cursor-pointer"
            :class="[
              navigation.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-orange-600 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            ]"
          >
            <Menu as="div">
              <MenuButton
                :class="[
                  navigation.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-orange-600 hover:text-white',
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
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
          </DisclosureButton>
        </div>
        <div class="pt-4 pb-3 border-t border-orange-600">
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
              <div class="text-sm font-medium leading-none text-gray-400">
                {{ user.data.email }}
              </div>
              <div
                v-if="user.data.subdivision_name"
                class="text-left text-base font-medium leading-none text-white"
              >
                {{ user.data.subdivision_name }}
              </div>
            </div>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <DisclosureButton
              @click="changePassword = true"
              as="a"
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-orange-700"
              >Change Password
            </DisclosureButton>

            <DisclosureButton
              @click="logout"
              as="a"
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-orange-700"
              >Sign Out
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <router-view></router-view>
    <change-password
      :changePassword="changePassword"
      @closeModal="changePassword = false"
    ></change-password>
  </div>
</template>

<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
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

    return {
      changePassword,
      ChangePassword,
      user: computed(() => store.state.navigation.member.data),
      navigationLoading: computed(() => store.state.navigation.member.loading),
      adminManagement,
      hoaManagement,
      navigation,
      logout,
    };
  },
};
</script>

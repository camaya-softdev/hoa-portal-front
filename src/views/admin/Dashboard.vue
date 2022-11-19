<template>
  <header class="flex justify-content-center">
    <div class="max-w-7xl mx-auto">
      <!-- <h1 class="text-3xl font-bold text-gray-900 text-center">Dashboard</h1> -->
      <!-- <img
        src="/logo/camayacoast.webp"
        class="text-center object-cover h-48 w-86"
        alt=""
      /> -->
    </div>
  </header>

  <main>
    <div
      v-if="dashboardLoading"
      v-loading.fullscreen.lock="dashboardLoading"
      element-loading-text="Fetching Data..."
    ></div>

    <div v-else class="flex h-full flex-col">
      <!-- Replace with your content -->
      <div class="px-4 py-12 sm:px-0">
        <div class="w-full min-h-screen">
          <div class="text-center text-3xl font-medium leading-none">
            Hey, {{ user.data.hoa_member_name }}!
          </div>

          <div class="mt-3 text-center">
            <p
              class="inline-flex items-center justify-center py-2 px-4 text-sm"
            >
              <svg
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <span class="ml-1">{{ user.data.email }}</span>
              <span>
                <a
                  class="ml-3 group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-yellow-600 text-white hover:bg-yellow-600 hover:text-white active:bg-yellow-600 active:text-slate-300 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105"
                  href="#"
                  @click="changePassword = true"
                >
                  <span class="">Change Password</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="ml-2 w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </a>
              </span>
            </p>
          </div>

          <div class="flex flex-wrap justify-center">
            <!-- <div
              class="flex flex-col bg-white opacity-90 rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52"
            >
              <UserIcon class="h-20 m-6 fill-yellow-500 stroke-yellow-500"></UserIcon>

              <h2 class="text-center px-2 pb-5 font-bold">{{ data.user }}</h2>
              <a hre="#" class="bg-yellow-600 font-bold text-white p-3 text-center"
                >Total Number of HOA Members</a
              >
            </div> -->

            <div class="lg:mx-48 sm:mx-auto">
              <ul
                role="list"
                class="mt-5 mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-4 text-center align-items-center"
              >
                <li>
                  <ul
                    role="list"
                    class="flex flex-col gap-y-6 sm:gap-y-8 transform transition duration-500 hover:scale-105"
                  >
                    <li>
                      <figure
                        class="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"
                      >
                        <blockquote class="relative">
                          <p
                            class="text-center text-4xl font-medium leading-none tracking-tight text-yellow-600"
                          >
                            {{ data.user }}
                          </p>
                        </blockquote>
                        <figcaption
                          class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6"
                        >
                          <div>
                            <div class="font-display text-sm text-slate-900">
                              Total Number of HOA Members
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </li>
                  </ul>
                </li>

                <li>
                  <ul
                    role="list"
                    class="flex flex-col gap-y-6 sm:gap-y-8 transform transition duration-500 hover:scale-105"
                  >
                    <li>
                      <figure
                        class="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"
                      >
                        <blockquote class="relative">
                          <p
                            class="text-center text-4xl font-medium leading-none tracking-tight text-yellow-600"
                          >
                            {{ data.userPerMonth }}
                          </p>
                        </blockquote>
                        <figcaption
                          class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6"
                        >
                          <div>
                            <div class="font-display text-sm text-slate-900">
                              Total Number of New Members ({{ data.month }})
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </li>
                  </ul>
                </li>

                <li>
                  <ul
                    role="list"
                    class="flex flex-col gap-y-6 sm:gap-y-8 transform transition duration-500 hover:scale-105"
                  >
                    <li>
                      <figure
                        class="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"
                      >
                        <blockquote class="relative">
                          <p
                            class="text-center text-4xl font-medium leading-none tracking-tight text-yellow-600"
                          >
                            {{ data.card }}
                          </p>
                        </blockquote>
                        <figcaption
                          class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6"
                        >
                          <div>
                            <div class="font-display text-sm text-slate-900">
                              Total Number of RFID Card Holders
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </li>
                  </ul>
                </li>

                <li>
                  <ul
                    role="list"
                    class="flex flex-col gap-y-6 sm:gap-y-8 transform transition duration-500 hover:scale-105"
                  >
                    <li>
                      <figure
                        class="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"
                      >
                        <blockquote class="relative">
                          <p
                            class="text-center text-4xl font-medium leading-none tracking-tight text-yellow-600"
                          >
                            {{ data.billing }}
                          </p>
                        </blockquote>
                        <figcaption
                          class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6"
                        >
                          <div>
                            <div class="font-display text-sm text-slate-900">
                              Member Payments for Verification
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <!-- desktop view -->
          <div class="px-48 hidden md:block">
            <Table class="mt-3 opacity-90">
              <template v-slot:table>
                <thead class="border-gray-50 border-b-2">
                  <tr>
                    <th class="p-3 text-sm tracking-wide text-center">
                      Issued RFID Cards
                    </th>

                    <th class="p-3 text-sm tracking-wide text-center">
                      HOA Members
                    </th>
                    <!-- <th class="p-3 text-sm font-semibold tracking-wide text-center">
                      Member Dues and Fees
                    </th> -->
                    <th class="p-3 text-sm tracking-wide text-center">
                      Payment Transactions
                    </th>
                    <th class="p-3 text-sm tracking-wide text-center">
                      Privilege Transactions
                    </th>
                    <th
                      v-if="user.data.hoa_access_type === 1"
                      class="p-3 text-sm tracking-wide text-center"
                    >
                      Payment Logs
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr class="bg-gray-50">
                    <td class="text-sm text-gray-700 text-center">
                      <a
                        @click="exportRFID"
                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                        ><span class="flex justify-center text-center">
                          <PrinterIcon class="h-6 w-6"></PrinterIcon>
                        </span>
                      </a>
                    </td>
                    <td
                      class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                    >
                      <a
                        @click="exportUser"
                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                        ><span class="flex justify-center text-center">
                          <PrinterIcon class="h-6 w-6"></PrinterIcon>
                        </span>
                      </a>
                    </td>
                    <td
                      class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                    >
                      <a
                        @click="exportPaymentHistory"
                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                        ><span class="flex justify-center text-center">
                          <PrinterIcon class="h-6 w-6"></PrinterIcon>
                        </span>
                      </a>
                    </td>
                    <td
                      class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                    >
                      <a
                        @click="exportPrivilegeTransaction"
                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                        ><span class="flex justify-center text-center">
                          <PrinterIcon class="h-6 w-6"></PrinterIcon>
                        </span>
                      </a>
                    </td>
                    <td
                      v-if="user.data.hoa_access_type === 1"
                      class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                    >
                      <a
                        @click="exportPaymentLogs"
                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                        ><span class="flex justify-center text-center">
                          <PrinterIcon class="h-6 w-6"></PrinterIcon>
                        </span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </template>
            </Table>
          </div>

          <!-- mobile view -->
          <div class="pt-0 mt-0 px-4 md:hidden">
            <Table class="mt-3 opacity-90">
              <template v-slot:table>
                <thead class="border-gray-50 border-b-2">
                  <tr>
                    <th class="p-3 text-sm tracking-wide text-center">
                      Issued RFID Cards
                    </th>

                    <th class="p-3 text-sm tracking-wide text-center">
                      HOA Members
                    </th>
                    <!-- <th class="p-3 text-sm font-semibold tracking-wide text-center">
                      Member Dues and Fees
                    </th> -->
                    <th class="p-3 text-sm tracking-wide text-center">
                      Payment Transactions
                    </th>
                    <th class="p-3 text-sm tracking-wide text-center">
                      Privilege Transactions
                    </th>
                    <th
                      v-if="user.data.hoa_access_type === 1"
                      class="p-3 text-sm tracking-wide text-center"
                    >
                      Payment Logs
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr class="bg-gray-50">
                    <td class="text-sm text-gray-700 text-center">
                      <a
                        @click="exportRFID"
                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                        ><span class="flex justify-center text-center">
                          <PrinterIcon class="h-6 w-6"></PrinterIcon>
                        </span>
                      </a>
                    </td>
                    <td
                      class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                    >
                      <a
                        @click="exportUser"
                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                        ><span class="flex justify-center text-center">
                          <PrinterIcon class="h-6 w-6"></PrinterIcon>
                        </span>
                      </a>
                    </td>
                    <!-- <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <a
                        href="/billing"
                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                        ><span class="flex justify-center text-center">
                          <PrinterIcon class="h-6 w-6"></PrinterIcon>
                        </span>
                      </a>
                    </td> -->
                    <td
                      class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                    >
                      <a
                        @click="exportPaymentHistory"
                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                        ><span class="flex justify-center text-center">
                          <PrinterIcon class="h-6 w-6"></PrinterIcon>
                        </span>
                      </a>
                    </td>
                    <td
                      class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                    >
                      <a
                        @click="exportPrivilegeTransaction"
                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                        ><span class="flex justify-center text-center">
                          <PrinterIcon class="h-6 w-6"></PrinterIcon>
                        </span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </template>
            </Table>
          </div>

          <ForVerification />
        </div>
      </div>
      <!-- /End replace -->
    </div>
  </main>
  <change-password
    :changePassword="changePassword"
    @closeModal="changePassword = false"
  ></change-password>
</template>
<script>
import ChangePassword from "../admin/Dashboard/Profile/ChangePassword.vue";
import {
  UserIcon,
  TrendingUpIcon,
  CreditCardIcon,
  HomeIcon,
  PrinterIcon,
  ClipboardListIcon,
} from "@heroicons/vue/outline";
import Table from "../../components/Table.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import ForVerification from "./Dashboard/ForVerification/forVerification.vue";
let changePassword = ref(false);
export default {
  components: {
    UserIcon,
    TrendingUpIcon,
    CreditCardIcon,
    HomeIcon,
    Table,
    PrinterIcon,
    ClipboardListIcon,
    ForVerification,
    ChangePassword,
  },

  setup() {
    const store = useStore();
    function exportUser() {
      return store.dispatch("user/exportUser");
    }
    function exportRFID() {
      return store.dispatch("rfid/exportRFID");
    }
    function exportPrivilegeTransaction() {
      return store.dispatch("payment_transaction/exportPaymentTransaction");
    }
    function exportPaymentHistory() {
      return store.dispatch("paymentHistory/exportPayment");
    }
    function exportPaymentLogs(){
      return store.dispatch('payment_transaction/exportPaymentLogs');
    }
    store.dispatch("dashboard/getDashboard");
    return {
      data: computed(() => store.state.dashboard.dashboard.data),
      dashboardLoading: computed(() => store.state.dashboard.dashboard.loading),
      user: computed(() => store.state.navigation.member.data),
      UserIcon,
      exportRFID,
      exportUser,
      exportPrivilegeTransaction,
      exportPaymentLogs,
      exportPaymentHistory,
      Table,
      PrinterIcon,
      TrendingUpIcon,
      CreditCardIcon,
      HomeIcon,
      ClipboardListIcon,
      ChangePassword,
      changePassword,
    };
  },
};
</script>

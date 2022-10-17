<template>
  <header class="flex justify-content-center">
    <div class="max-w-7xl mx-auto">
      <!-- <h1 class="text-3xl font-bold text-gray-900 text-center">Dashboard</h1> -->
      <img
        src="/logo/camayacoast.webp"
        class="text-center object-cover h-48 w-86"
        alt=""
      />
    </div>
  </header>
  <main>
    <div
      v-if="dashboardLoading"
      v-loading.fullscreen.lock="dashboardLoading"
      element-loading-text="Fetching Data..."
    ></div>
    <div v-else class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <div class="w-full min-h-screen">
          <div class="flex flex-wrap justify-center">
            <div
              class="flex flex-col bg-white opacity-90 rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52"
            >
              <UserIcon class="h-20 m-6 fill-yellow-500 stroke-yellow-500"></UserIcon>

              <h2 class="text-center px-2 pb-5 font-bold">{{ data.user }}</h2>
              <a hre="#" class="bg-yellow-600 font-bold text-white p-3 text-center"
                >Total Number of HOA Members</a
              >
            </div>
            <div
              class="flex flex-col bg-white opacity-90 rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52"
            >
              <TrendingUpIcon
                class="h-20 m-6 fill-yellow-500 stroke-yellow-500"
              ></TrendingUpIcon>

              <h2 class="text-center px-2 pb-5 font-bold">
                {{ data.userPerMonth }}
              </h2>
              <a hre="#" class="bg-yellow-600 font-bold text-white p-3 text-center"
                >Total Number of New Members ({{ data.month }})</a
              >
            </div>
            <div
              class="flex flex-col bg-white opacity-90 rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52"
            >
              <CreditCardIcon class="h-20 m-6 stroke-yellow-500"></CreditCardIcon>

              <h2 class="text-center px-2 pb-5 font-bold">{{ data.card }}</h2>
              <a hre="#" class="bg-yellow-600 font-bold text-white p-3 text-center"
                >Total Number of RFID Card Holders</a
              >
            </div>
            <div
              class="flex flex-col bg-white opacity-90 rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52"
            >
              <ClipboardListIcon class="h-20 m-6 stroke-yellow-500"></ClipboardListIcon>

              <h2 class="text-center px-2 pb-5 font-bold">
                {{ data.billing }}
              </h2>
              <a hre="#" class="bg-yellow-600 font-bold text-white p-3 text-center"
                >Member Payments for Verification</a
              >
            </div>
          </div>

          <div class="px-4 py-6">
            <!-- <h1
              class="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-5 mt-5"
            >
              Reports
            </h1> -->
            <Table class="mt-3 opacity-90">
              <template v-slot:table>
                <thead class="border-gray-50 border-b-2">
                  <tr>
                    <th class="p-3 text-sm font-semibold tracking-wide text-center">
                      Issued RFID Cards
                    </th>

                    <th class="p-3 text-sm font-semibold tracking-wide text-center">
                      HOA Members
                    </th>
                    <!--                    <th-->
                    <!--                      class="p-3 text-sm font-semibold tracking-wide text-center"-->
                    <!--                    >-->
                    <!--                      Member Dues and Fees-->
                    <!--                    </th>-->
                    <th class="p-3 text-sm font-semibold tracking-wide text-center">
                      Payment Transactions
                    </th>
                    <th class="p-3 text-sm font-semibold tracking-wide text-center">
                      Privilege Transactions
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
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <a
                        @click="exportUser"
                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                        ><span class="flex justify-center text-center">
                          <PrinterIcon class="h-6 w-6"></PrinterIcon>
                        </span>
                      </a>
                    </td>
                    <!--                    <td-->
                    <!--                      class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"-->
                    <!--                    >-->
                    <!--                      <a-->
                    <!--                        href="/billing"-->
                    <!--                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"-->
                    <!--                        ><span class="flex justify-center text-center">-->
                    <!--                          <PrinterIcon class="h-6 w-6"></PrinterIcon>-->
                    <!--                        </span>-->
                    <!--                      </a>-->
                    <!--                    </td>-->
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                      <a
                        @click="exportPaymentHistory"
                        class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                        ><span class="flex justify-center text-center">
                          <PrinterIcon class="h-6 w-6"></PrinterIcon>
                        </span>
                      </a>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
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
</template>
<script>
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
import { computed } from "vue";
import ForVerification from "./Dashboard/ForVerification/forVerification.vue";

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
    store.dispatch("dashboard/getDashboard");
    return {
      data: computed(() => store.state.dashboard.dashboard.data),
      dashboardLoading: computed(() => store.state.dashboard.dashboard.loading),
      UserIcon,
      exportRFID,
      exportUser,
      exportPrivilegeTransaction,
      exportPaymentHistory,
      Table,
      PrinterIcon,
      TrendingUpIcon,
      CreditCardIcon,
      HomeIcon,
      ClipboardListIcon,
    };
  },
};
</script>

<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 text-center">Dashboard</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <div class="w-full min-h-screen bg-blue-50">
          <div class="flex flex-wrap justify-center">
            <div
              class="flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52"
            >
              <UserIcon class="h-20 m-6"></UserIcon>

              <h2 class="text-center px-2 pb-5 font-bold">350</h2>
              <a
                hre="#"
                class="bg-blue-500 font-bold text-white p-3 text-center"
                >Total Number of HOA Members</a
              >
            </div>
            <div
              class="flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52"
            >
              <TrendingUpIcon class="h-20 m-6"></TrendingUpIcon>

              <h2 class="text-center px-2 pb-5 font-bold">50</h2>
              <a
                hre="#"
                class="bg-blue-500 font-bold text-white p-3 text-center"
                >Total Number of New Members (March)</a
              >
            </div>
            <div
              class="flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52"
            >
              <CreditCardIcon class="h-20 m-6"></CreditCardIcon>

              <h2 class="text-center px-2 pb-5 font-bold">50</h2>
              <a
                hre="#"
                class="bg-blue-500 font-bold text-white p-3 text-center"
                >Total Number of Privilege Card Holders</a
              >
            </div>
            <div
              class="flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52"
            >
              <ClipboardListIcon class="h-20 m-6"></ClipboardListIcon>

              <h2 class="text-center px-2 pb-5 font-bold">50</h2>
              <a
                hre="#"
                class="bg-blue-500 font-bold text-white p-3 text-center"
                >Member Payments for Verification</a
              >
            </div>
          </div>

          <div class="px-4 py-6">
            <h1
              class="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-5 mt-5"
            >
              Reports
            </h1>
            <Table class="mt-3">
              <template v-slot:table>
                <thead class="border-gray-50 border-b-2">
                  <tr>
                    <th
                      class="p-3 text-sm font-semibold tracking-wide text-center"
                    >
                      RFID
                    </th>

                    <th
                      class="p-3 text-sm font-semibold tracking-wide text-center"
                    >
                      HOA Members
                    </th>
                    <th
                      class="p-3 text-sm font-semibold tracking-wide text-center"
                    >
                      Member Dues and Fees
                    </th>
                    <th
                      class="p-3 text-sm font-semibold tracking-wide text-center"
                    >
                      Member Privileges
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr class="bg-gray-50">
                    <td class="text-sm text-gray-700 text-center">
                      <a
                        href="/billing"
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
                        href="/billing"
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
                        href="/billing"
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
                        href="/billing"
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
  ClipboardListIcon
} from "@heroicons/vue/outline";
import Table from "../../components/Table.vue";
export default {
  components: {
    UserIcon,
    TrendingUpIcon,
    CreditCardIcon,
    HomeIcon,
    Table,
    PrinterIcon,
    ClipboardListIcon
  },
  setup() {
    return {
      UserIcon,
      Table,
      PrinterIcon,
      TrendingUpIcon,
      CreditCardIcon,
      HomeIcon,
      ClipboardListIcon
    };
  },
};
</script>

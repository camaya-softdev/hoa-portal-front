<template>

  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <h1
        class="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-5"
      >
        Billing Statement
      </h1>
      <Statement />
      <div class="bg-gray-100 px-4 py-3 text-right sm:px-6">
        <a
          type="button"
          href="/payment"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Pay
        </a>
      </div>
      <h1
        class="text-2xl md:text-3xl font-semibold text-center text-gray-700 mt-5"
      >
        Payment History
      </h1>
      <Table class="mt-3">
        <template v-slot:table>
          <thead class="border-gray-50 border-b-2">
            <tr>
              <th class="p-3 text-sm font-semibold tracking-wide text-center">
                Bill Month
              </th>

              <th class="p-3 text-sm font-semibold tracking-wide text-center">
                Date Paid
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-center">
                Balance
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-center">
                Payment Status
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr class="bg-gray-50">
              <td class="text-sm text-gray-700 text-center">February 28 2022</td>
              <td
                class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
              >

              </td>
              <td
                class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
              >
                26,200
              </td>
              <td
                class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
              >
                Unpaid
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                <a
                  href="/billing"
                  class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                  >View Bill
                </a>
              </td>
            </tr>
            <tr class="bg-gray-50">
              <td class="text-sm text-gray-700 text-center">January 30 2022</td>
              <td
                class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
              >
                February 28, 2022
              </td>
              <td
                class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
              >
                20,600
              </td>
              <td
                class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
              >
                Unpaid
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                <a
                  href="/billing"
                  class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                  >View Bill
                </a>
              </td>
            </tr>
               <tr class="bg-gray-50">
              <td class="text-sm text-gray-700 text-center">December 30 2021</td>
              <td
                class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
              >
                January 13, 2021
              </td>
              <td
                class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
              >
                5,900
              </td>
              <td
                class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
              >
                Paid
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                <a
                  href="/billing"
                  class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                  >View Bill
                </a>
              </td>
            </tr>
          </tbody>
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup>
import Table from "../../../components/Table.vue";
import Statement from "./Statement.vue"
</script>

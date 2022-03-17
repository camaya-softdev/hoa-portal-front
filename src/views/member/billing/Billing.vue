<template>

  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <h1
        class="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-5"
      >
        Billing Statement
      </h1>
      <div class="border-4 border-dashed border-gray-200 rounded-lg h-80 mb-3">
        <div class="px-4 flex justify-center mt-10">
          <img src="../../../assets/soa.png" class="transform h-50 bg-blue-400 w-96 hover:bg-blue-600 transition duration-500 hover:scale-125">
        </div>
      </div>
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
              <td class="text-sm text-gray-700 text-center">March 10 2022</td>
              <td
                class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
              >
                March 15 2022
              </td>
              <td
                class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
              >
                2004
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
</script>

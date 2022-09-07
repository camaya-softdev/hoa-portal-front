<template>

  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <h1
        class="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-5"
      >
        Billing Statement
      </h1>
      <Statement/>

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
          <tr class="bg-gray-50" v-for="data in tableData" :key="data.id">
            <td class="text-sm text-gray-700 text-center">{{data.bill_month}}</td>
            <td
              class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
            >
              {{data.date_paid}}
            </td>
            <td
              class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
            >
              {{data.balance}}
            </td>
            <td
              class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
            >
              {{data.status}}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
              <a
                @click="getBillings(data.id)"
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
  import store from "../../../store";
  import {computed} from 'vue';

  store.dispatch('payment/getPayments')
  const tableData = computed(() => store.state.payment.payments.data)
  function getBillings(id) {
    store.dispatch('billing/getBillings',id)
  }
</script>

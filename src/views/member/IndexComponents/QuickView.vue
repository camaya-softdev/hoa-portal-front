<template>
  <p
    class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center"
  >
    Quick View
  </p>


  <Table class="mt-3">
    <template v-slot:table>
      <thead class="border-gray-50 border-b-2">
      <tr>
        <th class="p-3 text-sm font-semibold tracking-wide text-center">
          Privilege Load
        </th>

        <th class="p-3 text-sm font-semibold tracking-wide text-center">
          Outstanding Balance
        </th>
        <th class="p-3 text-sm font-semibold tracking-wide text-center">
          Due Date
        </th>

      </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
      <tr class="bg-gray-50">
        <td class="text-sm text-gray-700 text-center">{{tableData.card}}</td>
        <td
          class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
        >{{tableData.total_cost}}

        </td>
        <td
          class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
        >
          {{tableData.month}}
        </td>
      </tr>

      </tbody>
    </template>
  </Table>
</template>
<script setup>
  import store from "../../../store";
  import Table from "../../../components/Table.vue";

  import {computed} from "vue"

  const tableHeader = [
    {id: "1", name: "Privilege Load", prop: "card", width: "300"},
    {id: "2", name: "Hoa Balance Due", prop: "lot", width: "300"},
    {id: "3", name: "Due Date", prop: "type", width: "300"},
  ];

  store.dispatch('memberDashboard/getDashboard')
  const dashboardLoading = computed(()=>store.state.memberDashboard.dashboard.loading)
  const tableData = computed(() => store.state.memberDashboard.dashboard.data)
</script>

<template>
  <!-- <p
    class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-black sm:text-4xl text-center"
  >
    Quick View
  </p> -->

  <!-- <Table class="mt-3">
    <template v-slot:table>
      <thead class="border-gray-50 border-b-2">
        <tr>
          <th class="p-3 text-sm font-semibold tracking-wide text-center">
            Privilege Load
          </th>

          <th class="p-3 text-sm font-semibold tracking-wide text-center">
            Outstanding Balance
          </th>
          <th class="p-3 text-sm font-semibold tracking-wide text-center">Due Date</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr class="bg-gray-50">
          <td class="text-sm text-gray-700 text-center">{{ tableData.card }}</td>
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
            &#8369; {{ tableData.total_cost }}
          </td>
          <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
            {{ tableData.month }}
          </td>
        </tr>
      </tbody>
    </template>
  </Table> -->

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <ul role="list" class="mt-5 mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
      <li>
        <ul role="list" class="flex flex-col gap-y-6 sm:gap-y-8 transform transition duration-500 hover:scale-105">
          <li>
            <figure class="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                <blockquote class="relative">
                  <p class="text-center text-4xl font-medium leading-none tracking-tight text-yellow-600">500</p> 
                  <!-- {{ tableData.card }} -->
                </blockquote>
                <figcaption class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                  <div>
                    <div class="font-display text-base text-slate-900">Privilege Load</div>
                    <!-- <div class="mt-1 text-sm text-slate-500">Description</div> -->
                  </div>
                  <div class="overflow-hidden rounded-full bg-slate-50">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                    </svg> -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" opacity="25%">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                  </div>
                </figcaption>
              </figure>
          </li>
        </ul>
    </li>
    
    <li>
      <ul role="list" class="flex flex-col gap-y-6 sm:gap-y-8 transform transition duration-500 hover:scale-105">
        <li>
            <figure class="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                <blockquote class="relative">
                  <p class="text-center text-4xl font-medium leading-none tracking-tight text-yellow-600">&#8369; 9,500</p> 
                  <!-- &#8369; {{ tableData.total_cost }} -->
                </blockquote>
                <figcaption class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                  <div>
                    <div class="font-display text-base text-slate-900">Outstanding Balance</div>
                    <!-- <div class="mt-1 text-sm text-slate-500">Description</div> -->
                  </div>
                  <div class="overflow-hidden rounded-full bg-slate-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" opacity="25%">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  </div>
                </figcaption>
              </figure>
          </li>
      </ul>
    </li>
    
    <li>
      <ul role="list" class="flex flex-col gap-y-6 sm:gap-y-8 transform transition duration-500 hover:scale-105">
        <li>
            <figure class="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                <blockquote class="relative">
                  <p class="text-center text-4xl font-medium leading-none tracking-tight text-yellow-600">25 Nov 2022</p> 
                  <!-- {{ tableData.month }} -->
                </blockquote>
                <figcaption class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                  <div>
                    <div class="font-display text-base text-slate-900">Due Date</div>
                    <!-- <div class="mt-1 text-sm text-slate-500">Description</div> -->
                  </div>
                  <div class="overflow-hidden rounded-full bg-slate-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" opacity="25%">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                </figcaption>
              </figure>
          </li>
      </ul>
    </li>
  </ul>
</div>

</template>
<script setup>
import store from "../../../store";
import Table from "../../../components/Table.vue";

import { computed } from "vue";

const tableHeader = [
  { id: "1", name: "Privilege Load", prop: "card", width: "300" },
  { id: "2", name: "Hoa Balance Due", prop: "lot", width: "300" },
  { id: "3", name: "Due Date", prop: "type", width: "300" },
];

store.dispatch("memberDashboard/getDashboard");
const dashboardLoading = computed(() => store.state.memberDashboard.dashboard.loading);
const tableData = computed(() => store.state.memberDashboard.dashboard.data);
</script>

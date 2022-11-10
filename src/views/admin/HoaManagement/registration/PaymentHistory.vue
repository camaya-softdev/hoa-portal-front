<template>
  <page-component
    navTitle="Member Management"
    navContent="Member Registration"
    navLink="MemberRegistration"
    navChildContent="Member Payment Transaction"
    :navName="paymentTransactionEmail"
  >
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="ledger"
      >
        Generate Report
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="paymentHistoryLoading"
        v-loading.fullscreen.lock="paymentHistoryLoading"
        element-loading-text="Fetching Data..."
      ></div>
      <el-table
        v-else
        align="center"
        header-align="center"
        :data="filterTableData"
        style="width: 100%; overflow-x: auto"
        :flexible="true"
        table-layout="auto"
      >
        <el-table-column type="expand">
          <template #default="props">
            <div class="flex justify-center p-4">
              <div class="border-b border-gray-200 shadow">
                <table class="">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-2 text-xs text-gray-500">Date</th>
                      <th class="px-4 py-2 text-xs text-gray-500">Description</th>
                      <th class="px-4 py-2 text-xs text-gray-500">Amount</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    <tr
                    class="whitespace-nowrap"
                    v-for="data in props.row.billingSummary"
                  >
                    <td class="px-6 py-4 text-sm text-gray-500">
                      {{ data.date }}
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm text-gray-900">
                        {{ data.description }}
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm text-gray-500">&#8369; {{ data.amount }}</div>
                    </td>
                  </tr>
                    <!--end tr-->
                  </tbody>
           
                </table>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" labe="#" prop="id" />
        <el-table-column label="Subdivision" prop="subdivision_name"></el-table-column>
        <el-table-column label="Block Number" prop="block_number"></el-table-column>
        <el-table-column label="Lot Number" prop="lot_number"></el-table-column>
        <el-table-column label="Statement Number" prop="statement_number" />
        <el-table-column label="Bill Month" prop="bill_month" />
        <el-table-column label="Date Paid" prop="hoa_billing_date_paid" />
        <el-table-column label="Past Due" prop="hoa_billing_past_due" />
        <el-table-column label="Current Bill" prop="hoa_billing_total_cost" />
        <el-table-column label="Amount Paid" prop="hoa_billing_amount_paid" />
        <el-table-column label="Total Balances" prop="hoa_billing_total_balance" />
        <el-table-column label="Payment Status" prop="hoa_billing_status" />
        <el-table-column align="right" width="180" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchPaymentTransaction"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="180" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Download Invoice" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="PrinterIcon"
                  @click="downloadReports(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Download SOA" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="PrinterIcon"
                  @click="downloadSOA(scope.row)"
                ></el-button>
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6 opacity-80">
        <router-link
          :to="{ name: 'MemberRegistration' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
  <edit-transaction
    v-if="editId !== 0"
    :editId="editId"
    :edit-transaction="editTransaction"
    @closeModal="editTransaction = false"
    @editId="editId = 0"
  ></edit-transaction>
</template>
<script setup>
import { ref, computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import Pagination from "../../../../components/Pagination.vue";
import { PrinterIcon } from "@heroicons/vue/outline";
import EditTransaction from "./Actions/EditTransaction.vue";
import { useRoute } from "vue-router";
import store from "../../../../store";
import Table from "../../../../components/Table.vue";
import _ from "lodash";

const route = useRoute();
const paymentTransactionEmail = route.params.email;
let editTransaction = ref(false);
let editId = ref(0);

store.dispatch("paymentHistory/getPaymentHistories", {
  id: route.params.id,
  url: 1,
});


let tableData = computed(() => store.state.paymentHistory.paymentHistory);

const search = ref("");

let searchPaymentTransaction = _.debounce(function () {
  store
    .dispatch("paymentHistory/getSearchPaymentHistories", {
      id: route.params.id,
      data: search.value,
      label: 1,
    })
    .then(() => (tableData = computed(() => store.state.paymentHistory.paymentHistory)))
    .catch((err) => console.log(err));
}, 1000);

const filterTableData = computed(() => tableData.value.data);
const paymentHistoryLoading = computed(
  () => store.state.paymentHistory.paymentHistory.loading
);
function downloadReports(row) {
  store.dispatch("paymentHistory/getCurrentPaymentHistory", {
    userid: row.memberId,
    id: row.id,
    defaultNum: row.defaultNum,
  });

}

function downloadSOA(row) {
  store.dispatch("paymentHistory/generateSOA", {
    userid: row.memberId,
    id: row.id,
    defaultNum: row.defaultNum,
  });

}

function ledger() {
  store.dispatch("paymentHistory/getAllLedger", route.params.id);
}
async function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  if (search.value !== "") {
    await store.dispatch("paymentHistory/getSearchPaymentHistories", {
      id: route.params.id,
      data: search.value,
      label: Number(link.label),
    });
  } else {
    await store.dispatch("paymentHistory/getPaymentHistories", {
      id: route.params.id,
      url: link.label,
    });
  }
}

function deleteProperty() {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
  }
}
</script>
<style>
.my-header {
  background: blue !important;
  padding-left: 250px !important;
}
</style>

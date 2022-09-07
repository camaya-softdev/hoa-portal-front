<template>
  <page-component
    navTitle="Member Management"
    navContent="Member Registration"
    navLink="MemberRegistration"
    navChildContent="Member Payment Transaction"
    :navName="paymentTransactionEmail"
  >
    <template v-slot:buttons>
      <!-- <el-button class="button" type="text"
      >Generate Report
      </el-button
      > -->
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
        <el-table-column
          sortable
          v-for="header in tableHeader"
          :key="header.id"
          :type="header.type"
          :prop="header.prop"
          :label="header.name"
          :width="header.width"
        ></el-table-column>
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
              <el-tooltip content="Edit Transaction" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editModal(scope.row)"
                ></el-button>
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
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
import { Edit, Delete } from "@element-plus/icons-vue";
import EditTransaction from "./Actions/EditTransaction.vue";
import { useRoute } from "vue-router";
import store from "../../../../store";
import _ from "lodash";

const route = useRoute();
const paymentTransactionEmail = route.params.email;
let editTransaction = ref(false);
let editId = ref(0);

store.dispatch("paymentHistory/getPaymentHistories", {
  id: route.params.id,
  url: 1,
});

const tableHeader = [
  { id: "1", type: "index", name: "#", prop: "id" },
  { id: "2", name: "Statement Number", prop: "statement_number" },
  { id: "3", name: "Bill Month", prop: "bill_month" },
  { id: "4", name: "Date Paid", prop: "hoa_billing_date_paid" },
  { id: "5", name: "Past Due", prop: "past_due" },
  { id: "6", name: "Total Cost", prop: "total_cost" },
  { id: "7", name: "Amount Paid", prop: "amount_paid" },
  { id: "8", name: "Payment Status", prop: "hoa_billing_status" },
];

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
function editModal(row) {
  editId.value = row.id;
  editTransaction.value = true;
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

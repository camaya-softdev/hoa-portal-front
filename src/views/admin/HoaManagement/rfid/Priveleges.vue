<template>
  <page-component
    navTitle="Member Management"
    navContent="RFID Registration"
    navLink="RFIDRegistration"
    navChildContent="Privilege Transaction"
    :navName="privilegeName"
  >
    <template v-slot:buttons>
      <!--      <span>Felizardo Felizardo Cortez = 132</span>-->
      <!-- <el-button class="button" type="text" @click="addPrivilege = true"
        >Avail</el-button
      > -->
    </template>
    <template v-slot:content>
      <div
        v-if="transactionLoading"
        v-loading.fullscreen.lock="transactionLoading"
        element-loading-text="Fetching Data..."
      ></div>
      <el-table
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
              @keyup="searchTransaction"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="180" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Delete Fees" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deletePaymentTransaction(scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <router-link
          :to="{ name: 'RFIDRegistration' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>

        <button
          @click="addLoad = true"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Load
        </button>

        <button
          @click="addPrivilege = true"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Avail
        </button>
      </div>
    </template>
  </page-component>
  <add-privilege
    :add-privilege="addPrivilege"
    :cardID="cardID"
    :privilegeData="privilegeData"
    @closeModal="addPrivilege = false"
  ></add-privilege>
  <add-load :add-load="addLoad" :cardID="cardID" @closeModal="addLoad = false"></add-load>
</template>
<script setup>
import { ref, computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import Pagination from "../../../../components/Pagination.vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import AddPrivilege from "./Actions/AddPrivilege.vue";
import AddLoad from "./Actions/AddLoad.vue";
import { useRoute } from "vue-router";
import store from "../../../../store";
import _ from "lodash";

const addPrivilege = ref(false);
let addLoad = ref(false);
const route = useRoute();
let cardID = route.params.id;
const privilegeName = route.params.name;

const tableHeader = [
  { id: "0", type: "index", name: "#", prop: "id", width: "180" },
  {
    id: "1",
    name: "Transaction Name",
    prop: "hoa_privilege_transaction_name",
    width: "180",
  },
  {
    id: "2",
    name: "Description",
    prop: "hoa_privilege_transaction_desc",
    width: "300",
  },
  {
    id: "3",
    name: "Type",
    prop: "hoa_privilege_transaction_type",
    width: "180",
  },
  {
    id: "4",
    name: "Booking Number",
    prop: "hoa_privilege_booking_num",
    width: "180",
  },
  {
    id: "5",
    name: "Quantity",
    prop: "hoa_privilege_transaction_qty",
    width: "180",
  },
  {
    id: "6",
    name: "Cost",
    prop: "hoa_privilege_transaction_amount",
    width: "180",
  },
  { id: "7", name: "Timestamp", prop: "created_at", width: "180" },
];
store.dispatch("payment_transaction/getPaymentTransactions", { id: cardID });
store.dispatch("privilege/getPrivileges");
const privilegeData = computed(() => store.state.privilege.privilege.data);
let tableData = computed(() => store.state.payment_transaction.paymentTransaction);
const transactionLoading = computed(
  () => store.state.payment_transaction.paymentTransaction.loading
);
const search = ref("");

const filterTableData = computed(() => tableData.value.data);

let searchTransaction = _.debounce(function () {
  store
    .dispatch("payment_transaction/getSearchPaymentTransactions", {
      id: cardID,
      data: search.value,
      label: 1,
    })
    .then(
      () =>
        (tableData = computed(() => store.state.payment_transaction.paymentTransaction))
    )
    .catch((err) => console.log(err));
}, 1000);

async function deletePaymentTransaction(row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch(
        "payment_transaction/deletePaymentTransaction",
        row.id
      );
      if (res.status === 204 || res.status === 200) {
        await store.dispatch("payment_transaction/getPaymentTransactions");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The payment transaction data was successfully deleted",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}

async function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  if (search.value !== "") {
    await store.dispatch("payment_transaction/getSearchPaymentTransactions", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    await store.dispatch("payment_transaction/getPaymentTransactions", {
      url: link.label,
      id: route.params.id,
    });
  }
}
</script>

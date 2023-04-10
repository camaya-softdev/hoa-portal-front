<template>
  <page-component
    navTitle="Member Management"
    navContent="DUES & FEES"
    navLink="MemberDues"
    navChildContent="Other Fees"
    :navName="feeName"
    :navChildName="feeAddress"
  >
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addFees = true"
      >
        Add Other Fees
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="feesLoading"
        v-loading.fullscreen.lock="feesLoading"
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
        <el-table-column align="right" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchFee"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="180" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Edit Fees" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editModal(scope.row)"
                ></el-button>
              </el-tooltip>

              <el-tooltip content="Delete Fees" placement="bottom" effect="light">
                <!-- <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteFee(scope.row)"
                ></el-button
              > -->
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6 opacity-80">
        <router-link
          :to="{ name: 'MemberDues' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
  <add-other-fees
    :add-fees="addFees"
    :showSchedule="showSchedule"
    :lotId="lotId"
    @closeModal="addFees = false"
  ></add-other-fees>
  <edit-other-fees
    v-if="editId !== 0"
    :showSchedule="showSchedule"
    :editId="editId"
    @editId="editId = 0"
    :lotId="lotId"
    :edit-fees="editFees"
    @closeModal="editFees = false"
  ></edit-other-fees>
</template>
<script setup>
import { ref, computed } from "vue";

import { Edit, Delete } from "@element-plus/icons-vue";
import AddOtherFees from "./Actions/AddOtherFees.vue";
import EditOtherFees from "./Actions/EditOtherFees.vue";
import { useRoute } from "vue-router";
import store from "../../../../store";
import {debounce} from "lodash";

const addFees = ref(false);
const editFees = ref(false);
const route = useRoute();
let editId = ref(0);
const lotId = route.params.id;
const feeName = route.params.name;
const feeAddress = route.params.address;

const tableHeader = [
  { id: "0", type: "index", name: "#", prop: "id" },
  { id: "1", name: "Item", prop: "hoa_fees_item" },
  { id: "2", name: "Cost", prop: "hoa_fees_cost" },
  { id: "3", name: "Start Date", prop: "hoa_fees_start_date" },
  { id: "4", name: "End Date", prop: "hoa_fees_end_date" },
  { id: "5", name: "Payment Schedule", prop: "schedule" },
];
store.dispatch("fee/getFees", lotId);
store.dispatch("dues/getShowSchedule");
let tableData = computed(() => store.state.fee.fee);
const showSchedule = computed(() => store.state.dues.duesSchedule.data);
const search = ref("");

const filterTableData = computed(() => tableData.value.data);
const feesLoading = computed(() => store.state.fee.fee.loading);

function editModal(row) {
  editId.value = row.id;
  editFees.value = true;
}

let searchFee = debounce(function () {
  store
    .dispatch("fee/getSearchFees", { data: search.value, url: 1 })
    .then(() => (tableData = computed(() => store.state.fee.fee)))
    .catch((err) => console.log(err));
}, 1000);

let label=1;
async function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  if (search.value !== "") {
    await store.dispatch("fee/getSearchFees", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    if(link.label == 'Next &raquo;'){
      await store.dispatch("fee/getFees", { url: Number(1 + label) });
      label++;
      return;
    }
    if(link.label == '&laquo; Previous'){
      await store.dispatch("fee/getFees", { url: Number(label - 1) });
      label--;
      return;
    }
    await store.dispatch("fee/getFees", { data: lotId, url: link.label });
  }
}

async function deleteFee(row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("fee/deleteFee", row.id);
      if (res.status === 204) {
        await store.dispatch("fee/getFees", { data: lotId, url: 1 });
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The other fees data was successfully deleted",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
</script>

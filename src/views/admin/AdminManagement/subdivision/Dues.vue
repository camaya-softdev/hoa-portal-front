<template>
  <page-component
    navTitle="Admin Management"
    navContent="Subdivision Management"
    navLink="Subdivision"
    navChildContent="Subdivision Dues"
    :navName="duesName"
  >
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addFees = true"
        >Add Subdivision Dues</el-button
      >
    </template>
    <template v-slot:content>
      <div
        v-if="duesLoading"
        v-loading.fullscreen.lock="duesLoading"
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
        :row-class-name="tableRowClassName"
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
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="180" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip
                v-if="scope.row.hoa_subd_dues_status === 1"
                content="Disabled Subdivision Dues"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="warning"
                  :icon="Lock"
                  @click="changeStatus(scope.$index, scope.row)"
                ></el-button
              ></el-tooltip>
              <el-tooltip
                v-else
                content="Enabled Subdivision Dues"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="warning"
                  :icon="Unlock"
                  @click="changeStatus(scope.$index, scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <router-link
          :to="{ name: 'Subdivision' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
  <add-fees
    :add-fees="addFees"
    :due-id="dueId"
    :unitData="unitData"
    :show-schedule="showSchedule"
    @closeModal="addFees = false"
  ></add-fees>
  <edit-fees
    v-if="editId !== 0"
    :show-schedule="showSchedule"
    :editId="editId"
    :unitData="unitData"
    :edit-fees="editFees"
    @closeModal="editFees = false"
    @editId="editId = 0"
  ></edit-fees>
</template>
<script setup>
import { ref, computed } from "vue";
import AddFees from "./Actions/AddFees.vue";
import EditFees from "./Actions/EditFees.vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, Delete, Lock, Unlock } from "@element-plus/icons-vue";
import store from "../../../../store";
import { useRoute } from "vue-router";

const addFees = ref(false);
const editFees = ref(false);
const search = ref("");
const route = useRoute();
let editId = ref(0);

const tableHeader = [
  { id: "0", type: "index", name: "#", prop: "id" },
  {
    id: "1",
    name: "Subdivision Dues",
    prop: "hoa_subd_dues_name",
  },
  { id: "2", name: "Unit", prop: "unit" },

  {
    id: "4",
    name: "Period Start Date",
    prop: "hoa_subd_dues_start_date",
  },
  {
    id: "5",
    name: "Period End Date",
    prop: "hoa_subd_dues_end_date",
  },
  {
    id: "6",
    name: "Period Date Recurrent",
    prop: "hoa_schedule_name",
  },
  { id: "8", name: "Cost", prop: "hoa_subd_dues_cost" },
];

const dueId = route.params.id;
const duesName = route.params.name;
store.dispatch("dues/getDues", dueId);
store.dispatch("dues/getShowSchedule");
store.dispatch("dues/getShowUnits");
const showSchedule = computed(() => store.state.dues.duesSchedule.data);
const unitData = computed(() => store.state.dues.duesUnits.data);
console.log(unitData);
const tableData = computed(() => store.state.dues.due);
const duesLoading = computed(() => store.state.dues.due.loading);

const tableRowClassName = ({ row, rowIndex }) => {
  //change table row to  red if the subdivision is disable
  if (row.hoa_subd_dues_status === 0) {
    return "danger-row";
  }
  return "";
};

const filterTableData = computed(() =>
  tableData.value.data.filter(
    (data) =>
      !search.value ||
      data.hoa_subd_dues_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

function editModal(index, row) {
  editId.value = row.id;
  editFees.value = true;
}

async function changeStatus(index, row) {
  if (confirm(`Are you sure you want to update subdivision dues data status?`)) {
    try {
      const res = await store.dispatch("dues/changeStatus", row.id);
      if (res.status === 204) {
        await store.dispatch("dues/getDues", dueId);
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The dues data status was successfully updated",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
</script>

<style>
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
</style>

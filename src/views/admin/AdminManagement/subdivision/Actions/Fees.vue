<template>
  <page-component navTitle="Subdivision" navContent="Subdivision Fees">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addFees = true"
        >Add Subdivision Fees</el-button
      >
    </template>
    <template v-slot:content>
      <el-table
        align="center"
        header-align="center"
        :data="filterTableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          sortable
          v-for="header in tableHeader"
          :key="header.id"
          :prop="header.prop"
          :label="header.name"
          :width="header.width"
        ></el-table-column>
        <el-table-column align="right" width="180" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover
              placement="top-start"
              title="Action"
              :width="180"
              trigger="hover"
            >
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Edit Fees" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editFees = true"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                content="Delete Fees"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteSubdivisionFees"
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
  <add-fees :add-fees="addFees" @closeModal="addFees = false"></add-fees>
  <edit-fees :edit-fees="editFees" @closeModal="editFees = false"></edit-fees>
</template>
<script setup>
import { ref, computed } from "vue";
import AddFees from "./AddFees.vue";
import EditFees from "./EditFees.vue";
import PageComponent from "../../../../../components/PageComponent.vue";
import { Edit, Delete } from "@element-plus/icons-vue";

const tableHeader = [
  { id: "1", name: "Subdivision Fess", prop: "subfee", width: "180" },
  { id: "2", name: "Unit", prop: "unit", width: "100" },
  {
    id: "3",
    name: "Payment Targets (Days)",
    prop: "paymentTarget",
    width: "180",
  },
  { id: "4", name: "Period Start Date", prop: "periodStartDate", width: "180" },
  { id: "5", name: "Period End Date", prop: "periodEndDate", width: "180" },
  {
    id: "6",
    name: "Period Date Recurrent",
    prop: "periodDateRecurrent",
    width: "180",
  },
  { id: "7", name: "Cutoff Date", prop: "cutoffDate", width: "180" },
  { id: "8", name: "Cost", prop: "cost", width: "180" },
];

const tableData = [
  {
    id: "1",
    subfee: "Association Dues",
    unit: "sqm",
    paymentTarget: "15",
    periodStartDate: "January 1 2021",
    periodEndDate: "February 31 2021",
    periodDateRecurrent: "Monthly",
    cutoffDate: "5",
    cost: "400",
  },
  {
    id: "2",
    subfee: "Membership Dues",
    unit: "sqm",
    paymentTarget: "15",
    periodStartDate: "January 1 2021",
    periodEndDate: "December 31 2021",
    periodDateRecurrent: "Annually",
    cutoffDate: "5",
    cost: "400",
  },
];

const search = ref("");

const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.subfee.toLowerCase().includes(search.value.toLowerCase())
  )
);
const addFees = ref(false);
const editFees = ref(false);

function deleteSubdivisionFees() {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
  }
}

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>

<template>
  <page-component navTitle="Member Registration" navContent="Member Payment Transaction">
    <template v-slot:buttons>
      <el-button class="button" type="text"
        >Generate Report</el-button
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
              <el-tooltip
                content="Edit Transaction"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editTransaction = true"
                ></el-button>
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
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
    :edit-transaction="editTransaction"
    @closeModal="editTransaction = false"
  ></edit-transaction>
</template>
<script setup>
import { ref, computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import EditTransaction from "./Actions/EditTransaction.vue";


const editTransaction = ref(false);

const tableHeader = [
  { id: "1", name: "Transaction ID", prop: "trasactId", width: "180" },
  { id: "2", name: "Bill Month", prop: "billMonth", width: "180" },
  { id: "4", name: "Date Paid", prop: "datePaid", width: "180" },
  { id: "3", name: "Balance", prop: "balance", width: "180" },
  { id: "5", name: "Payment Status", prop: "status", width: "180" },
];

const tableData = [
  {
    id: "1",
    trasactId: "1",
    billMonth: "February 15 2022",
    datePaid: "March 1 2022",
    balance: "2700",
    status: "Paid",
  },
  {
    id: "1",
    trasactId: "2",
    billMonth: "January 15 2022",
    datePaid: "December 15 2022",
    balance: "3,000",
    status: "Paid",
  },
];

const search = ref("");

const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.status.toLowerCase().includes(search.value.toLowerCase())
  )
);

function deleteProperty() {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
  }
}
function disableSubdivision(survey) {
  if (confirm(`Are you sure you want to disable this data?`)) {
  }
}
function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>

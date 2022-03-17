<template>
  <page-component
    navTitle="RFID Registration"
    navContent="Privilege Transaction"
  >
    <template v-slot:buttons>
      <span>Felizardo Felizardo Cortez = 132</span>
      <el-button class="button" type="text" @click="addPrivilege = true"
        >Avail</el-button
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
                  @click="disableSubdivision"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <router-link
          :to="{ name: 'MemberDues' }"
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
      </div>
    </template>
    <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
      <router-link
        :to="{ name: 'RFIDRegistration' }"
        type="submit"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Back
      </router-link>
    </div>
  </page-component>
  <add-privilege :add-privilege="addPrivilege" @closeModal="addPrivilege = false"></add-privilege>
  <add-load :add-load="addLoad" @closeModal="addLoad = false"></add-load>
</template>
<script setup>
import { ref, computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import AddPrivilege from "./Actions/AddPrivilege.vue"
import AddLoad from "./Actions/AddLoad.vue"

const addPrivilege = ref(false);
const addLoad = ref(false);

const tableHeader = [
  { id: "1", name: "Transaction Name", prop: "name", width: "180" },
  { id: "2", name: "Description", prop: "desc", width: "180" },
  { id: "3", name: "Type", prop: "type", width: "180" },
  { id: "4", name: "Booking Number", prop: "bookNumber", width: "180" },
  { id: "5", name: "Cost", prop: "cost", width: "180" },
  { id: "6", name: "Timestamp", prop: "timestamp", width: "180" },
];

const tableData = [
  {
    id: "1",
    name: "A",
    desc: "Sands Hotel Room LEAN SEASON Book 1 night and get 1 night free	",
    type: "PCKG",
    bookNumber: "123456",
    cost: "1",
    timestamp: "3/2/2022",
  },
  {
    id: "2",
    name: "Admin",
    desc: "Annual privilege load availment	",
    type: "LOAD",
    bookNumber: "123456",
    cost: "133",
    timestamp: "1/15/2022",
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
function deleteSubdivision(survey) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
  }
}
</script>

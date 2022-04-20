<template>
  <page-component navTitle="Member Registration" navContent="Member Property">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addProperty = true"
        >Add Member Property</el-button
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
                content="Edit Member Address"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editProperty = true"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                content="Delete Member Address"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteProperty"
                ></el-button
              ></el-tooltip>
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
  <add-member-address
    :add-property="addProperty"
    @closeModal="addProperty = false"
  ></add-member-address>
  <edit-member-address
    :edit-property="editProperty"
    @closeModal="editProperty = false"
  ></edit-member-address>
</template>
<script setup>
import { ref, computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import AddMemberAddress from "./Actions/AddMemberAddress.vue";
import EditMemberAddress from "./Actions/EditMemberAddress.vue";

const addProperty = ref(false);
const editProperty = ref(false);

const tableHeader = [
  { id: "1", name: "Subdivision ID", prop: "subId", width: "180" },
  { id: "2", name: "Subdivision Name", prop: "subName", width: "180" },
  { id: "4", name: "House Number", prop: "houseNumber", width: "180" },
  { id: "3", name: "Street Name", prop: "streetName", width: "180" },
  { id: "5", name: "Block #", prop: "block", width: "180" },
  { id: "6", name: "Lot #", prop: "lot", width: "180" },
  { id: "7", name: "Lot Area (SQM)", prop: "lotArea", width: "180" },
  { id: "8", name: "Sales Agent", prop: "agent", width: "180" },
  {
    id: "9",
    name: "Sales Agent Contact Number",
    prop: "agentContact",
    width: "180",
  },
];

const tableData = [
  {
    id: "1",
    subId: "1",
    subName: "Bayu Peaks",
    houseNumber: "",
    streetName: "",
    block: "1",
    lot: "5",
    lotArea: "180",
    agent:'Angelo Pangilinan',
    agentContact:'09123876541'
  },
];

const search = ref("");

const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.subName.toLowerCase().includes(search.value.toLowerCase())
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

<template>
  <page-component navTitle="Admin Management" navContent="Privilege Management">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addPrivilege = true"
        >Add Privilege</el-button
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
        <el-table-column align="right" width="130" fixed="right">
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
              :width="50"
              trigger="hover"
            >
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip
                content="Edit Privilege"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="success"
                  :icon="Edit"
                  @click="editPrivilege = true"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Delete Privilege"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteSubdivision(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </page-component>
  <add-privilege
    :add-privilege="addPrivilege"
    @close-modal="addPrivilege = false"
  ></add-privilege>
  <edit-privilege
    :edit-privilege="editPrivilege"
    @close-modal="editPrivilege = false"
  ></edit-privilege>
</template>
<script setup>
import { ref, computed } from "vue";
import AddPrivilege from "./Actions/AddPrivilege.vue";
import EditPrivilege from "./Actions/EditPrivilege.vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, Delete } from "@element-plus/icons-vue";

const addPrivilege = ref(false);
const editPrivilege = ref(false);
const tableHeader = [
  { id: "0", name: "Package", prop: "package", width: "180" },
  { id: "1", name: "Description", prop: "description", width: "600" },
  { id: "2", name: "Category", prop: "category", width: "180" },
  { id: "3", name: "Cost", prop: "cost", width: "180" },
];

const tableData = [
  {
    id: "0",
    package: "A",
    description:
      "Sands & Aqua Fun Hotel Room LEAN SEASON (Book  1 room, get 1 free or Book 1 night, get 1 night free)",
    category: "Hotel Rooms",
    cost: "1",
  },
  {
    id: "2",
    package: "B",
    description: "Complimentary Bathrobe",
    category: "Hotel Rooms",
    cost: "1",
  },
  {
    id: "3",
    package: "C",
    description: "Access to AF water park LEAN SEASON (Complimentary access)",
    category: "AF Waterpark",
    cost: "1",
  },
];
const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.category.toLowerCase().includes(search.value.toLowerCase()) ||
      data.pacakge.toLowerCase().includes(search.value.toLowerCase())
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
function closeModal2() {
  isOpen2.value = false;
}
function openModal2() {
  isOpen2.value = true;
}
</script>

<template>
  <page-component navTitle="Admin Management" navContent="Sales Agent">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addAgent = true"
        >Add Sales Agent</el-button
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
                content="Edit Sales Agent"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="success"
                  :icon="Edit"
                  @click="editAgent = true"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Delete Sales Agent"
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
  <add-agent
    :add-agent="addAgent"
    @close-modal="addAgent = false"
  ></add-agent>
  <edit-agent
    :edit-agent="editAgent"
    @close-modal="editAgent = false"
  ></edit-agent>
</template>
<script setup>
import { ref, computed } from "vue";
import AddAgent from "./Actions/AddAgent.vue";
import EditAgent from "./Actions/EditAgent.vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, Delete } from "@element-plus/icons-vue";

const addAgent = ref(false);
const editAgent = ref(false);
const tableHeader = [
  { id: "0", name: "Sales Agent ID", prop: "id", width: "180" },
  { id: "1", name: "Email Address", prop: "email", width: "180" },
  { id: "2", name: "Last Name", prop: "lastName", width: "180" },
  { id: "3", name: "First Name", prop: "firstName", width: "180" },
  { id: "4", name: "Middle Name", prop: "middleName", width: "180" },
  { id: "5", name: "Contact Number", prop: "number", width: "180" },
  { id: "6", name: "Supervisor", prop: "visor", width: "180" },
];

const tableData = [
  {
    id: "0",
    email: "angelopangilinan@gmail.com",
    lastName: "Pangilinan",
    firstName: "Angelo",
    middleName: "",
    number:'09123876541',
    visor: "",
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

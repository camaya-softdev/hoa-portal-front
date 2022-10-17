<template>
  <page-component navTitle="Admin Management" navContent="Privilege Package Management">
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addPrivilege = true"
      >
        Add Privilege Package
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="privilegeLoading"
        v-loading.fullscreen.lock="privilegeLoading"
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
          :prop="header.prop"
          :label="header.name"
          :width="header.width"
        ></el-table-column>
        <el-table-column align="right" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchPrivilege"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="200" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip
                content="Edit Privilege Package"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="success"
                  :icon="Edit"
                  @click="editModal(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                v-if="scope.row.hoa_privilege_package_status === 1"
                content="Disabled Privilege Package"
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
                content="Enabled Privilege Package"
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
              <el-tooltip
                content="Delete Privilege Package"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deletePrivilege(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
    </template>
  </page-component>
  <add-privilege
    :add-privilege="addPrivilege"
    @close-modal="addPrivilege = false"
  ></add-privilege>
  <edit-privilege
    v-if="editId !== 0"
    :editId="editId"
    :edit-privilege="editPrivilege"
    @close-modal="editPrivilege = false"
    @editId="editId = 0"
  ></edit-privilege>
</template>
<script setup>
import { ref, computed } from "vue";
import AddPrivilege from "./Actions/AddPrivilege.vue";
import EditPrivilege from "./Actions/EditPrivilege.vue";
import PageComponent from "../../../../components/PageComponent.vue";
import Pagination from "../../../../components/Pagination.vue";
import { Edit, Delete, Lock, Unlock } from "@element-plus/icons-vue";
import store from "../../../../store";
import _ from "lodash";

let addPrivilege = ref(false);
let editPrivilege = ref(false);

const tableHeader = [
  {
    id: "0",
    name: "Package",
    prop: "hoa_privilege_package_name",
  },
  {
    id: "1",
    name: "Description",
    prop: "hoa_privilege_package_desc",
  },
  {
    id: "2",
    name: "Category",
    prop: "hoa_privilege_package_category",
  },
  { id: "3", name: "Cost", prop: "hoa_privilege_package_cost" },
  { id: "4", name: "Limit", prop: "hoa_privilege_package_limit" },
];

store.dispatch("privilege/getPrivileges");
const privilegeLoading = computed(() => store.state.privilege.privilege.loading);
let tableData = computed(() => store.state.privilege.privilege);
const search = ref("");
const filterTableData = computed(() => tableData.value.data);

let searchPrivilege = _.debounce(function () {
  store
    .dispatch("privilege/getSearchPrivileges", { data: search.value, url: 1 })
    .then(() => (tableData = computed(() => store.state.privilege.privilege)))
    .catch((err) => console.log(err));
}, 1000);

const tableRowClassName = ({ row, rowIndex }) => {
  //change table row to  red if the users is disable
  if (row.hoa_privilege_package_status === 0) {
    return "danger-row";
  }
  return "";
};

const editId = ref(0);

function editModal(index, row) {
  editId.value = row.id;
  editPrivilege.value = true;
}

async function deletePrivilege(index, row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("privilege/deletePrivilege", row.id);
      if (res.status === 204) {
        await store.dispatch("privilege/getPrivileges");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The privilege data was successfully deleted",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
async function changeStatus(index, row) {
  if (confirm(`Are you sure you want to update privileges data status?`)) {
    try {
      const res = await store.dispatch("privilege/changeStatus", row.id);
      if (res.status === 204) {
        await store.dispatch("privilege/getPrivileges");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The privilege data status was successfully updated",
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
    await store.dispatch("privilege/getSearchPrivileges", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    await store.dispatch("privilege/getPrivileges", {
      url: Number(link.label),
    });
  }
}
</script>

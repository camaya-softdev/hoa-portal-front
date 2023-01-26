<template>
  <PageComponent navTitle="Admin Management" navContent="User Management">
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addDialog = true"
      >
        Add User
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="usersLoading"
        v-loading.fullscreen.lock="usersLoading"
        element-loading-text="Fetching Data..."
      ></div>
      <el-table
        align="center"
        v-else
        :lazy="true"
        header-align="center"
        :data="filterTableData"
        :row-class-name="tableRowClassName"
        style="width: 100%; overflow-x: auto"
        :flexible="true"
        table-layout="auto"
      >
        <el-table-column type="index" label="#" prop="id" width="80"></el-table-column>
        <el-table-column
          sortable
          label="Member ID"
          prop="admin_id"
          width="180"
        ></el-table-column>
        <el-table-column
          sortable
          label="Email Address"
          prop="email"
          width="180"
        ></el-table-column>
        <el-table-column
          sortable
          label="Last Name"
          prop="hoa_member_lname"
          width="180"
        ></el-table-column>
        <el-table-column
          sortable
          label="First Name"
          prop="hoa_member_fname"
          width="180"
        ></el-table-column>
        <el-table-column
          sortable
          label="Middle Name"
          prop="hoa_member_mname"
          width="180"
        ></el-table-column>
        <el-table-column
          sortable
          label="Suffix"
          prop="hoa_member_suffix"
          width="180"
        ></el-table-column>
        <el-table-column
          sortable
          label="Contact Number"
          prop="hoa_member_phone_num"
          width="180"
        ></el-table-column>
        <el-table-column sortable label="Member Type" width="180">
          <template #default="scope">
            <el-tag effect="dark" v-if="scope.row.hoa_admin === 1" class="ml-2 mb-2"
              >HOA Admin</el-tag
            >
            <el-tag effect="dark" v-if="scope.row.hoa_member === 1" class="ml-2 mb-2"
              >HOA Member</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column sortable label="Assigned" width="180">
          <template #default="scope">
            <el-tag
              effect="dark"
              v-if="scope.row.hoa_access_type === 2"
              class="ml-2 mb-2"
              v-for="subdivisionData in scope.row.subdivision"
              :key="subdivisionData.id"
              >{{ subdivisionData.hoa_subd_name }}</el-tag
            >
            <el-tag v-else effect="dark" disable-transitions>All</el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable label="Access Type" width="180">
          <template #default="scope">
            <el-tag v-if="scope.row.hoa_access_type === 2" effect="dark" class="ml-2"
              >Subdivision Admin</el-tag
            >
            <el-tag
              v-if="scope.row.hoa_access_type === 1"
              effect="dark"
              disable-transitions
              >Full Admin</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column align="right" width="180" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchUser"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="240" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Edit User" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="success"
                  :icon="Edit"
                  @click="showEditModal(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                v-if="scope.row.hoa_member_status === 1"
                content="Disabled User"
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
              <el-tooltip v-else content="Enabled User" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="warning"
                  :icon="Unlock"
                  @click="changeStatus(scope.$index, scope.row)"
                ></el-button
              ></el-tooltip>
              <el-tooltip content="Delete User" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteUser(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Generate New Password"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  :icon="Lollipop"
                  @click="showGeneratePassword(scope.row)"
                ></el-button>
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPages"></Pagination>
    </template>
  </PageComponent>
  <add-modal
    :add-dialog="addDialog"
    :userEmail="userEmail"
    :options="options"
    :optionstwo="optionstwo"
    :subdivisionData="subdivisionData"
    @closeModal="addDialog = false"
    @searchShowUser="searchShowUser"
  ></add-modal>
  <edit-modal
    v-if="editId !== 0"
    :options="options"
    :optionstwo="optionstwo"
    :edit-dialog="editDialog"
    :userEmail="userEmail"
    :subdivisionData="subdivisionData"
    :edit-id="editId"
    @editId="editId = 0"
    @closeModal="editDialog = false"
    @searchShowUser="searchShowUser"
  ></edit-modal>
  <reset-password
    v-if="changePasswordId !== 0"
    :reset-dialog="resetDialog"
    :change-password-id="changePasswordId"
    @changePasswordId="changePasswordId = 0"
    @close-modal="resetDialog = false"
  ></reset-password>
</template>
<script setup>
import { ref, computed } from "vue";
import AddModal from "./Actions/AddModal.vue";
import EditModal from "./Actions/EditModal.vue";
import ResetPassword from "./Actions/ResetPassword.vue";
import PageComponent from "../../../../components/PageComponent.vue";
import Pagination from "../../../../components/Pagination.vue";
import { Edit, Delete, Lollipop, Lock, Unlock } from "@element-plus/icons-vue";
import store from "../../../../store";
import _ from "lodash";

let addDialog = ref(false);
let editDialog = ref(false);
let resetDialog = ref(false);
const editId = ref(0);
let changePasswordId = ref(0);

store.dispatch("user/getUsers");
store.dispatch("user/getShowSubdivision");
store.dispatch("user/getShowEmail");

const auth = store.state.auth.user.hoa_access_type;
let options = [];
if (auth == 2) {
  options = [
    {
      label: "Subdivision Admin",
      value: 2,
    },
  ];
} else {
  options = [
    {
      label: "Full Admin",
      value: 1,
    },
    {
      label: "Subdivision Admin",
      value: 2,
    },
  ];
}

const optionstwo = [
  {
    label: "HOA Admin",
    value: 1,
  },
  {
    label: "HOA Admin HOA Member",
    value: 2,
  },
];

const usersLoading = computed(() => store.state.user.users.loading);
const userEmail = computed(() => store.state.user.userEmail.data);
const subdivisionData = computed(() => store.state.user.user_subdivision.data);
let tableData = computed(() => store.state.user.users);
const search = ref("");

const tableRowClassName = ({ row, rowIndex }) => {
  //change table row to  red if the users is disable
  if (row.hoa_member_status === 0) {
    return "danger-row";
  }
  return "";
};

const filterTableData = computed(() => tableData.value.data);

let searchUser = _.debounce(function () {
  store
    .dispatch("user/getSearchUsers", { data: search.value, url: null })
    .then(() => (tableData = computed(() => store.state.user.users)))
    .catch((err) => console.log(err));
}, 1000);

let searchShowUser = _.debounce(function (user) {
  store
    .dispatch("user/getSearchShowUsers", user)
    .then(() => (userEmail.value = computed(() => store.state.user.userEmail.data)))
    .catch((err) => console.log(err));
}, 1000);
let label = 1;
async function getForPages(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    console.log(link.url);
    return;
  }
  if (search.value !== "") {
    await store.dispatch("user/getSearchUsers", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    if(link.label == 'Next &raquo;'){
      await store.dispatch("user/getUsers", { url: Number(1 + label) });
      label++;
      return;
    }
    if(link.label == '&laquo; Previous'){
      await store.dispatch("user/getUsers", { url: Number(label - 1) });
      label--;
      return;
    }
    await store.dispatch("user/getUsers", { url: link.label });
  }
}

function showEditModal(row) {
  editId.value = row.id;
  editDialog.value = true;
}

function showGeneratePassword(row) {
  changePasswordId.value = row.id;
  console.log(row.id);
  resetDialog.value = true;
}

function deleteSubdivision(index, row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
  }
}

async function deleteUser(index, row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("user/deleteUser", row.id);
      if (res.status === 204) {
        await store.dispatch("user/getUsers");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The user data was successfully deleted",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}

async function changeStatus(index, row) {
  if (confirm(`Are you sure you want to update users data status?`)) {
    try {
      const res = await store.dispatch("user/changeStatus", row.id);
      if (res.status === 204) {
        await store.dispatch("user/getUsers");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The user data status was successfully updated",
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

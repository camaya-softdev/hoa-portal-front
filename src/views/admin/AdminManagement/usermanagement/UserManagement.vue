<template>
  <PageComponent navTitle="Admin Management" navContent="User Management">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addDialog = true"
        >Add User</el-button
      >
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
              :width="240"
              trigger="hover"
            >
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Edit User" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="success"
                  :icon="Edit"
                  @click="editDialog = true"
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
              <el-tooltip
                v-else
                content="Enabled User"
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
                content="Delete User"
                placement="bottom"
                effect="light"
              >
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
                  @click="resetDialog = true"
                ></el-button>
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </template>
     <div class="flex justify-center mt-5">
        <nav
          class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <a
            v-for="(link, i) of tableData.links"
            :key="i"
            :disabled="!link.url"
            href="#"
            @click="getForPage($event, link)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
            :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
              i === tableData.links.length - 1 ? 'rounded-r-md' : '',
            ]"
            v-html="link.label"
          >
          </a>
        </nav>
      </div>
  </PageComponent>
  <add-modal
    :add-dialog="addDialog"
    @closeModal="addDialog = false"
  ></add-modal>
  <edit-modal
    :edit-dialog="editDialog"
    @closeModal="editDialog = false"
  ></edit-modal>
  <reset-password
    :reset-dialog="resetDialog"
    @close-modal="resetDialog = false"
  ></reset-password>
</template>
<script setup>
import { ref, computed } from "vue";
import AddModal from "./Actions/AddModal.vue";
import EditModal from "./Actions/EditModal.vue";
import ResetPassword from "./Actions/ResetPassword.vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, Delete, Lollipop, Lock,  Unlock } from "@element-plus/icons-vue";
import store from "../../../../store";

const addDialog = ref(false);
const editDialog = ref(false);
const resetDialog = ref(false);
const tableHeader = [
  { id: "0", name: "HOA ID", prop: "id", width: "100" },
  { id: "1", name: "Email Address", prop: "email", width: "180" },
  { id: "2", name: "Last Name", prop: "hoa_member_lname", width: "180" },
  { id: "3", name: "First Name", prop: "hoa_member_fname", width: "180" },
  { id: "4", name: "Middle Name", prop: "hoa_member_mname", width: "180" },
  { id: "5", name: "Suffix", prop: "hoa_member_suffix", width: "180" },
  {
    id: "6",
    name: "Contact Number",
    prop: "hoa_member_phone_num",
    width: "180",
  },
  { id: "7", name: "Position", prop: "hoa_member_position", width: "180" },
  { id: "8", name: "Access Type", prop: "hoa_access_type", width: "180" },
  { id: "9", name: "Assigned", prop: "hoa_member_assigned", width: "180" },
  { id: "9", name: "Member Type", prop: "membertype", width: "180" },
];

store.dispatch("user/getUsers");
const usersLoading = computed(() => store.state.user.users.loading);
const tableData = computed(() => store.state.user.users);
const search = ref("");

const tableRowClassName = ({ row, rowIndex }) => {
  //change table row to  red if the users is disable
  if (row.hoa_member_status === 0) {
    return "danger-row";
  }
  return "";
};

const filterTableData = computed(() =>
  tableData.value.data.filter(
    (data) =>
      !search.value ||
         data.email.toLowerCase().includes(search.value.toLowerCase()) ||
      data.hoa_member_lname
        .toLowerCase()
        .includes(search.value.toLowerCase()) ||
      data.hoa_member_fname
        .toLowerCase()
        .includes(search.value.toLowerCase()) ||
      data.hoa_member_mname.toLowerCase().includes(search.value.toLowerCase())
  )
);

async function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  await store.dispatch("user/getUsers", { url: link.url });
}




function deleteSubdivision(index, row) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
  }
}

async function deleteUser(index, row) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
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

// function editModal(index, row) {

// }
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

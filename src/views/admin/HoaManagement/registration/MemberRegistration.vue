<template>
  <page-component navTitle="Member Management" navContent="Member Registration">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addMember = true"
        >Add Member</el-button
      >
    </template>
    <template v-slot:content>
      <div
        v-if="memberLoading"
        v-loading.fullscreen.lock="memberLoading"
        element-loading-text="Fetching Data..."
      ></div>
      <el-table
        v-else
        align="center"
        header-align="center"
        :row-class-name="tableRowClassName"
        :data="filterTableData"
        style="width: 100%; overflow-x: auto"
        :flexible="true"
        table-layout="auto"
      >
        <el-table-column
          v-for="header in tableHeader"
          :type="header.type"
          :key="header.id"
          :prop="header.prop"
          :label="header.name"
          :width="header.width"
        ></el-table-column>
        <el-table-column align="right" width="180" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchMember"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover
              placement="top-start"
              title="Extension of Member Table"
              :width="240"
              trigger="hover"
            >
              <template #reference>
                <el-button round>Extension</el-button>
              </template>
              <el-tooltip content="Property" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Coordinate"
                  @click="property(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Document" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Document"
                  @click="documents(scope.row)"
                ></el-button
              ></el-tooltip>
              <el-tooltip content="Reset Password" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Loading"
                  @click="resetPassword(scope.row)"
                ></el-button
              ></el-tooltip>
              <el-tooltip content="Payment Transaction" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="CreditCard"
                  @click="paymentHistory(scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
            <el-popover placement="top-start" title="Action" :width="180" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Edit Member" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editModal(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                v-if="scope.row.hoa_member_status === 1"
                content="Disabled Member"
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
                content="Enabled Member"
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
              <el-tooltip content="Delete Member" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteMember(scope.$index, scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
    </template>
  </page-component>
  <add-member :addMember="addMember" @closeModal="addMember = false"></add-member>

  <edit-member
    v-if="editId !== 0"
    :editMember="editMember"
    :edit-id="editId"
    @closeModal="editMember = false"
    @editId="editId = 0"
  ></edit-member>
</template>
<script setup>
import { ref, computed } from "vue";
import AddMember from "./Actions/AddMember.vue";
import EditMember from "./Actions/EditMember.vue";
import PageComponent from "../../../../components/PageComponent.vue";
import Pagination from "../../../../components/Pagination.vue";
import {
  Edit,
  Delete,
  Coordinate,
  Document,
  Loading,
  CreditCard,
  Lock,
  Unlock,
} from "@element-plus/icons-vue";
import store from "../../../../store";
import { useRouter } from "vue-router";
import _ from "lodash";

const router = useRouter();
let addMember = ref(false);
let editMember = ref(false);
const search = ref("");

//get all hoa member data
store.dispatch("member/getMembers");
const memberLoading = computed(() => store.state.member.members.loading);
let tableData = computed(() => store.state.member.members);

const tableRowClassName = ({ row, rowIndex }) => {
  //change table row to  red if the users is disable
  if (row.hoa_member_status === 0) {
    return "danger-row";
  }
  return "";
};

const tableHeader = [
  { id: "0", type: "index", name: "#" },
  { id: "1", name: "Member ID", prop: "member_id" },
  { id: "2", name: "Email Address", prop: "email" },
  { id: "3", name: "Last Name", prop: "hoa_member_lname" },
  { id: "4", name: "First Name", prop: "hoa_member_fname" },
  { id: "5", name: "Middle Name", prop: "hoa_member_mname" },
  { id: "6", name: "Suffix", prop: "hoa_member_suffix" },
  { id: "7", name: "E Bill", prop: "hoa_member_ebill" },
  { id: "8", name: "SMS", prop: "hoa_member_sms" },
];

const filterTableData = computed(() => tableData.value.data);

let searchMember = _.debounce(function () {
  store
    .dispatch("member/getSearchMembers", { data: search.value, label: 1 })
    .then(() => (tableData = computed(() => store.state.member.members)))
    .catch((err) => console.log(err));
}, 1000);

const editId = ref(0);
function editModal(index, row) {
  editId.value = row.id;
  editMember.value = true;
}

async function deleteMember(index, row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("member/deleteMember", row.id);
      if (res.status === 204) {
        await store.dispatch("member/getMembers");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The user data was successfully deleted",
        });
      }
    } catch (err) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "error",
        message:
          "Since there are data connected to this member.\n" + "It will not be deleted!",
      });
    }
  }
}
async function changeStatus(index, row) {
  if (confirm(`Are you sure you want to update users data status?`)) {
    try {
      const res = await store.dispatch("member/changeStatus", row.id);
      if (res.status === 204) {
        await store.dispatch("member/getMembers");
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
//pagination
async function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  if (search.value !== "") {
    await store.dispatch("member/getSearchMembers", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    await store.dispatch("member/getMembers", { url: Number(link.label) });
  }
}

async function resetPassword(row) {
  if (confirm(`Are you sure you want to reset his/her password?`)) {
    try {
      const res = await store.dispatch("reset/forgetPassword", row);
      if (res.status === 200) {
        await store.dispatch("member/getMembers");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "We have e-mailed user's password reset link",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
function property(row) {
  router.push({
    name: "MemberAddress",
    params: { id: row.id, email: row.email },
  });
}
function documents(row) {
  router.push({
    name: "MemberDocuments",
    params: { id: row.id, email: row.email },
  });
}
function paymentHistory(row) {
  router.push({
    name: "MemberPaymentHistory",
    params: { id: row.id, email: row.email },
  });
}
</script>
<style>
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
</style>

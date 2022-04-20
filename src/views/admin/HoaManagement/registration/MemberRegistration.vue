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
                  @click="property"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Document" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Document"
                  @click="documents"
                ></el-button
              ></el-tooltip>
              <el-tooltip
                content="Reset Password"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="Loading"
                  @click="resetPassword"
                ></el-button
              ></el-tooltip>
              <el-tooltip
                content="Payment Transaction"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="CreditCard"
                  @click="paymentHistory"
                ></el-button
              ></el-tooltip>
            </el-popover>
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
                content="Edit Member"
                placement="bottom"
                effect="light"
              >
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
              <el-tooltip
                content="Delete Member"
                placement="bottom"
                effect="light"
              >
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
    </template>
  </page-component>
  <add-member
    :addMember="addMember"
    @closeModal="addMember = false"
  ></add-member>

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


const router = useRouter();
const addMember = ref(false);
const editMember = ref(false);
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
  { id: "0", name: "Member Id", prop: "id", width: "180" },
  { id: "1", name: "Email Address", prop: "email", width: "200" },
  { id: "2", name: "Last Name", prop: "hoa_member_lname", width: "180" },
  { id: "3", name: "First Name", prop: "hoa_member_fname", width: "180" },
  { id: "4", name: "Middle Name", prop: "hoa_member_mname", width: "180" },
  { id: "5", name: "Suffix", prop: "hoa_member_suffix", width: "180" },
  { id: "6", name: "E Bill", prop: "hoa_member_ebill", width: "180" },
  { id: "7", name: "SMS", prop: "hoa_member_sms", width: "180" },
];

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
const editId = ref(0);
function editModal(index, row) {
  editId.value = row.id;
  editMember.value = true;
}

async function deleteMember(index, row) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
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
      throw err;
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
  await store.dispatch("member/getMembers", { url: link.url });
}

function resetPassword(survey) {
  if (confirm(`Are you sure you want to reset his/her password?`)) {
  }
}
function property() {
  router.push({ name: "MemberAddress" });
}
function documents() {
  router.push({ name: "MemberDocuments" });
}
function paymentHistory() {
  router.push({ name: "MemberPaymentHistory" });
}
</script>
<style>
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}


</style>

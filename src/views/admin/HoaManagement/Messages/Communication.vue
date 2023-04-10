<template>
  <page-component navTitle="Member Management" navContent="Email Management">
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addEmail = true"
      >
        Add Email
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="emailLoading"
        v-loading.fullscreen.lock="emailLoading"
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
      >
        <el-table-column type="index" label="#" prop="id"></el-table-column>
        <el-table-column sortable label="Member ID" prop="member_id"></el-table-column>
        <el-table-column sortable label="Member Name" prop="fullName"></el-table-column>
        <el-table-column sortable label="Member Email" prop="email"></el-table-column>
        <el-table-column
          sortable
          label="Email Schedule"
          prop="hoa_email_sched"
        ></el-table-column>
        <el-table-column
          sortable
          label="Email Recurrent"
          prop="schedule"
        ></el-table-column>
        <el-table-column
          sortable
          label="Email Template"
          prop="templateName"
        ></el-table-column>
        <el-table-column align="right" width="130" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchEmail"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="100" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>

              <el-tooltip content="Edit Email" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editModal(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Delete Email" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteEmail(scope.row)"
                ></el-button>
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6 opacity-80">
        <router-link
          :to="{ name: 'MessageTemplate' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Show Template
        </router-link>
        <button
          @click="addSubdEmail = true"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Subdivision Email
        </button>
      </div>
    </template>
  </page-component>

  <AddSubdEmail
    :add-subd-email="addSubdEmail"
    :subdivisionData="subdivisionData"
    :emailTemplate="emailTemplate"
    :showSchedule="showSchedule"
    @closeModal="addSubdEmail = false"
  />
  <add-email
    :add-email="addEmail"
    :showSchedule="showSchedule"
    :userData="userData"
    :emailTemplate="emailTemplate"
    @closeModal="addEmail = false"
    @searchShowUser="searchShowUser"
  ></add-email>
  <edit-email
    v-if="editId !== 0"
    :edit-id="editId"
    @editId="editId = 0"
    :edit-email="editEmail"
    :showSchedule="showSchedule"
    :userData="userData"
    :emailTemplate="emailTemplate"
    @closeModal="editEmail = false"
  ></edit-email>
</template>
<script setup>
import { ref, computed } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import AddEmail from "./Actions/AddEmail.vue";
import EditEmail from "./Actions/EditEmail.vue";
import store from "../../../../store";
import {debounce} from "lodash";
import AddSubdEmail from "./Actions/AddSubdEmail.vue";

let addEmail = ref(false);
let editEmail = ref(false);
let addSubdEmail = ref(false);
let editId = ref(0);

store.dispatch("email/getEmails");
store.dispatch("email/getEmailTemplates");
store.dispatch("show_member_user/getShowMemberUsers");
store.dispatch("dues/getShowSchedule");
store.dispatch("user/getShowSubdivision");

let tableData = computed(() => store.state.email.email);
const subdivisionData = computed(() => store.state.user.user_subdivision.data);
let userData = computed(() => store.state.show_member_user.showMemberUser.data);
const emailTemplate = computed(() => store.state.email.email_templates.data);
const showSchedule = computed(() => store.state.dues.duesSchedule.data);
let emailLoading = computed(() => store.state.email.email.loading);

const search = ref("");

const filterTableData = computed(() => tableData.value.data);

let searchShowUser = debounce(function (user) {
  store
    .dispatch("show_member_user/getSearchShowMemberUsers", user)
    .then(
      () =>
        (userData.value = computed(
          () => store.state.show_member_user.showMemberUser.data
        ))
    )
    .catch((err) => console.log(err));
}, 1000);

let searchEmail = debounce(function () {
  store
    .dispatch("email/getSearchEmails", { data: search.value, url: 1 })
    .then(() => (tableData = computed(() => store.state.email.email)))
    .catch((err) => console.log(err));
}, 1000);

function editModal(row) {
  editId.value = row.id;
  editEmail.value = true;
}

async function deleteEmail(row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("email/deleteEmail", row.id);
      if (res.status === 204) {
        await store.dispatch("email/getEmails");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The email data was successfully deleted",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
let label=1;
async function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  if (search.value !== "") {
    await store.dispatch("email/getSearchEmails", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    if(link.label == 'Next &raquo;'){
      await store.dispatch("email/getEmails", { url: Number(1 + label) });
      label++;
      return;
    }
    if(link.label == '&laquo; Previous'){
      await store.dispatch("email/getEmails", { url: Number(label - 1) });
      label--;
      return;
    }
    await store.dispatch("email/getEmails", { url: link.label });
  }
}
</script>

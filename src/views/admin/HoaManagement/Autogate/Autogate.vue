<template>
  <page-component navTitle="Member Management" navContent="Autogate Management">
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addAutogate = true"
      >
        Add Member to Autogate Display
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="autogateLoading"
        v-loading.fullscreen.lock="autogateLoading"
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
        <el-table-column type="index" prop="id" label="#" width="80"></el-table-column>
        <el-table-column sortable label="Member ID" prop="member_id"></el-table-column>
        <el-table-column
          sortable
          label="Member Name"
          prop="hoa_autogate_member_name"
        ></el-table-column>
        <el-table-column
          sortable
          label="Subdivision Name"
          prop="hoa_autogate_subdivision_name"
        ></el-table-column>
        <el-table-column
          sortable
          label="Start Date"
          prop="hoa_autogate_start"
        ></el-table-column>
        <el-table-column
          sortable
          label="End Date"
          prop="hoa_autogate_end"
        ></el-table-column>
        <el-table-column
          sortable
          label="Message Template"
          prop="hoa_autogate_message"
        ></el-table-column>
        <el-table-column align="right" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchAutogate"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="100" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>

              <el-tooltip
                content="Edit Member to Autogate Display"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editModal(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Delete Member to Autogate Display"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteAutogate(scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6 opacity-80">
        <router-link
          :to="{ name: 'AutogateTemplate' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Show Template
        </router-link>
      </div>
    </template>
  </page-component>
  <add-autogate
    :add-autogate="addAutogate"
    :userData="userData"
    :autogateTemplate="autogateTemplate"
    @closeModal="addAutogate = false"
    @searchShowUser="searchShowUser"
  ></add-autogate>
  <edit-autogate
    v-if="editId !== 0"
    :edit-autogate="editAutogate"
    :userData="userData"
    :autogateTemplate="autogateTemplate"
    :edit-id="editId"
    @editId="editId = 0"
    @closeModal="editAutogate = false"
    @searchShowUser="searchShowUser"
  ></edit-autogate>
</template>
<script setup>
import { ref, computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import Pagination from "../../../../components/Pagination.vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import AddAutogate from "./Actions/AddAutogate.vue";
import EditAutogate from "./Actions/EditAutogate.vue";
import store from "../../../../store";
import _ from "lodash";

let addAutogate = ref(false);
let editAutogate = ref(false);
let editId = ref(0);

store.dispatch("autogate/getAutogates");
store.dispatch("autogate/getUserSubdivision");
store.dispatch("autogate/getAutogateTemplates");

let tableData = computed(() => store.state.autogate.autogate);
let autogateLoading = computed(() => store.state.autogate.autogate.loading);
let autogateTemplate = computed(() => store.state.autogate.autogate_template.data);
let userData = computed(() => store.state.autogate.user_subdivision.data);

const search = ref("");

const filterTableData = computed(() => tableData.value.data);

let searchAutogate = _.debounce(function () {
  store
    .dispatch("autogate/getSearchAutogates", { data: search.value, url: null })
    .then(() => (tableData = computed(() => store.state.autogate.autogate)))
    .catch((err) => console.log(err));
}, 1000);

let searchShowUser = _.debounce(function (user) {
  store
    .dispatch("autogate/getSearchShowAutogates", user)
    .then(
      () => (userData.value = computed(() => store.state.autogate.user_subdivision.data))
    )
    .catch((err) => console.log(err));
}, 1000);

async function deleteAutogate(row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("autogate/deleteAutogate", row.id);
      if (res.status === 204) {
        await store.dispatch("autogate/getAutogates");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The autogate data was successfully deleted",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}

function editModal(row) {
  editId.value = row.id;

  editAutogate.value = true;
}

async function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  if (search.value !== "") {
    await store.dispatch("autogate/getSearchAutogates", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    await store.dispatch("autogate/getAutogates", { url: link.label });
  }
}
</script>

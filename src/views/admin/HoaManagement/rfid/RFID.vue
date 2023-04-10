<template>
  <page-component navTitle="Member Management" navContent="RFID Registration">
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addRFID = true"
      >
        Add RFID
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="rfidLoading"
        v-loading.fullscreen.lock="rfidLoading"
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
        <el-table-column
          sortable
          label="Registration Date"
          prop="created_at"
        ></el-table-column>
        <el-table-column
          sortable
          label="RFID NO"
          prop="hoa_rfid_num"
          width="180"
        ></el-table-column>
        <el-table-column
          sortable
          label="Semnox NO"
          prop="hoa_rfid_semnox_num"
        ></el-table-column>
        <el-table-column sortable label="Member ID" prop="member_id"></el-table-column>
        <el-table-column sortable label="Member Name" prop="full_name"></el-table-column>
        <el-table-column sortable label="Status">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.hoa_rfid_reg_status === 1"
              >Enable</el-tag
            >
            <el-tag v-else type="danger">Disable</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          sortable
          label="Privilege Load"
          prop="hoa_rfid_reg_privilege_load"
        ></el-table-column>
        <el-table-column align="right" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchAgent"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="100" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Edit RFID" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editModal(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Show Privilege" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="success"
                  :icon="CreditCard"
                  @click="showPrivilege(scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
    </template>
  </page-component>

  <AddRFID
    :addRFID="addRFID"
    @searchShowUser="searchShowUser"
    :userEmail="userEmail"
    @closeModal="addRFID = false"
  ></addRFID>
  <EditRFID
    v-if="editId !== 0"
    :editRFID="editRFID"
    :userEmail="userEmail"
    @closeModal="editRFID = false"
    :edit-id="editId"
    @editId="editId = 0"
  ></editRFID>
</template>
<script setup>
import { ref, computed } from "vue";

import { Edit, CreditCard } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import store from "../../../../store";
import AddRFID from "./Actions/AddRFID.vue";
import EditRFID from "./Actions/EditRFID.vue";
import {debounce} from "lodash";

const router = useRouter();
let addRFID = ref(false);
let editRFID = ref(false);
let editId = ref(0);
store.dispatch("rfid/getRFIDs");
store.dispatch("show_member_user/getShowMemberUsers");
let tableData = computed(() => store.state.rfid.rfid);
const rfidLoading = computed(() => store.state.rfid.rfid.loading);
const search = ref("");

const filterTableData = computed(() => tableData.value.data);
const userData = computed(() => store.state.rfid.cardEmail);
let userEmail = computed(() => store.state.show_member_user.showMemberUser.data);

let searchShowUser = debounce(function (user) {
  store
    .dispatch("show_member_user/getSearchShowMemberUsers", user)
    .then(
      () =>
        (userEmail.value = computed(
          () => store.state.show_member_user.showMemberUser.data
        ))
    )
    .catch((err) => console.log(err));
}, 1000);

let searchAgent = debounce(function () {
  store
    .dispatch("rfid/getSearchRFIDs", { data: search.value, url: null })
    .then(() => (tableData = computed(() => store.state.rfid.rfid)))
    .catch((err) => console.log(err));
}, 1000);

function showPrivilege(row) {
  router.push({
    name: "Priveleges",
    params: {
      id: row.id,
      name: row.full_name,
      load: row.hoa_rfid_reg_privilege_load,
    },
  });
}

function editModal(row) {
  editId.value = row.id;
  editRFID.value = true;
}
let label = 1;
async function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }

  if (search.value !== "") {
    await store.dispatch("rfid/getSearchRFIDs", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    if(link.label == 'Next &raquo;'){
      await store.dispatch("rfid/getRFIDs", { url: Number(1 + label) });
      label++;
      return;
    }
    if(link.label == '&laquo; Previous'){
      await store.dispatch("rfid/getRFIDs", { url: Number(label - 1) });
      label--;
      return;
    }
    await store.dispatch("rfid/getRFIDs", { url: link.label });
  }
}
</script>

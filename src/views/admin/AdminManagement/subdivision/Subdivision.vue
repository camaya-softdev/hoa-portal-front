<template>
  <page-component navTitle="Admin Management" navContent="Subdivision Management">
    <template v-slot:buttons>
      <button
        v-if="auth != 2"
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addSubdivision = true"
      >
        Add Subdivision
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="subdivisionLoading"
        v-loading.fullscreen.lock="subdivisionLoading"
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
        :scrollbar-always-on="true"
        :row-class-name="tableRowClassName"
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
              size="small"
              @keyup="searchSubdivision"
              v-if="auth != 2"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover
              placement="top-start"
              title="Extension of Subdivision"
              :width="200"
              trigger="hover"
            >
              <template #reference>
                <el-button round>Extension</el-button>
              </template>
              <el-tooltip content="Dues" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="warning"
                  :icon="CreditCard"
                  @click="dues(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Board Of Directors" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Cellphone"
                  @click="boardofdirectors(scope.row)"
                ></el-button>
              </el-tooltip>
            </el-popover>
            <el-popover
              placement="top-start"
              title="Action"
              :width="200"
              trigger="hover"
              v-if="auth != 2"
            >
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Edit Subdivision" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="success"
                  :icon="Edit"
                  @click="editModal(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                v-if="scope.row.hoa_subd_status === 1"
                content="Disabled Subdivision"
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
                content="Enabled Subdivision"
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
              <el-tooltip content="Delete Subdivision" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteSubdivision(scope.$index, scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage" />
    </template>
  </page-component>
  <add-subdivision
    :add-subdivision="addSubdivision"
    :showEmail="showEmail"
    @closeModal="addSubdivision = false"
  ></add-subdivision>
  <edit-subdivision
    v-if="editId !== 0"
    :edit-subdivision="editSubdivision"
    :editId="editId"
    :showEmail="showEmail"
    @closeModal="editSubdivision = false"
    @editId="editId = 0"
  ></edit-subdivision>
</template>
<script setup>
import { ref, computed } from "vue";

import {
  Edit,
  Delete,
  Cellphone,
  CreditCard,
  Lock,
  Unlock,
} from "@element-plus/icons-vue";
import AddSubdivision from "./Actions/AddSubdivision.vue";
import EditSubdivision from "./Actions/EditSubdivision.vue";
import { useRouter } from "vue-router";
import store from "../../../../store";
import debounce  from "lodash/debounce";

const router = useRouter();

let addSubdivision = ref(false);
let editSubdivision = ref(false);
const auth = store.state.auth.user.hoa_access_type;
const tableHeader = [
  { id: "0", type: "index", prop: "id", name: "#", width: "80" },
  { id: "1", name: "Subdivision ID", prop: "subd_id", width: "180" },
  { id: "2", name: "Subdivision Name", prop: "hoa_subd_name", width: "180" },
  { id: "3", name: "Area (SQM)", prop: "hoa_subd_area", width: "180" },
  {
    id: "4",
    name: "Total Block Number",
    prop: "hoa_subd_blocks",
    width: "180",
  },

  { id: "5", name: "Total Lot Number", prop: "hoa_subd_lots", width: "180" },
  {
    id: "6",
    name: "Cutoff Date",
    prop: "hoa_subd_dues_cutoff_date",
    width: "180",
  },
  {
    id: "7",
    name: "Payment Targets (Days)",
    prop: "hoa_subd_dues_payment_target",
    width: "180",
  },
  {
    id: "8",
    name: "Contact Person",
    prop: "hoa_subd_contact_person",
    width: "180",
  },
  {
    id: "9",
    name: "Contact Number",
    prop: "hoa_subd_contact_number",
    width: "180",
  },
];

store.dispatch("subdivision/getSubdivisions");
store.dispatch("subdivision/getShowEmail");

const subdivisionLoading = computed(() => store.state.subdivision.subdivision.loading);
let tableData = computed(() => store.state.subdivision.subdivision);
const showEmail = computed(() => store.state.subdivision.subdivisionEmail.data);
const search = ref("");

const filterTableData = computed(() => tableData.value.data);

let searchSubdivision = debounce(function () {
  store
    .dispatch("subdivision/getSearchSubdivision", {
      data: search.value,
      url: 1,
    })
    .then(() => (tableData = computed(() => store.state.subdivision.subdivision)))
    .catch((err) => console.log(err));
}, 1000);

const tableRowClassName = ({ row, rowIndex }) => {
  //change table row to  red if the subdivision is disable
  if (row.hoa_subd_status === 0) {
    return "danger-row";
  }
  return "";
};

const editId = ref(0);

function editModal(index, row) {
  editId.value = row.id;

  editSubdivision.value = true;
}

function boardofdirectors(row) {
  router.push({
    name: "BoardOfDirectors",
    params: { id: row.id, name: row.hoa_subd_name },
  });
}

function dues(row) {
  router.push({
    name: "Fees",
    params: { id: row.id, name: row.hoa_subd_name },
  });
}

async function changeStatus(index, row) {
  if (confirm(`Are you sure you want to update subdivision data status?`)) {
    try {
      const res = await store.dispatch("subdivision/changeStatus", row.id);
      if (res.status === 204) {
        await store.dispatch("subdivision/getSubdivisions");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The subdivision data status was successfully updated",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}

async function deleteSubdivision(index, row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("subdivision/deleteSubdivision", row.id);
      if (res.status === 204) {
        await store.dispatch("subdivision/getSubdivisions");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The subdivision data was successfully deleted",
        });
      }
    } catch (err) {
      await store.commit("alert/notify", {
        title: "Error",
        type: "error",
        message:
          "Since there are data connected to this subdivision.\n" +
          "It will not be deleted!",
      });
    }
  }
}
let label = 1;
async function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  if (search.value !== "") {
    await store.dispatch("subdivision/getSearchSubdivision", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    if(link.label == 'Next &raquo;'){
      await store.dispatch("subdivision/getSubdivisions", { url: Number(1 + label) });
      label++;
      return;
    }
    if(link.label == '&laquo; Previous'){
      await store.dispatch("subdivision/getSubdivisions", { url: Number(label - 1) });
      label--;
      return;
    }
    await store.dispatch("subdivision/getSubdivisions", { url: link.label });
  }
}
</script>
<style>
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
</style>

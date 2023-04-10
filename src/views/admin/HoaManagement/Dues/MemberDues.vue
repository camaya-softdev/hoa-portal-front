<template>
  <PageComponent navTitle="Member Management" navContent="Dues & Fees">
    <template v-slot:content>
      <div
        v-if="dueFeeLoading"
        v-loading.fullscreen.lock="dueFeeLoading"
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
        <el-table-column
          sortable
          v-for="header in tableHeader"
          :key="header.id"
          :type="header.type"
          :prop="header.prop"
          :label="header.name"
          :width="header.width"
        ></el-table-column>
        <el-table-column align="right" width="130" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchDueFee"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="80" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Show Dues & Fees" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="success"
                  :icon="Files"
                  @click="showAllDue(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Add Other Fees"
                type="primary"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  :icon="Document"
                  @click="otherFees(scope.row)"
                ></el-button>
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
    </template>
  </PageComponent>
  <show-fees
    v-if="lotId !== 0"
    :show-dialog="showDialog"
    :lotId="lotId"
    @closeModal="showDialog = false"
    @lotId="lotId = 0"
  ></show-fees>
</template>
<script setup>
import { Files, Document } from "@element-plus/icons-vue";
import { ref, computed } from "vue";
import ShowFees from "./Actions/ShowFees.vue";
import { useRouter } from "vue-router";
import store from "../../../../store";
import {debounce} from "lodash";

const router = useRouter();

let showDialog = ref(false);
let lotId = ref(0);
const tableHeader = [
  { id: "0", type: "index", name: "#", prop: "id" },
  { id: "1", name: "Full Name", prop: "fullName" },
  { id: "2", name: "Subdivision", prop: "subdivisionName" },
  { id: "3", name: "Address", prop: "address" },
];

store.dispatch("dues_fees/getDueFees");
let tableData = computed(() => store.state.dues_fees.dues_fees);
let dueFeeLoading = computed(() => store.state.dues_fees.dues_fees.loading);
const search = ref("");
const filterTableData = computed(() => tableData.value.data);
console.log(tableData.value.data);

let searchDueFee = debounce(function () {
  store
    .dispatch("dues_fees/getSearchDueFees", { data: search.value, label: 1 })
    .then(() => (tableData = computed(() => store.state.dues_fees.dues_fees)))
    .catch((err) => console.log(err));
}, 1000);

let label=1;
async function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  if (search.value !== "") {
    await store.dispatch("dues_fees/getSearchDueFees", {
      data: search.value,
      label: Number(link.url),
    });
  } else {
    if(link.label == 'Next &raquo;'){
      await store.dispatch("dues_fees/getDueFees", { url: Number(1 + label) });
      label++;
      return;
    }
    if(link.label == '&laquo; Previous'){
      await store.dispatch("dues_fees/getDueFees", { url: Number(label - 1) });
      label--;
      return;
    }
    await store.dispatch("dues_fees/getDueFees", { url: link.label });
  }
}

function showAllDue(row) {
  lotId.value = row.id;
  showDialog.value = true;
}

function otherFees(row) {
  router.push({
    name: "MemberFees",
    params: {
      id: row.id,
      name: row.fullName,
      address: `${row.subdivisionName} ${row.address}`,
    },
  });
}
</script>

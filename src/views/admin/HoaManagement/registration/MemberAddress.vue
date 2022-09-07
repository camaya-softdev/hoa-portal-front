<template>
  <page-component
    navTitle="Member Management"
    navContent="Member Registration"
    navLink="MemberRegistration"
    navChildContent="Member Property"
    :navName="addressEmail"
  >
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addProperty = true"
        >Add Member Property</el-button
      >
    </template>
    <template v-slot:content>
      <div
        v-if="lotLoading"
        v-loading.fullscreen.lock="lotLoading"
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
        <el-table-column align="right" fixed="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="180" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Edit Member Address" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editModal(scope.row)"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                content="Delete Member Address"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteProperty(scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <router-link
          :to="{ name: 'MemberRegistration' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
  <add-member-address
    :add-property="addProperty"
    :subdivisionData="subdivisionData"
    :agentData="agentData"
    @closeModal="addProperty = false"
  ></add-member-address>
  <edit-member-address
    v-if="editId !== 0"
    :edit-property="editProperty"
    :subdivisionData="subdivisionData"
    :agentData="agentData"
    :edit-id="editId"
    @closeModal="editProperty = false"
    @editId="editId = 0"
  ></edit-member-address>
</template>
<script setup>
import { ref, computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import AddMemberAddress from "./Actions/AddMemberAddress.vue";
import EditMemberAddress from "./Actions/EditMemberAddress.vue";
import store from "../../../../store";
import _ from "lodash";

import { useRoute } from "vue-router";

let addProperty = ref(false);
let editProperty = ref(false);
const route = useRoute();
const editId = ref(0);
const addressEmail = route.params.email;

const tableHeader = [
  { id: "1", type: "index", name: "#", prop: "id" },
  { id: "2", name: "Subdivision Name", prop: "hoa_subd_name" },
  {
    id: "4",
    name: "House Number",
    prop: "hoa_subd_lot_house_num",
  },
  {
    id: "3",
    name: "Street Name",
    prop: "hoa_subd_lot_street_name",
  },
  { id: "5", name: "Block #", prop: "hoa_subd_lot_block" },
  { id: "6", name: "Lot #", prop: "hoa_subd_lot_num" },
  { id: "7", name: "Lot Area (SQM)", prop: "hoa_subd_lot_area" },
  { id: "8", name: "Sales Agent", prop: "hoa_sales_agent_name" },
  {
    id: "9",
    name: "Sales Agent Contact Number",
    prop: "hoa_sales_agent_contact_number",
  },
];

store.dispatch("lot/getLots", route.params.id);
store.dispatch("lot/getLotSubdivision");
store.dispatch("lot/getLotAgent");

const subdivisionData = computed(() => store.state.lot.lotSubdivision);
const agentData = computed(() => store.state.lot.lotAgent);
const tableData = computed(() => store.state.lot.lot);
const lotLoading = computed(() => store.state.lot.lot.loading);

const search = ref("");

const filterTableData = computed(() =>
  tableData.value.data.filter(
    (data) =>
      !search.value ||
      data.hoa_subd_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

function editModal(row) {
  editId.value = row.id;
  editProperty.value = true;
}

async function deleteProperty(row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("lot/deleteLot", row.id);
      if (res.status === 204 || res.status === 200) {
        await store.dispatch("lot/getLots", route.params.id);
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The lot data was successfully deleted",
        });
      }
    } catch (err) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "error",
        message:
          "Since there are data connected to this property.\n" +
          "It will not be deleted!",
      });
    }
  }
}
function disableSubdivision(survey) {
  if (confirm(`Are you sure you want to disable this data?`)) {
  }
}
</script>

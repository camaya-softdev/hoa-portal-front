<template>
  <page-component navTitle="Admin Management" navContent="Sales Agent">
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addAgent = true"
      >
        Add Sales Agent
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="agentLoading"
        v-loading.fullscreen.lock="agentLoading"
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
        :row-class-name="tableRowClassName"
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
            <el-input
              v-model="search"
              @keyup="searchAgent"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover
              placement="top-start"
              title="Action"
              :width="200"
              trigger="hover"
            >
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip
                content="Edit Sales Agent"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="success"
                  :icon="Edit"
                  @click="editModal(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                v-if="scope.row.hoa_sales_agent_status === 1"
                content="Disabled Agent"
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
                content="Enabled Agent"
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
                content="Delete Sales Agent"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteAgent(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <pagination :tableData="tableData" @getForPage="getForPage" />
    </template>
  </page-component>
  <add-agent :add-agent="addAgent" @close-modal="addAgent = false"></add-agent>
  <edit-agent
    v-if="editId !== 0"
    :editId="editId"
    :edit-agent="editAgent"
    @close-modal="editAgent = false"
    @editId="editId = 0"
  ></edit-agent>
</template>
<script setup>
import { ref, computed } from "vue";
import AddAgent from "./Actions/AddAgent.vue";
import EditAgent from "./Actions/EditAgent.vue";
import { Edit, Delete, Lock, Unlock } from "@element-plus/icons-vue";
import store from "../../../../store";
import { debounce } from "lodash";

let addAgent = ref(false);
let editAgent = ref(false);

const tableHeader = [
  { id: "0", type: "index", name: "#", prop: "id" },
  {
    id: "1",
    name: "Email Address",
    prop: "hoa_sales_agent_email",
  },
  { id: "2", name: "Last Name", prop: "hoa_sales_agent_lname" },
  { id: "3", name: "First Name", prop: "hoa_sales_agent_fname" },
  { id: "4", name: "Middle Name", prop: "hoa_sales_agent_mname" },
  { id: "5", name: "Suffix", prop: "hoa_sales_agent_suffix" },
  {
    id: "6",
    name: "Contact Number",
    prop: "hoa_sales_agent_contact_number",
  },
  {
    id: "7",
    name: "Sales Director",
    prop: "hoa_sales_agent_supervisor",
  },
];

store.dispatch("agent/getAgents");
const agentLoading = computed(() => store.state.agent.agent.loading);
let tableData = computed(() => store.state.agent.agent);

const search = ref("");
const filterTableData = computed(() => tableData.value.data);

let searchAgent = debounce(function () {
  store
    .dispatch("agent/getSearchAgents", { data: search.value, url: 1 })
    .then(() => (tableData = computed(() => store.state.agent.agent)))
    .catch((err) => alert(err));
}, 1000);

const tableRowClassName = ({ row, rowIndex }) => {
  //change table row to  red if the agent is disable
  if (row.hoa_sales_agent_status === 0) {
    return "danger-row";
  }
  return "";
};

const editId = ref(0);

function editModal(index, row) {
  editId.value = row.id;

  editAgent.value = true;
}

async function changeStatus(index, row) {
  if (confirm(`Are you sure you want to update agents data status?`)) {
    try {
      const res = await store.dispatch("agent/changeStatus", row.id);
      if (res.status === 204) {
        await store.dispatch("agent/getAgents");
        store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The agent data status was successfully updated",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}

async function deleteAgent(index, row) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
    try {
      const res = await store.dispatch("agent/deleteAgent", row.id);
      if (res.status === 204) {
        await store.dispatch("agent/getAgents");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The privilege data was successfully deleted",
        });
      }
    } catch (err) {
      throw err;
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
    await store.dispatch("member/getSearchAgents", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    if (link.label == "Next &raquo;") {
      await store.dispatch("agent/getAgents", { url: Number(1 + label) });
      label++;
      return;
    }
    if (link.label == "&laquo; Previous") {
      await store.dispatch("agent/getAgents", { url: Number(label - 1) });
      label--;
      return;
    }
    await store.dispatch("agent/getAgents", { url: link.label });
  }
}
</script>

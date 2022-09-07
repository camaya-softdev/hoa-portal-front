<template>
  <page-component
    navTitle="Member Management"
    navContent="Email Management"
    navLink="Messages"
    navChildContent="Email Template"
  >
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addMessage = true"
        >Add Email Template</el-button
      >
    </template>
    <template v-slot:content>
      <div
        v-if="communicationLoading"
        v-loading.fullscreen.lock="communicationLoading"
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
        <el-table-column type="index" prop="id" label="#"></el-table-column>
        <el-table-column
          sortable
          label="Template Name"
          prop="hoa_comm_template_name"
        ></el-table-column>
        <el-table-column
          sortable
          label="Template Title"
          prop="hoa_comm_template_title"
        ></el-table-column>
        <el-table-column
          sortable
          label="Template Title"
          prop="hoa_comm_template_subject"
        ></el-table-column>
        <el-table-column
          sortable
          label="Template Message"
          prop="hoa_comm_template_message"
        ></el-table-column>

        <el-table-column align="right" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchCommunication"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="180" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Edit Email Template" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editModal(scope.row)"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                content="Delete Email Template"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteTemplate(scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <router-link
          :to="{ name: 'Messages' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
  <add-message-template
    :add-message="addMessage"
    @closeModal="addMessage = false"
  ></add-message-template>
  <edit-message-template
    v-if="editId !== 0"
    :edit-message="editMessage"
    :edit-id="editId"
    @editId="editId = 0"
    @closeModal="editMessage = false"
  ></edit-message-template>
</template>
<script setup>
import { ref, computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import Pagination from "../../../../components/Pagination.vue";
import RichTextEditor from "../../../../components/RichTextEditor.vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import AddMessageTemplate from "./Actions/AddMessageTemplate.vue";
import EditMessageTemplate from "./Actions/EditMessageTemplate.vue";
import store from "../../../../store";
import _ from "lodash";

let addMessage = ref(false);
let editMessage = ref(false);

let editId = ref(0);
store.dispatch("communication/getCommunications");
let tableData = computed(() => store.state.communication.communication);
let communicationLoading = computed(
  () => store.state.communication.communication.loading
);

const search = ref("");

const filterTableData = computed(() => tableData.value.data);

let searchCommunication = _.debounce(function () {
  store
    .dispatch("communication/getSearchCommunications", search.value, {
      url: null,
    })
    .then(() => (tableData = computed(() => store.state.communication.communication)))
    .catch((err) => console.log(err));
}, 1000);

// function content(value){

//   return JSON.parse(value)
// }

function editModal(row) {
  editId.value = row.id;

  editMessage.value = true;
}

async function deleteTemplate(row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("communication/deleteCommunication", row.id);
      if (res.status === 204 || res.status === 200) {
        await store.dispatch("template/getTemplates");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The email template data was successfully deleted",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
async function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  if (search.value !== "") {
    await store.dispatch("communication/getSearchCommunications", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    await store.dispatch("communication/getCommunications", {
      url: link.label,
    });
  }
}
</script>

<template>
  <page-component
    navTitle="Member Management"
    navContent="Autogate Management"
    navLink="Autogate"
    navChildContent="Autogate Template"
  >
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addTemplate = true"
      >
        Add Autogate Template
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="templateLoading"
        v-loading.fullscreen.lock="templateLoading"
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
          prop="hoa_autogate_template_name"
        ></el-table-column>
        <el-table-column
          sortable
          label="Bacgkround Image Name"
          prop="background_image_name"
        ></el-table-column>
        <el-table-column
          sortable
          label="Template Third Page"
          prop="hoa_autogate_template_third_page"
        ></el-table-column>
        <el-table-column
          sortable
          label="Template Footer Third Page"
          prop="hoa_autogate_template_footer_third_page"
        ></el-table-column>
        <el-table-column align="right" width="180" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchTemplate"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="180" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip
                content="Edit Autogate Template"
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
              content="Preview Autogate Template"
              placement="bottom"
              effect="light"
            >
              <el-button
                size="small"
                type="primary"
                :icon="View"
                @click="previewTemplate(scope.row)"
              ></el-button>
            </el-tooltip>

              <!--              <el-tooltip-->
              <!--                content="Delete Autogate Template"-->
              <!--                placement="bottom"-->
              <!--                effect="light"-->
              <!--              >-->
              <!--                <el-button-->
              <!--                  size="small"-->
              <!--                  type="danger"-->
              <!--                  :icon="Delete"-->
              <!--                  @click="deleteTemplate(scope.row)"-->
              <!--                ></el-button-->
              <!--              ></el-tooltip>-->

              <!--              <el-tooltip content="Add Template Message" placement="bottom" effect="light">-->
              <!--                <el-button-->
              <!--                  size="small"-->
              <!--                  type="primary"-->
              <!--                  :icon="ChatDotSquare"-->
              <!--                  @click="addMessage(scope.row)"-->
              <!--                ></el-button>-->
              <!--              </el-tooltip>-->
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6 opacity-80">
        <router-link
          :to="{ name: 'Autogate' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
  <add-autogate-template
    :add-template="addTemplate"
    :background-data="backgroundData"
    @searchBackground="searchBackground"
    @closeModal="addTemplate = false"
  ></add-autogate-template>
  <edit-autogate-template
    v-if="editId !== 0"
    :edit-template="editTemplate"
    :background-data="backgroundData"
    :edit-id="editId"
    @editId="editId = 0"
    @searchBackground="searchBackground"
    @closeModal="editTemplate = false"
  ></edit-autogate-template>
<welcome
  v-if="showPreviewId !== 0"
  :show-preview-template="showPreviewTemplate"
  :show-preview-id="showPreviewId"
  @showPreviewId="showPreviewId = 0"
  @closeModal = "showPreviewTemplate = false"
></welcome>
</template>
<script setup>
import { ref, computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import Pagination from "../../../../components/Pagination.vue";
import { Edit, Delete,View } from "@element-plus/icons-vue";
import AddAutogateTemplate from "./Actions/AddAutogateTemplate.vue";
import EditAutogateTemplate from "./Actions/EditAutogateTemplate.vue";
import Welcome from "./Preview/Kiosk/Welcome.vue";
import store from "../../../../store";
import _ from "lodash";
import { useRouter } from "vue-router";

const router = useRouter();
let addTemplate = ref(false);
let editTemplate = ref(false);
let showPreviewTemplate = ref(false);
let showPreviewId = ref(0);
let editId = ref(0);
store.dispatch("template/getTemplates", 1);
store.dispatch("background_image/getBackgroundImages");
let tableData = computed(() => store.state.template.template);
let templateLoading = computed(() => store.state.template.template.loading);
let backgroundData = computed(() => store.state.background_image.backgroundImage.data);
const search = ref("");

const filterTableData = computed(() => tableData.value.data);

let searchTemplate = _.debounce(function () {
  store
    .dispatch("template/getSearchTemplates", { data: search.value, url: 1 })
    .then(() => (tableData = computed(() => store.state.template.template)))
    .catch((err) => console.log(err));
}, 1000);

let searchBackground = _.debounce(function (background) {
  store
    .dispatch("background_image/getSearchBackgroundImages", {
      data: background,
      url: 1,
    })
    .then(
      () =>
        (backgroundData = computed(
          () => store.state.background_image.backgroundImage.data
        ))
    )
    .catch((err) => console.log(err));
}, 1000);

function content(value) {
  return JSON.parse(value);
}

function editModal(row) {
  editId.value = row.id;
  editTemplate.value = true;
}
function previewTemplate(row){
  showPreviewId.value = row.id;
  showPreviewTemplate.value = true
}
function addMessage(row) {
  router.push({ name: "TemplateMessage", params: { id: row.id } });
}

async function deleteTemplate(row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("template/deleteTemplate", row.id);
      if (res.status === 204 || res.status === 200) {
        await store.dispatch("template/getTemplates", 1);
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The autogate template data was successfully deleted",
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
    await store.dispatch("template/getSearchTemplates", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    await store.dispatch("template/getTemplates", { url: link.label });
  }
}
</script>

<template>
  <page-component
    navTitle="Member Management"
    navContent="Autogate Template"
    navLink="AutogateTemplate"
    navChildContent="Background Image"
  >
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addBackground = true"
        >Add Background Image</el-button
      >
    </template>
    <template v-slot:content>
      <div
        v-if="backgroundImageLoading "
        v-loading.fullscreen.lock="backgroundImageLoading "
        element-loading-text="Fetching Data..."
      ></div>
      <el-table
        v-else
        align="center"
        header-align="center"
        :data="filterTableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          sortable
          label="ID"
          prop="id"
          width="180"
        ></el-table-column>
        <el-table-column
          sortable
          label="Background Image Name"
          prop="hoa_background_name"
          width="180"
        ></el-table-column>
        <el-table-column sortable label="Background Image" width="300">
          <template #default="scope">
            <div>
              <img
                :src="scope.row.hoa_background_image"
                :alt="scope.row.hoa_background_image"
                class="w-64 h-48 object-cover"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column align="right" width="180" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchBackground"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
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
                content="Edit Background Image"
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
                content="Delete Background Image"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteBackground(scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <router-link
          :to="{ name: 'Autogate' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
  <add-background
    :add-background="addBackground"
    @closeModal="addBackground = false"
  ></add-background>
  <edit-background
    v-if="editId !== 0"
    :edit-background="editBackground"
    :edit-id="editId"
    @editId="editId = 0"
    @closeModal="editBackground = false"
  ></edit-background>
</template>
<script setup>
import { ref, computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import Pagination from "../../../../components/Pagination.vue";
import RichTextEditor from "../../../../components/RichTextEditor.vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import AddBackground from "./Actions/AddBackground.vue";
import EditBackground from "./Actions/EditBackground.vue";
import store from "../../../../store";
import _ from "lodash";
import { useRouter } from "vue-router";

const router = useRouter();
let addBackground = ref(false);
let editBackground = ref(false);
let editId = ref(0);
store.dispatch("background_image/getBackgroundImages");
let tableData = computed(() => store.state.background_image.backgroundImage);
let backgroundImageLoading = computed(() => store.state.background_image.backgroundImage.loading);

const search = ref("");

const filterTableData = computed(() => tableData.value.data);

let searchBackground = _.debounce(function () {
  store
    .dispatch("background_image/getSearchBackgroundImages", { data: search.value, url: 1 })
    .then(() => (tableData = computed(() => store.state.template.template)))
    .catch((err) => console.log(err));
}, 1000);


function editModal(row) {
  editId.value = row.id;
  editBackground.value = true;
}

// function addMessage(row) {
//   router.push({ name: "TemplateMessage", params: { id: row.id } });
// }

async function deleteBackground(row) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
    try {
      const res = await store.dispatch("background_image/deleteBackgroundImage", row.id);
      if (res.status === 204 || res.status === 200) {
        await store.dispatch("background_image/getBackgroundImages");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The background image data was successfully deleted",
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
    await store.dispatch("background_image/getSearchBackgroundImages", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    await store.dispatch("background_image/getBackgroundImages", { url: link.label });
  }
}
</script>

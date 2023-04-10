<template>
  <page-component navTitle="Member Management" navContent="Event">
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addAnnouncement = true"
      >
        Add Event
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="announcementLoading"
        v-loading.fullscreen.lock="announcementLoading"
        element-loading-text="Fetching Data..."
      ></div>

      <el-table
        align="center"
        header-align="center"
        :data="filterTableData"
        style="width: 100%; overflow-x: auto"
        table-layout="auto"
      >
        <el-table-column type="index" label="#" prop="id"></el-table-column>
        <el-table-column
          sortable
          label="Title"
          prop="hoa_event_notices_title"
        ></el-table-column>
        <el-table-column
          sortable
          label="Description"
          prop="hoa_event_notices_desc"
        ></el-table-column>
        <el-table-column sortable label="Subdivision">
          <template #default="scope">
            <el-tag
              class="ml-2 mb-2"
              effect="dark"
              v-for="subdivisionData in scope.row.subdivision"
              :key="subdivisionData.id"
              >{{ subdivisionData.hoa_subd_name }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column sortable label="Type">
          <template #default="scope">
            <el-tag effect="dark" disable-transitions>{{
              scope.row.hoa_event_notices_type
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          sortable
          label="Date Added"
          prop="created_at"
          width="180"
        ></el-table-column>
        <el-table-column align="right" width="180" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              @keyup="searchAnnouncement"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="200" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>

              <el-tooltip content="Full Story" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="warning"
                  :icon="Document"
                  @click="fullStory(scope.row)"
                ></el-button
              ></el-tooltip>

              <el-tooltip content="Edit Event" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editModal(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Delete Event" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteAnnouncent(scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
    </template>
  </page-component>
  <add-announcement
    :add-announcement="addAnnouncement"
    :subdivisionData="subdivisionData"
    @closeModal="addAnnouncement = false"
  ></add-announcement>
  <edit-announcement
    v-if="editId !== 0"
    :edit-announcement="editAnnouncement"
    :subdivisionData="subdivisionData"
    @closeModal="editAnnouncement = false"
    :edit-id="editId"
    @editId="editId = 0"
  ></edit-announcement>
</template>
<script setup>
import { ref, computed } from "vue";
import { Edit, Delete, Document } from "@element-plus/icons-vue";
import AddAnnouncement from "./Actions/AddAnnouncement.vue";
import { useRouter } from "vue-router";
import EditAnnouncement from "./Actions/EditAnnouncement.vue";
import store from "../../../../store";
import {debounce} from "lodash";

const router = useRouter();
let addAnnouncement = ref(false);
let editAnnouncement = ref(false);
const editId = ref(0);

store.dispatch("announcement/getAnnouncements");
store.dispatch("user/getShowSubdivision");

const subdivisionData = computed(() => store.state.user.user_subdivision);

let tableData = computed(() => store.state.announcement.announcement);
const announcementLoading = computed(() => store.state.announcement.announcement.loading);
const search = ref("");

const filterTableData = computed(() => tableData.value.data);

let searchAnnouncement = debounce(function () {
  store
    .dispatch("announcement/getSearchAnnouncements", {
      data: search.value,
      url: 1,
    })
    .then(() => (tableData = computed(() => store.state.announcement.announcement)))
    .catch((err) => console.log(err));
}, 1000);

function editModal(row) {
  editId.value = row.id;
  editAnnouncement.value = true;
}

async function deleteAnnouncent(row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("announcement/deleteAnnouncement", row.id);
      if (res.status === 204 || res.status === 200) {
        await store.dispatch("announcement/getAnnouncements");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The announcement data was successfully deleted",
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
    await store.dispatch("announcement/getSearchAnnouncements", {
      data: search.value,
      label: Number(link.label),
    });
  } else {
    if(link.label == 'Next &raquo;'){
      await store.dispatch("announcement/getAnnouncements", { url: Number(1 + label) });
      label++;
      return;
    }
    if(link.label == '&laquo; Previous'){
      await store.dispatch("announcement/getAnnouncements", { url: Number(label - 1) });
      label--;
      return;
    }
    await store.dispatch("announcement/getAnnouncements", { url: Number(link.label) });
  }
}
function fullStory(row) {
  router.push({ name: "FullStory", params: { id: row.id } });
}
</script>

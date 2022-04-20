<template>
  <page-component navTitle="Member Management" navContent="Announcement">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addAnnouncement = true"
        >Add Announcement</el-button
      >
    </template>
    <template v-slot:content>
      <el-table
        align="center"
        header-align="center"
        :data="filterTableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          sortable
          v-for="header in tableHeader"
          :key="header.id"
          :prop="header.prop"
          :label="header.name"
          :width="header.width"
        ></el-table-column>
        <el-table-column align="right" width="130" fixed="right">
          <template #header>
            <el-input
              v-model="search"
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
                content="Full Story"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="warning"
                  :icon="Document"
                  @click="fullStory"
                ></el-button
              ></el-tooltip>

              <el-tooltip
                content="Edit Announcement"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editAnnouncement = true"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Delete Announcement"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteAnnouncent"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </page-component>
  <add-announcement
    :add-announcement="addAnnouncement"
    @closeModal="addAnnouncement = false"
  ></add-announcement>
  <edit-announcement
    :edit-announcement="editAnnouncement"
    @closeModal="editAnnouncement = false"
  ></edit-announcement>
</template>
<script setup>
import { ref, computed } from "vue";
import { Edit, Delete,Document } from "@element-plus/icons-vue";
import PageComponent from "../../../../components/PageComponent.vue";
import AddAnnouncement from "./Actions/AddAnnouncement.vue";
import {useRouter} from "vue-router"
import EditAnnouncement from "./Actions/EditAnnouncement.vue";

const router = useRouter()
const addAnnouncement = ref(false);
const editAnnouncement = ref(false);
const tableHeader = [
  { id: "0", name: "Title", prop: "title", width: "240" },
  { id: "1", name: "Description", prop: "description", width: "240" },
  { id: "2", name: "Subdivision", prop: "subdivision", width: "400" },
  { id: "3", name: "Type", prop: "type", width: "180" },
  { id: "4", name: "Date Added", prop: "dateAdded", width: "180" },
];

const tableData = [
  {
    id: "0",
    title: "Corregidor Day Tour",
    description: "Corregidor Day Tour now available",
    subdivision:
      "Bayu Peak, Mont Kiarra Phase 1, Menara Point North, Taman Ridge",
    type: "News",
    dateAdded: "February 25, 2022",
  },
  {
    id: "1",
    title: "Valentines at Camaya",
    description: "Valentines day promo",
    subdivision:
      "Bayu Peak, Mont Kiarra Phase 1, Menara Point North, Taman Ridge",
    type: "Event",
    dateAdded: "January 30, 2022",
  },
  {
    id: "2",
    title: "Vaccination",
    description: "Vaccination Schedule",
    subdivision: "Bayu Peak",
    type: "Event",
    dateAdded: "January 15, 2022",
  },
];

const search = ref("");

const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()) ||
      data.subdivision.toLowerCase().includes(search.value.toLowerCase()) ||
      data.description.toLowerCase().includes(search.value.toLowerCase())
  )
);

function deleteAnnouncent() {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
  }
}

function fullStory() {
  router.push({name:'FullStory'})
}

</script>

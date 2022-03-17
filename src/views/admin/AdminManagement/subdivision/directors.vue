<template>
  <page-component navTitle="Subdivision" navContent="Board Of Directors">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addDirectors = true"
        >Add Board Of Directors</el-button
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
        <el-table-column align="right" width="180" fixed="right">
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
              :width="180"
              trigger="hover"
            >
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip
                content="Edit Board of Directors"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editDirectors = true"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                content="Delete Board of Directors"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteBoardOfDirectors"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <router-link
          :to="{ name: 'Subdivision' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
  <add-directors :add-directors="addDirectors" @closeModal="addDirectors = false"></add-directors>
  <edit-directors :edit-directors="editDirectors" @closeModal="editDirectors = false"></edit-directors>
</template>
<script setup>

import { ref,computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import {Edit,Delete} from "@element-plus/icons-vue";
import AddDirectors from "./Actions/AddDirectors.vue";
import EditDirectors from "./Actions/EditDirectors.vue";


const addDirectors = ref(false);
const editDirectors = ref(false);

const tableHeader = [
  { id: "1", name: "ID", prop: "id", width: "180" },
  { id: "2", name: "Name", prop: "name", width: "240" },
  { id: "3", name: "Decription", prop: "desc", width: "240" },
  { id: "4", name: "Position", prop: "position", width: "240" },
];

const tableData = [
  {
    id: "1",
    id: "1",
    name: "Francisco Felizardo",
    desc: "",
    position: "President",
  },
  {
    id: "2",
    id: "2",
    name: "Rolando Tigas",
    desc: "",
    position: "Vice President",
  },
  { id: "2", id: "2", name: "Celeste Canoza", desc: "", position: "Treasurer" },
];

const search = ref("");

const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.emailAddress.toLowerCase().includes(search.value.toLowerCase()) ||
      data.lastName.toLowerCase().includes(search.value.toLowerCase())
  )
);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
function deleteBoardOfDirectors(survey) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
  }
}
</script>

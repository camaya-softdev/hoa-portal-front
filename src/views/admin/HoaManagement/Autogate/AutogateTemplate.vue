<template>
  <page-component navTitle="Autogate Management" navContent="Autogate Template">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addTemplate = true"
        >Add Autogate Template</el-button
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
              <el-tooltip content="Edit Autogate Template" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editTemplate = true"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                content="Delete Autogate Template"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteSubdivision"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
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
  <add-autogate-template :add-template="addTemplate" @closeModal="addTemplate = false"></add-autogate-template>
  <edit-autogate-template :edit-template="editTemplate" @closeModal="editTemplate = false"></edit-autogate-template>
</template>
<script setup>
import { ref,computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import {Edit,Delete} from "@element-plus/icons-vue";
import AddAutogateTemplate from "./Actions/AddAutogateTemplate.vue"
import EditAutogateTemplate from "./Actions/EditAutogateTemplate.vue"

const addTemplate = ref(false);
const editTemplate = ref(false);

const tableHeader = [
  { id: "0", name: "Template Name",prop:'title',width:'180' },
  { id: "1", name: "Statement Account",prop:'description',width:'240' },
  { id: "2", name: "Message Subject",prop:'subdivision',width:'240' },
  { id: "3", name: "Message Template",prop:'type',width:'240' },

];

const tableData = [
  {
    id: "0",
    title: "SOA",
    description: "Statement of Account",
    subdivision: "Statement of Account",
    type: "Billing",
  },
  {
    id: "1",
    title: "Birthday Greeting",
    description: "HAPPY BIRTHDAY!!!",
    subdivision: "It's YOUR Birthday!!!",
    type: "We wish you a Happy Birthday!",
  },
  {
    id: "3",
    title: "Pawikan Hatchlings",
    description: "Announcement: Release of Pawikan Hatchlings",
    subdivision: "Camaya Coast Pawikan Hatchlings",
    type: "Release of Pawikan Hatchlings",
  },
];

const search = ref("");

const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase())
  )
);


function deleteSubdivision() {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
  }
}

</script>

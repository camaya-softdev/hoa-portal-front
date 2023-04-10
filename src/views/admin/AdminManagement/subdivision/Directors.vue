<template>
  <page-component
    navTitle="Admin Management"
    navContent="Subdivision Management"
    navLink="Subdivision"
    navChildContent="Board Of Directors"
    :navName="directorsName"
  >
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addDirectors = true"
      >
        Add Board Of Directors
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="directorLoading"
        v-loading.fullscreen.lock="directorLoading"
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
              <el-tooltip
                content="Edit Board of Directors"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editModal(scope.$index, scope.row)"
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
                  @click="deleteBoardOfDirectors(scope.$index, scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6 opacity-80">
        <router-link
          :to="{ name: 'Subdivision' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
  <add-directors
    :add-directors="addDirectors"
    :options="options"
    :showPerson="showPerson"
    @closeModal="addDirectors = false"
  ></add-directors>
  <edit-directors
    v-if="editId !== 0"
    :options="options"
    :edit-directors="editDirectors"
    :showPerson="showPerson"
    :editId="editId"
    @closeModal="editDirectors = false"
    @editId="editId = 0"
  ></edit-directors>
</template>
<script setup>
import { ref, computed } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import AddDirectors from "./Actions/AddDirectors.vue";
import EditDirectors from "./Actions/EditDirectors.vue";
import store from "../../../../store";
import { useRoute } from "vue-router";

let addDirectors = ref(false);
let editDirectors = ref(false);
const route = useRoute();
const directorsName = route.params.name;

const tableHeader = [
  { id: "1", type: "index", prop: "id", width: "180" },
  { id: "2", name: "Name", prop: "fullName", width: "600" },
  { id: "3", name: "Decription", prop: "hoa_bod_desc", width: "600" },
  { id: "4", name: "Position", prop: "hoa_bod_position", width: "600" },
];

const options = [
  {
    label: "None",
    value: 0,
  },
  {
    label: "Subdivision Admin",
    value: 2,
  },
];
store.dispatch("director/getDirectors", route.params.id);
store.dispatch("director/getShowPerson", route.params.id);
const showPerson = computed(() => store.state.director.directorPerson.data);
const directorLoading = computed(() => store.state.director.director.loading);
const tableData = computed(() => store.state.director.director);

const search = ref("");

const filterTableData = computed(() =>
  tableData.value.data.filter(
    (data) =>
      !search.value || data.fullName.toLowerCase().includes(search.value.toLowerCase())
  )
);

const editId = ref(0);

function editModal(index, row) {
  editId.value = row.id;
  editDirectors.value = true;
}

async function deleteBoardOfDirectors(index, row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("director/deleteDirector", row.id);
      if (res.status === 204) {
        await store.dispatch("director/getDirectors", route.params.id);
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The board of directors data was successfully deleted",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
</script>

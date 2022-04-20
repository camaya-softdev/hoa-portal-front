<template>
  <page-component
    navTitle="Admin Management"
    navContent="Subdivision Management"
  >
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addSubdivision = true"
        >Add Subdivision</el-button
      >
    </template>
    <template v-slot:content>
      <div
        v-if="subdivisionLoading"
        v-loading.fullscreen.lock="subdivisionLoading"
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
              title="Extension of Subdivision"
              :width="200"
              trigger="hover"
            >
              <template #reference>
                <el-button round>Extension</el-button>
              </template>
              <el-tooltip content="Fees" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="warning"
                  :icon="CreditCard"
                  @click="fees"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Board Of Directors"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="Cellphone"
                  @click="boardofdirectors"
                ></el-button>
              </el-tooltip>
            </el-popover>
            <el-popover
              placement="top-start"
              title="Action"
              :width="100"
              trigger="hover"
            >
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip
                content="Edit Subdivision"
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
                content="Delete Subdivision"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteSubdivision(scope.$index, scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-center mt-5">
        <nav
          class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <a
            v-for="(link, i) of tableData.links"
            :key="i"
            :disabled="!link.url"
            href="#"
            @click="getForPage($event, link)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
            :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
              i === tableData.links.length - 1 ? 'rounded-r-md' : '',
            ]"
            v-html="link.label"
          >
          </a>
        </nav>
      </div>
    </template>

  </page-component>
  <add-subdivision
    :add-subdivision="addSubdivision"
    :showEmail="showEmail"
    @closeModal="addSubdivision = false"
  ></add-subdivision>
  <edit-subdivision
    v-if="editId !== 0"
    :edit-subdivision="editSubdivision"
    :editId="editId"
    :showEmail="showEmail"
    @closeModal="editSubdivision = false"
    @editId="editId = 0"
  ></edit-subdivision>
</template>
<script setup>
import { ref, computed } from "vue";
import { Edit, Delete, Cellphone, CreditCard } from "@element-plus/icons-vue";
import PageComponent from "../../../../components/PageComponent.vue";
import AddSubdivision from "./Actions/AddSubdivision.vue";
import EditSubdivision from "./Actions/EditSubdivision.vue";
import { useRouter } from "vue-router";
import store from "../../../../store";

const router = useRouter();

let addSubdivision = ref(false);
let editSubdivision = ref(false);

const tableHeader = [
  { id: "0", name: "Subdivision ID", prop: "id", width: "180" },
  { id: "1", name: "Name", prop: "hoa_subd_name", width: "180" },
  { id: "2", name: "Area (SQM)", prop: "hoa_subd_area", width: "180" },
  {
    id: "3",
    name: "Total Block Number",
    prop: "hoa_subd_blocks",
    width: "180",
  },
  { id: "4", name: "Total Lot Number", prop: "hoa_subd_lots", width: "180" },
  { id: "11", name: "Contact Person", prop: "hoa_subd_contact_person", width: "180" },
  { id: "12", name: "Contact Number", prop: "hoa_subd_contact_number", width: "180" },
];

store.dispatch("subdivision/getSubdivisions");
store.dispatch("subdivision/getShowEmail");

const subdivisionLoading = computed(
  () => store.state.subdivision.subdivision.loading
);
let tableData = computed(() => store.state.subdivision.subdivision);
const showEmail = computed(() => store.state.subdivision.subdivisionEmail.data);
const search = ref("");


const filterTableData = computed(() =>
  tableData.value.data.filter(
    (data) =>
      !search.value ||
      data.hoa_subd_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const editId = ref(0);

function editModal(index, row) {
  editId.value = row.id;

  editSubdivision.value = true;
}

function boardofdirectors() {
  router.push({ name: "BoardOfDirectors" });
}

function fees() {
  router.push({ name: "Fees" });
}


async function deleteSubdivision(index, row) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
    try {
      const res = await store.dispatch("subdivision/deleteSubdivision", row.id);
      if (res.status === 204) {
        await store.dispatch("subdivision/getSubdivisions");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The subdivision data was successfully deleted",
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
  await store.dispatch("subdivision/getSubdivisions", { url: link.url });
}
</script>
<style scoped>
</style>

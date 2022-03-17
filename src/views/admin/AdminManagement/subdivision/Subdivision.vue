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
                  @click="editSubdivision = true"
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
    </template>
  </page-component>
  <add-subdivision
    :add-subdivision="addSubdivision"
    @closeModal="addSubdivision = false"
  ></add-subdivision>
  <edit-subdivision
    :edit-subdivision="editSubdivision"
    @closeModal="editSubdivision = false"
  ></edit-subdivision>
</template>
<script setup>
import { ref, computed } from "vue";
import { Edit, Delete, Cellphone, CreditCard } from "@element-plus/icons-vue";
import PageComponent from "../../../../components/PageComponent.vue";
import AddSubdivision from "./Actions/AddSubdivision.vue";
import EditSubdivision from "./Actions/EditSubdivision.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const addSubdivision = ref(false);
const editSubdivision = ref(false);
const tableHeader = [
  { id: "0", name: "Subdivision ID", prop: "subdivisionid", width: "180" },
  { id: "1", name: "Name", prop: "name", width: "180" },
  { id: "2", name: "Area (SQM)", prop: "area", width: "180" },
  {
    id: "3",
    name: "Total Block Number",
    prop: "totalBlockNumber",
    width: "180",
  },
  { id: "4", name: "Total Lot Number", prop: "totalLotNumber", width: "180" },
  { id: "11", name: "Contact Person", prop: "contactPerson", width: "180" },
  { id: "12", name: "Contact Number", prop: "contactNumber", width: "180" },
];

const tableData = [
  {
    subdivisionid: "1",
    name: "Bayu Peaks",
    area: "30,000",
    totalBlockNumber: "25",
    totalLotNumber: "166",
    contactPerson: "Francisco Felizardo",
    contactNumber: "09171234567",
  },
  {
    subdivisionid: "2",
    name: "Mont Kiarra Phase 1",
    area: "20,000",
    totalBlockNumber: "18",
    totalLotNumber: "111",
    contactPerson: "Roldan Laguna",
    contactNumber: "09171234567",
  },
  {
    subdivisionid: "3",
    name: "Menara Point North",
    area: "50,000",
    totalBlockNumber: "35",
    totalLotNumber: "277",
    contactPerson: "Juliet Guevara",
    contactNumber: "09171234567",
  },
];
const search = ref("");

const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

function boardofdirectors() {
  router.push({ name: "BoardOfDirectors" });
}

function fees() {
  router.push({ name: "Fees" });
}

function deleteSubdivision(survey) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
  }
}
function disableSubdivision(survey) {
  if (confirm(`Are you sure you want to disable this data?`)) {
  }
}
function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color-base);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

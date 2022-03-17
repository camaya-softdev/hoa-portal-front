<template>
  <page-component navTitle="Member Dues" navContent="Other Fees">
    <template v-slot:buttons>
      <span>1 = Felizardo Felizardo Cortez</span>
      <el-button class="button" type="text" @click="addFees = true"
        >Add Other Fees</el-button
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
              <el-tooltip content="Edit Fees" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editFees = true"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                content="Delete Fees"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="disableSubdivision"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <router-link
          :to="{ name: 'MemberDues' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
<add-other-fees :add-fees="addFees" @closeModal="addFees=false"></add-other-fees>
<edit-other-fees :edit-fees="editFees" @closeModal="editFees=false"></edit-other-fees>
</template>
<script setup>
import { ref,computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import AddOtherFees from "./Actions/AddOtherFees.vue"
import EditOtherFees from "./Actions/EditOtherFees.vue"


const addFees = ref(false);
const editFees = ref(false);

const tableHeader = [
  { id: "1", name: "Item", prop: "item", width: "300" },
  { id: "2", name: "Cost", prop: "cost", width: "300" },
  { id: "3", name: "Payment Schedule", prop: "paymentSchedule", width: "300" },
];

const tableData = [
  {id:'1',item:'Garbage Fees',cost:'300',paymentSchedule:'Monthly'}
];

const search = ref("");

const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.subfee.toLowerCase().includes(search.value.toLowerCase())
  )
);
function deleteSubdivision(survey) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
  }
}
function disableSubdivision() {
  if (confirm(`Are you sure you want to disable this data?`)) {
  }
}


</script>

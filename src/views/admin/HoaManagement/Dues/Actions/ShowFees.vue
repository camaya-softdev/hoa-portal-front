<template>
  <el-dialog
    v-model="showDialog"
    title="Show All Dues"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <div v-if="duefeeLoading">Loading...</div>
    <el-table
      v-else
      align="center"
      header-align="center"
      :data="filterTableData"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column sortable label="Item" prop="item" width="300"></el-table-column>
      <el-table-column sortable label="Cost" width="300">
        <template #default="scope">
          <div v-if="scope.row.unit_id === 1">
            {{ scope.row.cost * lotArea }}
          </div>
          <div v-if="scope.row.unit_id === 2">
            {{ scope.row.cost }}
          </div>
          <div v-if="scope.row.unit_id === 3">
            {{ scope.row.cost * designee + scope.row.cost }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        label="Schedule"
        prop="scheudle"
        width="300"
      ></el-table-column>
    </el-table>
    <h1 class="text-center text-lg m-3">Other Fees</h1>
    <div v-if="feesLoading">Loading...</div>
    <el-table
      v-else
      align="center"
      header-align="center"
      :data="filterTableDataTwo"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column
        sortable
        v-for="header in tableHeadertwo"
        :key="header.id"
        :prop="header.prop"
        :label="header.name"
        :width="header.width"
      ></el-table-column>
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
          @click="getForPagetwo($event, link)"
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
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeModal">Close</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";

const props = defineProps<{
  lotId: Number;
  showDialog: Boolean;
}>();

const emits = defineEmits(["closeModal", "lotId"]);

if (props.lotId !== 0) {
  store.dispatch("dues_fees/getDueSubdivisionLot", props.lotId);
  store.dispatch("fee/getFees", props.lotId);
}

function closeModal() {
  emits("closeModal");
  emits("lotId");
}

const duefeeLoading = computed(() => store.state.dues_fees.due_subdivision_lot.loading);
const tableData = computed(() => store.state.dues_fees.due_subdivision_lot.data);
const lotArea = computed(() => tableData.value.lot_area);
const designee = computed(() => tableData.value.designee);
const filterTableData = computed(() => tableData.value.dues);

const tableHeadertwo = [
  { id: "0", name: "Id", prop: "id", width: "220" },
  { id: "1", name: "Item", prop: "hoa_fees_item", width: "180" },
  { id: "2", name: "Cost", prop: "hoa_fees_cost", width: "180" },
  { id: "3", name: "Payment Schedule", prop: "schedule", width: "180" },
];

const tableDatatwo = computed(() => store.state.fee.fee);
const filterTableDataTwo = computed(() => tableDatatwo.value.data);
const feesLoading = computed(() => store.state.fee.fee.loading);

async function getForPagetwo(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  if (search.value !== "") {
    await store.dispatch("fee/getSearchFees", { url: link.url });
  } else {
    await store.dispatch("fee/getFees", { url: link.url });
  }
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      closeModal();
      done();
    })
    .catch(() => {});
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

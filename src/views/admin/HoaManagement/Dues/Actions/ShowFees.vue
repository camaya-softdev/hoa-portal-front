<template>
  <el-dialog
    v-model="showDialog"
    title="Show All Dues & Fees"
    width="50%"
    :before-close="handleClose"
    center
  >
     <el-table
        align="center"
        header-align="center"
        :data="tableData"
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
      </el-table>
      <h1 class="text-center text-lg m-3">Other Fees</h1>
       <el-table
        align="center"
        header-align="center"
        :data="tableDatatwo"
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
  <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="emits('closeModal')">Close</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessageBox } from "element-plus";

const tableHeader = [
  { id: "0", name: "Item",prop:'item',width:'220' },
  { id: "1", name: "Cost",prop:'cost',width:'180' },
  { id: "3", name: "Payment Schedule",prop:'paymentSchedule',width:'180' }
];

const tableData = [
  {
    item: "Association Dues",
    cost: "1500",
    paymentSchedule: "Monthly",

  },
    {
    item: "Membership Dues",
    cost: "1500",
    paymentSchedule: "Annually",

  },

];

const tableHeadertwo = [
  { id: "0", name: "Item",prop:'item',width:'220' },
  { id: "1", name: "Cost",prop:'cost',width:'180' },
  { id: "3", name: "Payment Schedule",prop:'paymentSchedule',width:'180' }
];

const tableDatatwo = [
  {
    item: "Garbage Fees",
    cost: "300",
    paymentSchedule: "Monthly",

  },
];


const props = defineProps<{
  showDialog: Boolean;
}>();
const emits = defineEmits(["closeModal"]);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      emits("closeModal");
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

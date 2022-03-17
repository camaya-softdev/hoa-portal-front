<template>
  <el-dialog
    v-model="editFees"
    title="Add Other Fees"
    width="50%"
    :before-close="handleClose"
    center
  >
    <el-form
      label-position="top"
      ref="formRef"
      :model="form"
      label-width="120px"
    >

      <el-form-item label="Item">
        <el-input
          v-model="form.item"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Cost">
        <el-input
          v-model="form.cost"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Payment Schedule">
        <el-select-v2
          v-model="form.paymentSchedule"
          :options="periodDateRecurrentOptions"
          placeholder="Please select Status"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emits('closeModal')">Cancel</el-button>
        <el-button type="primary" @click="emits('closeModal')"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessageBox } from "element-plus";

const props = defineProps<{
  editFees: Boolean;
}>();

const emits = defineEmits(["closeModal"]);

const form = reactive({
  item: "",
  cost: "",
  paymentSchedule: "",
});

const periodDateRecurrentInitials = [
  "Daily",
  "Monthly",
  "Annually",
  "Quarterly",
  "Onetime",
];

const periodDateRecurrentOptions = Array.from({
  length: periodDateRecurrentInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${periodDateRecurrentInitials[idx % 10]}`,
}));

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

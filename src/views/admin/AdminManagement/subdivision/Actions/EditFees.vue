<template>
  <el-dialog
    v-model="editFees"
    title="Edit Subdivision Fees"
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
      <el-form-item label="Subdivision Fees">
        <el-input
          v-model="form.subdivisionFees"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Unit">
        <el-input
          v-model="form.unit"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Payment Targets">
        <el-input
          v-model="form.paymentTargets"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Payment Schedule">
        <div class="demo-date-picker">
          <div
            class="block mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <el-date-picker
              v-model="form.periodStartDate"
              type="daterange"
              range-separator="To"
              start-placeholder="Payment Start date"
              end-placeholder="Payment End date"
            ></el-date-picker>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="Cut Off Date">
        <el-input
          v-model="form.cutOffDate"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Period Date Recurrent">
        <el-select-v2
          v-model="form.periodDateRecurrent"
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

const fileList = ref([{ name: "", url: "" }]);

const emits = defineEmits(["closeModal"]);

const form = reactive({
  subdivisionFees: "",
  unit: "",
  paymentTargets: "",
  periodStartDate: "",
  periodEndDate: "",
  periodDateRecurrent: "",
  cutOffDate: "",
  cost: "",
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

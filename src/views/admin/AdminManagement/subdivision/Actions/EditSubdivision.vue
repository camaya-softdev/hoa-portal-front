<template>
  <el-dialog
    v-model="editSubdivision"
    title="Edit Subdivision"
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
      <el-form-item label="Subdivision Name">
        <el-input
          v-model="form.name"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Area (SQM)">
        <el-input
          v-model="form.area"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Total Block Number">
        <el-input
          v-model="form.blockNumber"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Total Lot Number">
        <el-input
          v-model="form.lotNumber"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Contact Person">
        <el-select-v2
          v-model="form.contactPerson"
          filterable
          :options="contactPersonOptions"
          placeholder="Please select Email Address"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </el-form-item>

      <el-form-item label="Contact Number">
        <el-input
          v-model="form.contactNumber"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
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
  editSubdivision: Boolean;
}>();
const emits = defineEmits(["closeModal"]);

const form = reactive({
  name: "",
  area: "",
  blockNumber: [],
  lotNumber: "",
  associationDues: "",
  unit: "",
  cutoffDate: "",
  paymentTarget: "",
  startDate: "",
  endDate: "",
  contactPerson: "",
  contactNumber: "",
});

const contactPersonInitials = [
  "Felizardo Francisco Cortez",
  "Laguna Roldan Barros",
  "patrician@gmail.com",
  "Guevara Juliet Anico",
];

const contactPersonOptions = Array.from({
  length: contactPersonInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${contactPersonInitials[idx % 10]}`,
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

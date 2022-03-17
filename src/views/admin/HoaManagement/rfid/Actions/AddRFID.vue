<template>
  <el-dialog
    v-model="addRFID"
    title="Add RFID"
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
      <el-form-item label="RFID Number">
        <el-input
          v-model="form.rfidNumber"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Semnox Number">
        <el-input
          v-model="form.semnoxNumber"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Member ID">
        <el-input
          v-model="form.memberID"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Member Name">
        <el-select-v2
          v-model="form.memberName"
          filterable
          :options="memberNameOptions"
          placeholder="Please select Member Name"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </el-form-item>

      <el-form-item label="Status">
        <el-select-v2
          v-model="form.status"

          :options="statusOptions"
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
  addRFID: Boolean;
}>();
const emits = defineEmits(["closeModal"]);

const form = reactive({
  rfidNumber: "",
  semnoxNumber: "",
  memberID: "",
  memberName: "",
  status: "",
});

const statusInitials = ["Enable", "Disable"];

const statusOptions = Array.from({
  length: statusInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${statusInitials[idx % 10]}`,
}));

const memberNameInitials = [
  "Felizardo Francisco Cortez",
  "Laguna Roldan Barros",
  "Guevara Juliet Anico",
];

const memberNameOptions = Array.from({
  length: memberNameInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${memberNameInitials[idx % 10]}`,
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

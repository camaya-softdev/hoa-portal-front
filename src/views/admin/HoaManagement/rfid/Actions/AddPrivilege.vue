<template>
  <el-dialog
    v-model="addPrivilege"
    title="Avail Privilege"
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
      <el-form-item label="Package Name">
        <el-select-v2
          v-model="form.name"
          :options="periodDateRecurrentOptions"
          placeholder="Please select Status"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </el-form-item>

      <el-form-item label="Description">
        <el-input
          v-model="form.desc"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Type">
        <el-input
          v-model="form.type"
          placeholder="PCKG"
          disabled
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Booking Number">
        <el-input
          v-model="form.bookNumber"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Cost">
        <el-input
          v-model="form.cost"
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
  addPrivilege: Boolean;
}>();

const emits = defineEmits(["closeModal"]);

const form = reactive({
  name: "",
  desc: "",
  type: "",
  bookNumber: "",
  cost: "",
});

const periodDateRecurrentInitials = ["A", "B", "C"];

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

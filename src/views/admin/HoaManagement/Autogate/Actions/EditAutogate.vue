<template>
  <el-dialog
    v-model="editAutogate"
    title="Edit Autogate"
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

      <el-form-item label="Email Address">
        <el-select-v2
          v-model="form.emailAddress"
          :options="emailAddressOptions"
          placeholder="Please select Email Address"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-select-v2>
      </el-form-item>

           <el-form-item label="Member Name">
        <el-input
          v-model="form.memberName"
          disabled
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Date">
      <el-date-picker
        v-model="form.dates"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
      </el-form-item>

      <el-form-item label="Autogate Template">
        <el-select-v2
          v-model="form.email"
          :options="emailOptions"
          placeholder="Please select Autogate Template"
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
import { Plus } from "@element-plus/icons-vue";

import type { UploadFile } from "element-plus";

const fileList= ref([{name:'',url:''}])
const props = defineProps<{
  editAutogate: Boolean;
}>();
const emits = defineEmits(["closeModal"]);

const form = reactive({
  emailAddress: "",
  memberName: "",
  emailSchedule: "",
  dates: "",
  email: "",
});


const emailInitials = [
  "Soa",
  "Birthday Greeting",
];

const emailOptions = Array.from({
  length: emailInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${emailInitials[idx % 10]}`,
}));

const emailAddressInitials = [
  'franciscofelizardo123@gmail.com',
  'LagunaRoldan321@yahoo.com',
  'julietg0621@gmail.com'

];

const emailAddressOptions = Array.from({
  length: emailAddressInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${emailAddressInitials[idx % 10]}`,
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
  border-right: solid 1px var(--el-border-color);
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

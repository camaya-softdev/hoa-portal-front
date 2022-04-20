<template>
  <el-dialog
    v-model="addDialog"
    title="Add User"
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
      <el-form-item label="Member Type">
        <el-select-v2
          v-model="form.memberType"
          :options="memberTypeOptions"
          placeholder="Please select Member Type"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          multiple
        />
      </el-form-item>
      <el-form-item label="Access Type">
        <el-select
          v-model="form.accessType"
          :options="memberTypeOptions"
          placeholder="Please select Access Type"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          <el-option label="Full Admin" value="fullAdmin"></el-option>
          <el-option
            label="Subdivision Admin"
            value="subdivisionAdmin"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Assigned Subdivision">
        <el-select-v2
          v-model="form.assignedSubdivision"
          :options="assignedSubdivisionOptions"
          placeholder="Please select Assigned Subdivision"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          multiple
        />
      </el-form-item>
      <el-form-item label="Email Address">
        <el-select-v2
          v-model="form.emailAddress"
          filterable
          :options="emailAddressOptions"
          placeholder="Please select Email Address"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </el-form-item>
      <el-form-item label="Last Name">
        <el-input
          v-model="form.lastName"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="First Name">
        <el-input
          v-model="form.firstName"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="Middle Name">
        <el-input
          v-model="form.middleName"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="Contact Number">
        <el-input
          v-model="form.contactNumber"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          disabled
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
  addDialog: Boolean;
}>();
const emits = defineEmits(["closeModal"]);

const memberTypeInitials = ["HOA Admin", "HOA Member"];
const assignedSubdivisionInitials = [
  "Bayu Peaks",
  "Mont Kiarra Phase 1",
  "Menara Point North",
];
const emailAddressInitials = [
  "ardaisadrian@gmail.com",
  "ulijanjinky97@gmail.com",
  "patrician@gmail.com",
  "juandelacruz@gmail.com",
];

const memberTypeOptions = ref(
  Array.from({ length: memberTypeInitials.length }).map((_, idx) => ({
    value: `Option ${idx + 1}`,
    label: `${memberTypeInitials[idx % 10]}`,
  }))
);

const assignedSubdivisionOptions = ref(
  Array.from({ length: assignedSubdivisionInitials.length }).map((_, idx) => ({
    value: `Option ${idx + 1}`,
    label: `${assignedSubdivisionInitials[idx % 10]}`,
  }))
);

const emailAddressOptions = Array.from({
  length: emailAddressInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${emailAddressInitials[idx % 10]}`,
}));

const form = ref({
  memberType: [],
  accessType: "",
  assignedSubdivision: [],
  emailAddress: "",
  lastName: "",
  firstName: "",
  middleName: "",
  contactNumber: "",
});



const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      console.log(form.value.memberType)
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

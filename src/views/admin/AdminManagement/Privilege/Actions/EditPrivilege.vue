<template>
  <el-dialog
    v-model="editPrivilege"
    title="Edit Privilege"
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
        <el-input
          v-model="form.package"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input
          v-model="form.description"
          type="textarea"
          cols="5"
          rows="5"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>
      <el-form-item label="Access Type">
        <el-select
          v-model="form.category"
          placeholder="Please select Access Type"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          <el-option label="Hotel Room" value="Hotel Room"></el-option>
          <el-option label="AF Waterpark" value="Af Waterpark"></el-option>
          <el-option label="DTT" value="DTT"></el-option>
          <el-option label="Food Outlet" value="Food Outlet"></el-option>
          <el-option label="Others" value="Others"></el-option>
        </el-select>
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
  editPrivilege: Boolean;
}>();
const emits = defineEmits(["closeModal"]);

const form = reactive({
  package: "",
  description: "",
  category: [],
  cost: "",
});

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

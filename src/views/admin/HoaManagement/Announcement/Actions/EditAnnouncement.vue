<template>
  <el-dialog
    v-model="editAnnouncement"
    title="Edit Announcement"
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

      <el-form-item label="Title">
        <el-input
          v-model="form.title"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Image">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img style="width: 100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="Description">
        <el-input
          v-model="form.description"
          type="textarea"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Subdivision Name">
        <el-select-v2
          v-model="form.subdivision"
          filterable
          multiple
          :options="subdivisionOptions"
          placeholder="Please select Subdivision Name"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </el-form-item>

      <el-form-item label="Type">
        <el-select-v2
          v-model="form.type"
          :options="typeOptions"
          placeholder="Please select Type"
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
  editAnnouncement: Boolean;
}>();
const emits = defineEmits(["closeModal"]);

const form = reactive({
  title: "",
  image: "",
  description: "",
  subdivision: "",
  type: "",
});

const typeInitials = ["News", "Event"];

const typeOptions = Array.from({
  length: typeInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${typeInitials[idx % 10]}`,
}));

const subdivisionInitials = [
  "Bayu Peaks",
  "Mont Kiarra Phase 1",
  "Menara Point North",
];

const subdivisionOptions = Array.from({
  length: subdivisionInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${subdivisionInitials[idx % 10]}`,
}));

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      emits("closeModal");
      done();
    })
    .catch(() => {});
};
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove = (file: UploadFile, fileList: UploadFile[]) => {
  console.log(file, fileList);
};
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

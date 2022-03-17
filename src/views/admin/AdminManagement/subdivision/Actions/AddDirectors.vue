<template>
  <el-dialog
    v-model="addDirectors"
    title="Add Board Of Directors"
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

      <el-form-item label="Full Name">
        <el-select-v2
          v-model="form.name"
          multiple
          :options="nameOptions"
          placeholder="Please select Status"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </el-form-item>

      <el-form-item label="Description">
        <el-input
          v-model="form.description"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Position">
        <el-input
          v-model="form.position"
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
import type { UploadFile } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

const props = defineProps<{
  addDirectors: Boolean;
}>();

const fileList= ref([{name:'',url:''}])

const emits = defineEmits(["closeModal"]);

const form = reactive({
  name: "",
  description: "",
  position: "",
  image: "",
});

const nameInitials = ["Felizardo Francisco Cortez", "Laguna Roldan Barros","Guevara Juliet Anico"];

const nameOptions = Array.from({
  length: nameInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${nameInitials[idx % 10]}`,
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

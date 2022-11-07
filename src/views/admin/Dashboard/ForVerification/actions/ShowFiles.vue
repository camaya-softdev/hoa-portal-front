<template>
  <el-dialog
    v-model="showDocument"
    title="Show Files"
    width="100%"
    :before-close="handleClose"
    center
  >
    <div class="demo-image__lazy text-center pb-4">
      <el-image v-for="file in showFiles" :key="file.id" :src="file.url" lazy>
        <template #error>
          <a href="#" class="text-blue-500 text-center" @click="downloadPDF(file.url)"
            >Download a PDF File</a
          >
        </template>
      </el-image>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessageBox } from "element-plus";

const props = defineProps<{
  showDocument: Boolean;
  files: Object;
}>();

const showFiles = props.files;
console.log(props.showDocument);
const emits = defineEmits(["closeModal"]);
function closeModal() {
  emits("closeModal");
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      closeModal();
      done();
    })
    .catch(() => {});
};

function downloadPDF(url) {
  return window.open(url);
}
</script>

<style scoped>
.demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

<template>
  <el-dialog
    v-model="openStatement"
    title="Billing Statement"
    width="80%"
    :before-close="handleClose"
    center
  >
    <!-- <h1 class="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-5">
      Billing Statement
    </h1> -->
    <Statement :statementID="statementID" />
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="closeModal">Close</el-button> -->
        <a
          type="button"
          class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          href="/billing"
          >Close</a
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import Statement from "../Statement.vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../store";
import router from "../../../../router";

const props = defineProps<{
  openStatement: Boolean;
  statementID: Number;
}>();
const emits = defineEmits(["closeModal", "reset"]);

async function closeModal() {
  router.push("/billing");

  await emits("closeModal");
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      closeModal();
      done();
    })
    .catch(() => {});
};
</script>

<template>
  <el-dialog
    v-model="editTransaction"
    title="Edit Member Transaction"
    width="30%"
    :before-close="handleClose"
    center
  >
    <el-form
      label-position="top"
      ref="formRef"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Bill Month">
        <el-date-picker
          v-model="form.billMonth"
          type="date"
          placeholder="Pick a day"
        />
      </el-form-item>

      <el-form-item label="Date Paid">
        <el-date-picker
          v-model="form.datePaid"
          type="date"
          placeholder="Pick a day"
        />
      </el-form-item>
      <el-form-item label="Balance">
        <el-select-v2
          v-model="form.balance"
          :options="balanceRecurrentOptions"
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
  editTransaction: Boolean;
}>();

const fileList = ref([{ name: "", url: "" }]);

const emits = defineEmits(["closeModal"]);

const form = reactive({
  billMonth: "",
  datePaid: "",
  balance: "",
});

const balanceRecurrentInitials = ["Paid", "For Verification", "Un Paid"];

const balanceRecurrentOptions = Array.from({
  length: balanceRecurrentInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${balanceRecurrentInitials[idx % 10]}`,
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

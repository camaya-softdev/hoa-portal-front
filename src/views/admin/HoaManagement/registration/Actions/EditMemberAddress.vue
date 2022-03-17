<template>
  <el-dialog
    v-model="editProperty"
    title="Edit Member Address"
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
    <el-form-item label="Subdivision Name">
        <el-select-v2
          v-model="form.subdivisionName"
          :options="subdivisionNameRecurrentOptions"
          placeholder="Please select Status"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </el-form-item>

      <el-form-item label="House Number">
        <el-input
          v-model="form.houseNumber"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Street Name">
        <el-input
          v-model="form.streetName"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Block Number">
        <el-select-v2
          v-model="form.blockNumber"
          :options="blockNumberRecurrentOptions"
          placeholder="Please select Status"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </el-form-item>

      <el-form-item label="Lot Number">
        <el-input
          v-model="form.lotNumber"
          disabled
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></el-input>
      </el-form-item>

      <el-form-item label="Lot Area">
        <el-input
          v-model="form.lotArea"
          disabled
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
 editProperty: Boolean;
}>();

const fileList = ref([{ name: "", url: "" }]);

const emits = defineEmits(["closeModal"]);

const form = reactive({
  subdivisionName: "",
  houseNumber: "",
  streetName: "",
  blockNumber: "",
  lotNumber: "",
  lotArea: "",
});

const blockNumberRecurrentInitials = ["None", "1", "2", "3"];

const blockNumberRecurrentOptions = Array.from({
  length: blockNumberRecurrentInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${blockNumberRecurrentInitials[idx % 10]}`,
}));

const subdivisionNameRecurrentInitials = ["Bayu Peaks", "Mont Kiarra Phase 1", "Mont Kiarra Phase 1"];

const subdivisionNameRecurrentOptions = Array.from({
  length: subdivisionNameRecurrentInitials.length,
}).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${subdivisionNameRecurrentInitials[idx % 10]}`,
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

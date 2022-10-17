<template>
  <el-dialog
    v-model="editFees"
    title="Edit Other Fees"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <div v-if="feeLoading">Loading...</div>
    <form v-else>
      <div class="mb-4">
        <label for="item" class="block text-gray-700 text-sm font-bold mb-2">
          Item <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="item"
          type="text"
          v-model="form.hoa_fees_item"
          :class="errorMsg['hoa_fees_item'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Item"
        />
        <span
          v-if="errorMsg['hoa_fees_item']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_fees_item"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label for="cost" class="block text-gray-700 text-sm font-bold mb-2">
          Cost <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="cost"
          type="number"
          v-model="form.hoa_fees_cost"
          :class="errorMsg['hoa_fees_item'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Cost"
        />
        <span
          v-if="errorMsg['hoa_fees_cost']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_fees_cost"][0] }}
        </span>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="start-date">
          Start Date <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="start-date"
          type="date"
          v-model="form.hoa_fees_start_date"
          :class="errorMsg['hoa_fees_start_date'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Start Date"
        />
        <span
          v-if="errorMsg['hoa_fees_start_date']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_fees_start_date"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="end-date">
          End Date <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="end-date"
          type="date"
          v-model="form.hoa_fees_end_date"
          :class="errorMsg['hoa_fees_end_date'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="End Date"
        />
        <span
          v-if="errorMsg['hoa_fees_end_date']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_fees_end_date"][0] }}
        </span>
      </div>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-fees-reccurrent"
        >
          Subdivision Fees Reccurrent <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="schedules"
          :change="onChangeSchedule(schedules)"
          placeholder="Please Select HOA Email Schedule"
        >
          <el-option
            v-for="item in showSchedule"
            :key="item.id"
            :label="item.hoa_schedule_name"
            :value="item.schedule_id"
          />
        </el-select>
        <span
          v-if="errorMsg['schedule_id']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["schedule_id"][0] }}
        </span>
      </div>
    </form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";

const props = defineProps<{
  editFees: Boolean;
  showSchedule: Object;
  lotId: Number;
  editId: Number;
}>();

const emits = defineEmits(["closeModal", "editId"]);
const errorMsg = ref("");
const form = ref({
  schedule_id: "",
  lot_id: 0,
  hoa_fees_item: "",
  hoa_fees_desc: "",
  hoa_fees_cost: "",
});
let schedules = ref("");
if (props.editId !== 0) {
  store.dispatch("fee/getFee", props.editId);
}

const feeLoading = computed(() => store.state.fee.currentFee.loading);

watch(
  () => store.state.fee.currentFee.data,
  (newVal, oldVal) => {
    form.value = { ...JSON.parse(JSON.stringify(newVal.data)) };
    schedules.value = newVal.data.schedule_id;
  }
);
let dataSchedule = ref({});

function onChangeSchedule(event) {
  if (event) {
    return (dataSchedule.value = props.showSchedule.find(
      (schedules) => schedules.schedule_id === event
    ));
  }
}

function closeModal() {
  errorMsg.value = "";
  emits("editId");
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
async function handleSubmit() {
  form.value.lot_id = props.lotId;
  form.value.schedule_id = dataSchedule.value.schedule_id;
  const res = await store.dispatch("fee/editFee", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("fee/getFees", props.lotId);
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The other fees data was successfully updated",
      });
      closeModal();
    } else {
      errorMsg.value = res.response.data.errors;
    }
  } catch (err) {
    await store.commit("alert/notify", {
      title: "Error",
      type: "danger",
      message: err,
    });
  }
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

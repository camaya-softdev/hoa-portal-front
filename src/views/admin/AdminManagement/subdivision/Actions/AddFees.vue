<template>
  <el-dialog
    v-model="addFees"
    title="Add Subdivision Dues"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-dues-name"
        >
          Subdivision Dues Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-dues-name"
          type="text"
          v-model="form.hoa_subd_dues_name"
          :class="errorMsg['hoa_subd_dues_name'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Subdivision Dues Name"
        />
        <span
          v-if="errorMsg['hoa_subd_dues_name']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_dues_name"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-dues-cost"
        >
          Subdivision Dues Cost <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-dues-cost"
          type="number"
          v-model="form.hoa_subd_dues_cost"
          :class="errorMsg['hoa_subd_dues_cost'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Subdivision Dues Cost"
        />
        <span
          v-if="errorMsg['hoa_subd_dues_cost']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_dues_cost"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="unit-id">
          Subdivision Dues Unit <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.unit_id"
          placeholder="Please Subdivision Dues Unit"
        >
          <el-option
            v-for="item in unitData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <span
          v-if="errorMsg['unit_id']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["unit_id"][0] }}
        </span>
      </div>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-dues-start-date"
        >
          Subdivision Dues Start Date <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-dues-start-date"
          type="date"
          v-model="form.hoa_subd_dues_start_date"
          :class="
            errorMsg['hoa_subd_dues_start_date'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Subdivision Dues Start Date"
        />
        <span
          v-if="errorMsg['hoa_subd_dues_start_date']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_dues_start_date"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-dues-end-date"
        >
          Subdivision Dues End Date <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-dues-end-date"
          type="date"
          v-model="form.hoa_subd_dues_end_date"
          :class="
            errorMsg['hoa_subd_dues_end_date'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Subdivision Dues End Date"
        />
        <span
          v-if="errorMsg['hoa_subd_dues_end_date']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_dues_end_date"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-dues-reccurrent"
        >
          Subdivision Dues Reccurrent <span class="text-red-300">*</span>
        </label>
        <select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-dues-reccurrent"
          v-model="form.schedule_id"
          :class="errorMsg['schedule_id'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Subdivision Dues CutOff Date"
        >
          <option v-for="(data, index) in showSchedule" :key="index" v-bind:value="data">
            {{ data.hoa_schedule_name }}
          </option>
        </select>
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
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
import store from "../../../../../store";

const props = defineProps<{
  addFees: Boolean;
  showSchedule: Object;
  dueId: Number;
  unitData: Object;
}>();
const route = useRoute();

const emits = defineEmits(["closeModal"]);
console.log(props.unitData);
const form = ref({
  subdivision_id: "",
  schedule_id: "",
  unit_id: "",
  hoa_subd_dues_name: "",
  hoa_subd_dues_start_date: "",
  hoa_subd_dues_end_date: "",
  hoa_subd_dues_cost: "",
  hoa_subd_dues_billing_date: "",
});

const errorMsg = ref("");

function closeModal() {
  form.value.hoa_subd_dues_name = "";
  form.value.hoa_subd_dues_start_date = "";
  form.value.hoa_subd_dues_end_date = "";
  form.value.hoa_subd_dues_cost = "";
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
  try {
    form.value.subdivision_id = props.dueId;
    form.value.hoa_subd_dues_billing_date = form.value.hoa_subd_dues_start_date;
    form.value.schedule_id = form.value.schedule_id.schedule_id;
    // const data = props.showSchedule.find(i=>i.id === form.value.schedule_id)
    const res = await store.dispatch("dues/addDue", form.value);
    if (res.status == 201) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The subdivision dues_fees data was successfully created",
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

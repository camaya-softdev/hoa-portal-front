<template>
  <el-dialog
    v-model="addSubdivision"
    title="Add Subdivision"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="subdivision-name">
          Subdivision Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-name"
          type="text"
          v-model="form.hoa_subd_name"
          :class="errorMsg['hoa_subd_name'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Subdivision Name"
        />
        <span
          v-if="errorMsg['hoa_subd_name']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_name"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="subdivision-area">
          Area (SQM)
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-area"
          type="number"
          v-model="form.hoa_subd_area"
          :class="errorMsg['hoa_subd_area'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Area (SQM)"
        />
        <span
          v-if="errorMsg['hoa_subd_area']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_area"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="total-block-number"
        >
          Total Block Number <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="total-block-number"
          type="number"
          v-model="form.hoa_subd_blocks"
          :class="errorMsg['hoa_subd_blocks'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Total Block Number"
        />
        <span
          v-if="errorMsg['hoa_subd_blocks']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_blocks"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="total-lot-number">
          Total Lot Number <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="total-lot-number"
          type="number"
          v-model="form.hoa_subd_lots"
          :class="errorMsg['hoa_subd_lots'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Total Lot Number"
        />
        <span
          v-if="errorMsg['hoa_subd_lots']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_lots"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-dues-cutoff-date"
        >
          Subdivision Dues CutOff Date <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-dues-cutoff-date"
          type="date"
          v-model="form.hoa_subd_dues_cutoff_date"
          :class="
            errorMsg['hoa_subd_dues_cutoff_date'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Subdivision Dues CutOff Date"
        />
        <span
          v-if="errorMsg['hoa_subd_dues_cutoff_date']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_dues_cutoff_date"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-dues-payment-target"
        >
          Subdivision Dues Payment Target <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-dues-payment-target"
          type="number"
          v-model="form.hoa_subd_dues_payment_target"
          :class="
            errorMsg['hoa_subd_dues_payment_target']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="Subdivision Dues Payment Target"
        />
        <span
          v-if="errorMsg['hoa_subd_dues_payment_target']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_dues_payment_target"][0] }}
        </span>
      </div>
     
       

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Contact Person <span class="text-red-300">*</span>
          </label>
          <el-select
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="form.hoa_subd_contact_person"
            filterable
            placeholder="Full Name"
          >
            <el-option
              v-for="item in showEmail"
              :key="item.id"
              :label="item.hoa_member_name"
              :value="item.hoa_member_name"
            />
          </el-select>
          <span
          v-if="errorMsg['hoa_subd_contact_person']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_contact_person"][0] }}
        </span>
        </div>
      
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-contact-number"
        >
          Contact Number <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-contact-number"
          type="text"
          v-model="form.hoa_subd_contact_number"
          :class="
            errorMsg['hoa_subd_contact_number'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Contact Number"
        />
        <span
          v-if="errorMsg['hoa_subd_contact_number']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_subd_contact_number"][0] }}
        </span>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          Image <span class="text-red-300">*</span>
        </label>
        <div class="mt-1 flex items-center">
          <img
            v-if="form.hoa_subd_image"
            :src="form.hoa_subd_image"
            :class="errorMsg['hoa_subd_image'] ? 'border-red-300' : 'border-gray-300'"
            :alt="form.hoa_subd_name"
            class="w-64 h-48 object-cover"
          />
          <span
            v-else
            class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-[80%] w-[80%] text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <button
            type="button"
            class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <input
              type="file"
              @change="onImageChoose"
              class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
            />
            Change
          </button>
        </div>
        <p class="text-gray-500 text-[10px]">
          The width should be 300 px and height 300 px files with less than 2mb each
        </p>
      </div>
    </form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal()">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit" :disabled="btnLoading" :loading="btnLoading">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import _ from "lodash";
import { ref, computed } from "vue";
import { ElMessageBox } from "element-plus";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import store from "../../../../../store";

const props = defineProps<{
  addSubdivision: Boolean;
  showEmail: Object;
}>();
const emits = defineEmits(["closeModal"]);
let btnLoading = ref(false);
const form = ref({
  hoa_subd_name: "",
  hoa_subd_image:'',
  hoa_subd_area: "",
  hoa_subd_blocks: "",
  hoa_subd_lots: "",
  hoa_subd_contact_person: "",
  hoa_subd_contact_number: "",
  hoa_subd_dues_payment_target: "",
  hoa_subd_dues_cutoff_date: "",
});

let emailData = ref({});
const search = ref("");
const errorMsg = ref("");

let searchPerson = _.debounce(function () {
  store
    .dispatch("subdivision/getSearchUser", search.value)
    .then(() => props.showEmail)
    .catch((err) => console.log(err));
}, 1000);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      closeModal();
      done();
    })
    .catch(() => {});
};

function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    // The field to send on backend and apply validations
    form.value.hoa_subd_image = reader.result;
    // The field to display here
    ev.target.value = "";
  };
  reader.readAsDataURL(file);
}

function closeModal() {
  emailData.value = [];
  form.value.hoa_subd_name = "";
  form.value.hoa_subd_area = "";
  form.value.hoa_subd_blocks = "";
  form.value.hoa_subd_image = "";
  form.value.hoa_subd_lots = "";
  form.value.hoa_subd_contact_person = "";
  form.value.hoa_subd_contact_number = "";
  form.value.hoa_subd_dues_payment_target = "";
  form.value.hoa_subd_dues_cutoff_date = "";
  errorMsg.value = "";
  emits("closeModal");
}

async function handleSubmit() {
  btnLoading.value = true
  // form.value.hoa_subd_contact_person = emailData.value.hoa_member_name;
  const res = await store.dispatch("subdivision/addSubdivision", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The subdivision data was successfully created",
      });
      btnLoading.value = false
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
    btnLoading.value = false
  }
  btnLoading.value = false
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color-base);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

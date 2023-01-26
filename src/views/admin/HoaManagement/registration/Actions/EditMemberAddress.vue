<template>
  <el-dialog
    v-model="editProperty"
    title="Edit Member Address"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <div v-if="lotLoading">Loading...</div>
    <div v-else>
      <div
        v-if="errorMsg"
        class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded"
      >
        {{ errorMsg["unique_lot"][0] }}
        <span
          @click="errorMsg = ''"
          class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-[rgba(0,0,0,0,.2)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
      <form>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Subdivision Name <span class="text-red-300">*</span></label
          >
          <el-select
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="form.subdivision_id"
            filterable
            placeholder="Please Select Subdivision Name"
          >
            <el-option
              v-for="item in subdivisionData.data"
              :key="item.id"
              :label="item.hoa_subd_name"
              :value="item.id"
            />
          </el-select>
          <span
            v-if="errorMsg['subdivision_id']"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errorMsg["subdivision_id"][0] }}
          </span>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="subdivision-lot-house-number"
          >
            Subdivision House Number
          </label>
          <input
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subdivision-lot-house-number"
            type="number"
            v-model="form.hoa_subd_lot_house_num"
            :class="
              errorMsg['hoa_subd_lot_house_num'] ? 'border-red-300' : 'border-gray-300'
            "
            placeholder="Subdivision House Number"
          />
          <span
            v-if="errorMsg['hoa_subd_lot_house_num']"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errorMsg["hoa_subd_lot_house_num"][0] }}
          </span>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="subdivision-lot-street-name"
          >
            Subdivision Street Name
          </label>
          <textarea
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subdivision-lot-street-name"
            cols="5"
            rows="5"
            v-model="form.hoa_subd_lot_street_name"
            :class="
              errorMsg['hoa_subd_lot_street_name'] ? 'border-red-300' : 'border-gray-300'
            "
            placeholder="Subdivision Street Name"
          />
          <span
            v-if="errorMsg['hoa_subd_lot_street_name']"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errorMsg["hoa_subd_lot_street_name"][0] }}
          </span>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="subdivision-lot-block-number"
          >
            Subdivision Block Number <span class="text-red-300">*</span>
          </label>
          <input
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subdivision-lot-block-number"
            type="number"
            v-model="form.hoa_subd_lot_block"
            :class="errorMsg['hoa_subd_lot_block'] ? 'border-red-300' : 'border-gray-300'"
            placeholder="Subdivision Block Number"
          />
          <span
            v-if="errorMsg['hoa_subd_lot_block']"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errorMsg["hoa_subd_lot_block"][0] }}
          </span>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="subdivision-lot-number"
          >
            Subdivision Lot Number <span class="text-red-300">*</span>
          </label>
          <input
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subdivision-lot-number"
            type="number"
            v-model="form.hoa_subd_lot_num"
            :class="errorMsg['hoa_subd_lot_num'] ? 'border-red-300' : 'border-gray-300'"
            placeholder="Subdivision Lot Number"
          />
          <span
            v-if="errorMsg['hoa_subd_lot_num']"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errorMsg["hoa_subd_lot_num"][0] }}
          </span>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="subdivision-lot-area"
          >
            Subdivision Lot Area (SQM) <span class="text-red-300">*</span>
          </label>
          <input
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subdivision-lot-area"
            type="number"
            v-model="form.hoa_subd_lot_area"
            :class="errorMsg['hoa_subd_lot_area'] ? 'border-red-300' : 'border-gray-300'"
            placeholder="Subdivision Lot Area (SQM)"
          />
          <span
            v-if="errorMsg['hoa_subd_lot_area']"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errorMsg["hoa_subd_lot_area"][0] }}
          </span>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Subdivision Lot Sales Agent <span class="text-red-300">*</span></label
          >
          <el-select
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="agData"
            :change="onChange(agData)"
            filterable
            placeholder="Please Select Agent Name"
          >
            <el-option
              v-for="item in agentData.data"
              :key="item.id"
              :label="item.hoa_sales_agent_name"
              :value="item.id"
            />
          </el-select>
          <span
            v-if="errorMsg['agent_id']"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errorMsg["agent_id"][0] }}
          </span>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="subdivision-lot-sales-agent-contact-number"
          >
            Subdivision Lot Sales Agent Contact Number
            <span class="text-red-300">*</span>
          </label>
          <input
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subdivision-lot-sales-agent-contact-number"
            type="text"
            v-model="selectedOptions"
            disabled
            :class="
              errorMsg['hoa_sales_agent_contact_number']
                ? 'border-red-300'
                : 'border-gray-300'
            "
            placeholder="Subdivision Lot Sales Agent Contact Number"
          />
          <span
            v-if="errorMsg['hoa_sales_agent_contact_number']"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errorMsg["hoa_sales_agent_contact_number"][0] }}
          </span>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="hoa_subd_lot_default"
          >
            Primary Address <span class="text-red-300">*</span>
          </label>
          <el-checkbox value="1" v-model="form.hoa_subd_lot_default" label="Yes" border />
        </div>
      </form>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal()">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
import store from "../../../../../store";


const props = defineProps<{
  editProperty: Boolean;
  subdivisionData: Object;
  editId: Number;
  agentData: Object;
}>();

const fileList = ref([{ name: "", url: "" }]);
const route = useRoute();
const emits = defineEmits(["closeModal", "editId"]);

const form = ref({
  subdivision_id: "",
  agent_id: "",
  user_id: "",
  hoa_subd_lot_house_num: "",
  hoa_subd_lot_street_name: "",
  hoa_subd_lot_block: "",
  hoa_subd_lot_num: "",
  hoa_subd_lot_area: "",
  hoa_sales_agent_name: "",
  hoa_sales_agent_contact_number: "",
  unique_lot: "",
  hoa_subd_lot_default: false,
});

let subData = ref({});
let agData = ref({});
const errorMsg = ref("");

if (props.editId !== 0) {
  store.dispatch("lot/getLot", props.editId);
}
const lotLoading = computed(() => store.state.lot.currentLot.loading);
const contactNumber = ref("");
function onChange(event) {
  if (event) {
    return (contactNumber.value = props.agentData.data.find(
      (agent) => agent.id === event
    ));
  }
}

const selectedOptions = computed(() =>
  contactNumber.value !== undefined
    ? contactNumber.value.hoa_sales_agent_contact_number
    : ""
);
watch(
  () => store.state.lot.currentLot.data,
  (newVal, oldVal) => {
    agData.value = newVal.data.agent_id;
    form.value = { ...JSON.parse(JSON.stringify(newVal.data)) };
    if (newVal.data.hoa_subd_lot_default === 1) {
      form.value.hoa_subd_lot_default = true;
    }
  }
);

function closeModal() {
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
  form.value.agent_id = agData;
  form.value.unique_lot =
    form.value.subdivision_id +
    "-" +
    form.value.hoa_subd_lot_block +
    "-" +
    form.value.hoa_subd_lot_num;
  form.value.user_id = parseInt(route.params.id);
  const res = await store.dispatch("lot/editLot", form.value);
  console.log(res.data);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("lot/getLots", route.params.id);
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The member property data was successfully updated",
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

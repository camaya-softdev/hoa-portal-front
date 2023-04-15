<template>
  <el-dialog
    v-model="addAgent"
    title="Add Sales Agent"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="sales-agent-email">
          Sales Agent Email <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="sales-agent-email"
          type="text"
          v-model="form.hoa_sales_agent_email"
          :class="
            errorMsg['hoa_sales_agent_email'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Sales Agent Email"
        />
        <span
          v-if="errorMsg['hoa_sales_agent_email']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_sales_agent_email"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="sales-agent-last-name"
        >
          Sales Agent Last Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="sales-agent-last-name"
          type="text"
          v-model="form.hoa_sales_agent_lname"
          :class="
            errorMsg['hoa_sales_agent_lname'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Sales Agent Last Name"
        />
        <span
          v-if="errorMsg['hoa_sales_agent_lname']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_sales_agent_lname"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="sales-agent-first-name"
        >
          Sales Agent First Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="sales-agent-first-name"
          type="text"
          v-model="form.hoa_sales_agent_fname"
          :class="
            errorMsg['hoa_sales_agent_fname'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Sales Agent First Name"
        />
        <span
          v-if="errorMsg['hoa_sales_agent_fname']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_sales_agent_fname"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="sales-agent-middle-name"
        >
          Sales Agent Middle Name
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="sales-agent-middle-name"
          type="text"
          v-model="form.hoa_sales_agent_mname"
          placeholder="Sales Agent Middle Name"
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="sales-agent-suffix"
        >
          Sales Agent Suffix
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="sales-agent-suffix"
          type="text"
          v-model="form.hoa_sales_agent_suffix"
          placeholder="Sales Agent Suffix"
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="sales-agent-contact-number"
        >
          Sales Agent Contact Number <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="sales-agent-contact-number"
          type="text"
          v-model="form.hoa_sales_agent_contact_number"
          :class="
            errorMsg['hoa_sales_agent_contact_number']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="Sales Agent Contact Number"
        />
        <span
          v-if="errorMsg['hoa_sales_agent_contact_number']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_sales_agent_contact_number"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="subdivision-name">
          Sales Agent Supervisor <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision-name"
          type="text"
          v-model="form.hoa_sales_agent_supervisor"
          :class="
            errorMsg['hoa_sales_agent_supervisor'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Sales Agent Supervisor"
        />
        <span
          v-if="errorMsg['hoa_sales_agent_supervisor']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_sales_agent_supervisor"][0] }}
        </span>
      </div>
    </form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal()">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="btnLoading" :disabled="btnLoading">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";

const props = defineProps<{
  addAgent: Boolean;
}>();
const emits = defineEmits(["closeModal"]);
let btnLoading = ref(false);
const form = ref({
  hoa_sales_agent_email: "",
  hoa_sales_agent_lname: "",
  hoa_sales_agent_fname: "",
  hoa_sales_agent_mname: "",
  hoa_sales_agent_suffix: "",
  hoa_sales_agent_contact_number: "",
  hoa_sales_agent_supervisor: "",
});

let errorMsg = ref("");
function closeModal() {
  form.value.hoa_sales_agent_email = "";
  form.value.hoa_sales_agent_lname = "";
  form.value.hoa_sales_agent_fname = "";
  form.value.hoa_sales_agent_mname = "";
  form.value.hoa_sales_agent_suffix = "";
  form.value.hoa_sales_agent_contact_number = "";
  form.value.hoa_sales_agent_supervisor = "";
  errorMsg.value = "";
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
  btnLoading.value = true
  const res = await store.dispatch("agent/addAgent", form.value);
  try {
    if (res.status === 200 || res.status === 201) {

      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The sales agent data was successfully created",
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
</style>

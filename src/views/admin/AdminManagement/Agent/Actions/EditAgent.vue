<template>
  <el-dialog
    v-model="editAgent"
    title="Edit Sales Agent"
    width="50%"
    :before-close="handleClose"
    center
  >
    <div v-if="agentLoading">Loading...</div>
    <form v-else>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="sales-agent-email"
        >
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
          :class="
            errorMsg['hoa_sales_agent_mname'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Sales Agent Middle Name"
        />
        <span
          v-if="errorMsg['hoa_sales_agent_mname']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_sales_agent_mname"][0] }}
        </span>
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
          :class="
            errorMsg['hoa_sales_agent_suffix'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Sales Agent Suffix"
        />
        <span
          v-if="errorMsg['hoa_sales_agent_suffix']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_sales_agent_suffix"][0] }}
        </span>
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
            errorMsg['hoa_sales_agent_contact_number'] ? 'border-red-300' : 'border-gray-300'
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
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-name"
        >
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
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import {computed, ref, watch} from "vue";
  import {ElMessageBox} from "element-plus";
  import store from "../../../../../store";

  const props = defineProps<{
    editAgent: Boolean;
    editId: Number;
  }>();
  const emits = defineEmits(["closeModal", "editId"]);

  const form = ref({
    hoa_sales_agent_email: "",
    hoa_sales_agent_lname: "",
    hoa_sales_agent_fname: '',
    hoa_sales_agent_mname: "",
    hoa_sales_agent_suffix: '',
    hoa_sales_agent_contact_number: "",
    hoa_sales_agent_supervisor: ''
  });


  let errorMsg = ref('');
  function closeModal() {
    emits("editId");
    emits("closeModal");
  }
  const agentLoading = computed(() => store.state.agent.currentAgent.loading);
  watch(
    () => store.state.agent.currentAgent.data,
    (newVal, oldVal) => {
      form.value = { ...JSON.parse(JSON.stringify(newVal.data)) };
    }
  );

  if (props.editId !== 0) {
    store.dispatch("agent/getAgent", props.editId);
  }

  const handleClose = (done: () => void) => {
    ElMessageBox.confirm("Are you sure to close this dialog?")
      .then(() => {
        closeModal();
        done();
      })
      .catch(() => {
      });
  };

  async function handleSubmit() {
    const res = await store.dispatch("agent/editAgent", form.value);
    try {
      if (res.status === 200 || res.status === 201) {
        await store.dispatch("agent/getAgents");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The sales agent data was successfully updated",
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

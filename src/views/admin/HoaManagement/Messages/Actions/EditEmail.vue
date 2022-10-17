<template>
  <el-dialog
    v-model="editEmail"
    title="Edit Email"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <div v-if="emailLoading">Loading...</div>
    <form v-else>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-email-member-email"
        >
          HOA Member Email <span class="text-red-300">*</span>
        </label>
        <el-select
          name="hoa-email-member-email"
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="users"
          filterable
          placeholder="HOA Member Email"
          remote
          :remote-method="searchEmail"
          :change="onChange(users)"
        >
          <el-option
            v-for="item in userData"
            :key="item.id"
            :label="item.email"
            :value="item.id"
          />
        </el-select>
        <span
          v-if="errorMsg['user_id']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["user_id"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label for="hoa-member-name" class="block text-gray-700 text-sm font-bold mb-2">
          HOA Member Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-member-name"
          type="text"
          v-model="selectedOptions"
          disabled
          placeholder="HOA Member Name"
        />
      </div>
      <div class="mb-4">
        <label
          for="hoa-email-schedule"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          HOA Email Schedule <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-email-schedule"
          type="date"
          v-model="form.hoa_email_sched"
          :class="errorMsg[' hoa_email_sched'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="HOA Email Schedule"
        />
        <span
          v-if="errorMsg['hoa_email_sched']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_email_sched"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-dues-reccurrent"
        >
          Hoa Email Schedule Recurrent <span class="text-red-300">*</span>
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
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-autogate-template-name"
        >
          HOA Email Template Name <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.communication_id"
          filterable
          placeholder="HOA Autogate Template Name"
        >
          <el-option
            v-for="item in emailTemplate"
            :key="item.id"
            :label="item.template_name"
            :value="item.id"
          />
        </el-select>
        <span
          v-if="errorMsg['communication_id']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["communication_id"][0] }}
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
import { ref, computed, watch } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";

const props = defineProps<{
  editEmail: Boolean;
  editId: Number;
  emailTemplate: Object;
  userData: Object;
  showSchedule: Object;
}>();
const emits = defineEmits(["closeModal", "editId", "searchShowUser"]);

const form = ref({
  user_id: "",
  schedule_id: "",
  communication_id: "",
  hoa_email_sched: "",
});

const errorMsg = ref("");
let users = ref("");
let data = ref({});
let schedules = ref("");

if (props.editId !== 0) {
  store.dispatch("email/getEmail", props.editId);
}
const emailLoading = computed(() => store.state.email.currentEmail.loading);

watch(
  () => store.state.email.currentEmail.data,
  (newVal, oldVal) => {
    form.value = { ...JSON.parse(JSON.stringify(newVal.data)) };
    users.value = newVal.data.user_id;
    schedules.value = newVal.data.schedule_id;
  }
);

function onChange(event) {
  if (event) {
    return (data.value = props.userData.find((users) => users.id === event));
  }
}
let dataSchedule = ref({});
function onChangeSchedule(event) {
  if (event) {
    return (dataSchedule.value = props.showSchedule.find(
      (schedules) => schedules.schedule_id === event
    ));
  }
}
function searchEmail(users) {
  return emits("searchShowUser", users);
}

const selectedOptions = computed(() =>
  data.value !== undefined ? data.value.hoa_member_name : ""
);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      closeModal();
      done();
    })
    .catch(() => {});
};
function closeModal() {
  errorMsg.value = "";
  emits("closeModal");
  emits("editId");
}

async function handleSubmit() {
  form.value.user_id = data.value.id;
  form.value.schedule_id = dataSchedule.value.schedule_id;
  const res = await store.dispatch("email/editEmail", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("email/getEmails");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The email data was successfully updated",
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

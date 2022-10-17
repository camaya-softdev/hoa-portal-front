<template>
  <el-dialog
    v-model="addEmail"
    title="Create Schedule Email "
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <form>
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
          collapse-tags
          collapse-tags-tooltip
          multiple
          remote
          placeholder="HOA Member Email"
          :remote-method="searchEmail"
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
          v-model="form.schedule_id"
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
import { ref, reactive, computed } from "vue";
import { ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import store from "../../../../../store";

import type { UploadFile } from "element-plus";

const fileList = ref([{ name: "", url: "" }]);
const props = defineProps<{
  addEmail: Boolean;
  emailTemplate: Object;
  userData: Object;
  showSchedule: Object;
}>();
const emits = defineEmits(["closeModal", "searchShowUser"]);

const form = ref({
  user_id: "",
  schedule_id: "",
  communication_id: "",
  hoa_email_sched: "",
});
const errorMsg = ref("");
let users = ref("");
let data = ref({});
let schedule = ref("");

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      closeModal();
      done();
    })
    .catch(() => {});
};

function closeModal() {
  form.value.user_id = "";
  form.value.schedule_id = "";
  form.value.communication_id = "";
  form.value.hoa_email_sched = "";
  errorMsg.value = "";
  emits("closeModal");
}

function searchEmail(users) {
  return emits("searchShowUser", users);
}

async function handleSubmit() {
  form.value.user_id = users.value;
  const res = await store.dispatch("email/addEmail", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("email/getEmails");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The email data was successfully created",
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

<template>
  <el-dialog
    v-model="addAutogate"
    title="Add Member to Autogate Display"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-autogate-member-name"
        >
          HOA Autogate Member Name <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="users"
          filterable
          placeholder="HOA Autogate Member Name"
          :change="onChange(users)"
          remote
          :remote-method="searchEmail"
        >
          <el-option
            v-for="item in userData"
            :key="item.id"
            :label="item.fullName"
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
          for="hoa_event_notices_title"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          HOA Autogate Subdivision Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa_event_notices_title"
          type="text"
          v-model="selectedOptions"
          disabled
          :class="
            errorMsg['hoa_autogate_subdivision_name']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="HOA Autogate Subdivision Name"
        />
        <span
          v-if="errorMsg['hoa_autogate_subdivision_name']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_autogate_subdivision_name"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          for="hoa_event_notices_title"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          HOA Autogate Start Date <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-autogate-start"
          type="date"
          v-model="form.hoa_autogate_start"
          :class="errorMsg['hoa_autogate_start'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="HOA Autogate Start Date"
        />
        <span
          v-if="errorMsg['hoa_autogate_start']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_autogate_start"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          for="hoa_event_notices_title"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          HOA Autogate End Date <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa_event_notices_title"
          type="date"
          v-model="form.hoa_autogate_end"
          :class="errorMsg['hoa_autogate_end'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="HOA Autogate Subdivision Name"
        />
        <span
          v-if="errorMsg['hoa_autogate_end']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_autogate_end"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-autogate-template-name"
        >
          HOA Autogate Template Name <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.template_id"
          filterable
          placeholder="HOA Autogate Template Name"
        >
          <el-option
            v-for="item in autogateTemplate"
            :key="item.id"
            :label="item.template_name"
            :value="item.id"
          />
        </el-select>
        <span
          v-if="errorMsg['template_id']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["template_id"][0] }}
        </span>
      </div>
    </form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="btnLoading" :disabled="btnLoading">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";

const fileList = ref([{ name: "", url: "" }]);
let btnLoading = ref(false);
const props = defineProps<{
  addAutogate: Boolean;
  userData: Object;
  autogateTemplate: Object;
}>();
const emits = defineEmits(["closeModal", "searchShowUser"]);

const form = ref({
  user_id: "",
  template_id: "",
  hoa_autogate_member_name: "",
  hoa_autogate_subdivision_name: "",
  hoa_autogate_start: "",
  hoa_autogate_end: "",
});

let users = ref("");
let data = ref({});

function onChange(event) {
  if (event) {
    return (data.value = props.userData.find((users) => users.id === event));
  }
}

const selectedOptions = computed(() => {
  let subdivision = [];

  if (data.value.subdivision) {
    subdivision = [...data.value.subdivision];
    if (subdivision.length) {
      return data.value !== undefined ? subdivision[0].name : "";
    }
  }
});

const errorMsg = ref("");
function closeModal() {
  form.value.user_id = "";
  form.value.template_id = "";
  form.value.hoa_autogate_member_name = "";
  form.value.hoa_autogate_subdivision_name = "";
  form.value.hoa_autogate_start = "";
  form.value.hoa_autogate_end = "";
  users.value = "";
  errorMsg.value = "";
  emits("closeModal");
}

function searchEmail(users) {
  return emits("searchShowUser", users);
}

async function handleSubmit() {
  btnLoading.value = true;
  form.value.user_id = users.value;
  form.value.hoa_autogate_member_name = data.value.fullName;
  form.value.hoa_autogate_subdivision_name = data.value.subdivision[0].name;

  const res = await store.dispatch("autogate/addAutogate", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The autogate data was successfully created",
      });
      closeModal();
    } else {
      errorMsg.value = res.response.data.errors;
    }
    btnLoading.value = false;
  } catch (err) {
    await store.commit("alert/notify", {
      title: "Error",
      type: "danger",
      message: err,
    });
  }
  btnLoading.value = false;
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      closeModal();
      done();
    })
    .catch(() => {});
};
</script>
<style scoped></style>

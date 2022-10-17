<template>
  <div class="border-8">
    <el-dialog
      v-model="addRFID"
      title="Add RFID"
      width="50%"
      custom-class="border-2 border-gray-600"
      :before-close="handleClose"
      center
    >
      <form>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="hoa-rfid-num">
            HOA RFID Number <span class="text-red-300">*</span>
          </label>
          <input
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hoa-rfid-num"
            type="text"
            v-model="form.hoa_rfid_num"
            :class="errorMsg['hoa_rfid_num'] ? 'border-red-300' : 'border-gray-300'"
            placeholder="HOA RFID Number"
          />
          <span
            v-if="errorMsg['hoa_rfid_num']"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errorMsg["hoa_rfid_num"][0] }}
          </span>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="hoa-rfid-semnox-number"
          >
            HOA Semnox Number <span class="text-red-300">*</span>
          </label>
          <input
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hoa-rfid-semnox-number"
            type="text"
            v-model="form.hoa_rfid_semnox_num"
            :class="
              errorMsg['hoa_rfid_semnox_num'] ? 'border-red-300' : 'border-gray-300'
            "
            placeholder="HOA Semnox Number"
          />
          <span
            v-if="errorMsg['hoa_rfid_semnox_num']"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errorMsg["hoa_rfid_semnox_num"][0] }}
          </span>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="user-id">
            HOA Member Name <span class="text-red-300">*</span>
          </label>
          <el-select
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="form.user_id"
            filterable
            remote
            :remote-method="searchEmail"
            placeholder="Please Select Member Name"
          >
            <el-option
              v-for="item in userEmail"
              :key="item.id"
              :label="item.hoa_member_name"
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
        <!--      <div class="mb-4">-->
        <!--        <label-->
        <!--          class="block text-gray-700 text-sm font-bold mb-2"-->
        <!--          for="hoa-rfid-reg-privilege-load"-->
        <!--        >-->
        <!--          HOA RFID Privilege Load-->
        <!--        </label>-->
        <!--        <input-->
        <!--          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"-->
        <!--          id="hoa-rfid-reg-privilege-load"-->
        <!--          type="text"-->
        <!--          v-model="form.hoa_rfid_reg_privilege_load"-->
        <!--          :class="-->
        <!--            errorMsg['hoa_rfid_reg_privilege_load'] ? 'border-red-300' : 'border-gray-300'-->
        <!--          "-->
        <!--          placeholder="HOA RFID Privilege Load"-->
        <!--        />-->
        <!--        <span-->
        <!--          v-if="errorMsg['hoa_rfid_reg_privilege_load']"-->
        <!--          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"-->
        <!--        >-->
        <!--          {{ errorMsg["hoa_rfid_reg_privilege_load"][0] }}-->
        <!--        </span>-->
        <!--      </div>-->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="hoa-rfid-status">
            HOA RFID Status <span class="text-red-300">*</span>
          </label>
          <select
            class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hoa-rfid-status"
            v-model="form.hoa_rfid_reg_status"
            :class="
              errorMsg['hoa_rfid_reg_status'] ? 'border-red-300' : 'border-gray-300'
            "
            placeholder="HOA RFID Status"
          >
            <option value="1">Enable</option>
            <option value="2">Disable</option>
          </select>
          <span
            v-if="errorMsg['hoa_rfid_reg_status']"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errorMsg["hoa_rfid_reg_privilege_load"][0] }}
          </span>
        </div>
      </form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeModal()">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit">Next</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <add-autogate
    :add-autogate="addAutogate"
    :userData="userData"
    :autogateTemplate="autogateTemplate"
    @closeModal="closeAllModal"
    @searchShowUser="searchShowUser"
  ></add-autogate>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";
import AddAutogate from "./AddAutogate.vue";
import _ from "lodash";

const props = defineProps<{
  addRFID: Boolean;
  userEmail: Object;
}>();
const emits = defineEmits(["closeModal", "searchShowUser"]);

function closeAllModal() {
  addAutogate.value = false;
  closeModal();
}
const form = ref({
  hoa_rfid_num: "",
  hoa_rfid_semnox_num: "",
  hoa_rfid_reg_privilege_load: 0,
  hoa_rfid_reg_status: "",
  user_id: "",
});

let errorMsg = ref("");
let addAutogate = ref(false);

store.dispatch("autogate/getUserSubdivision");
store.dispatch("autogate/getAutogateTemplates");

let autogateTemplate = computed(() => store.state.autogate.autogate_template.data);
let userData = computed(() => store.state.autogate.user_subdivision.data);
let searchShowUser = _.debounce(function (user) {
  store
    .dispatch("autogate/getSearchShowAutogates", user)
    .then(
      () => (userData.value = computed(() => store.state.autogate.user_subdivision.data))
    )
    .catch((err) => console.log(err));
}, 1000);

function closeModal() {
  form.value.hoa_rfid_num = "";
  form.value.hoa_rfid_semnox_num = "";
  form.value.hoa_rfid_reg_privilege_load = 0;
  form.value.hoa_rfid_reg_status = "";
  form.value.user_id = "";
  errorMsg.value = "";
  emits("closeModal");
}

function searchEmail(users) {
  return emits("searchShowUser", users);
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
  const res = await store.dispatch("rfid/addRFID", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The rfid data was successfully created",
      });
      addAutogate.value = true;
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

<template>
  <el-dialog
    v-model="addPrivilege"
    title="Add Privilege Package"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="privilege-name">
          Privilege Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="privilege-name"
          :class="
            errorMsg['hoa_privilege_package_name'] ? 'border-red-300' : 'border-gray-300'
          "
          type="text"
          v-model="form.hoa_privilege_package_name"
          placeholder="Privilege Name"
        />
        <span
          v-if="errorMsg['hoa_privilege_package_name']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_privilege_package_name"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="privilege-desc">
          Privilege Description <span class="text-red-300">*</span>
        </label>
        <textarea
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="privilege-desc"
          :class="
            errorMsg['hoa_privilege_package_desc'] ? 'border-red-300' : 'border-gray-300'
          "
          cols="4"
          rows="4"
          v-model="form.hoa_privilege_package_desc"
          placeholder="Privilege Desciption"
        />
        <span
          v-if="errorMsg['hoa_privilege_package_desc']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_privilege_package_desc"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="privilege-category"
        >
          Privilege Category <span class="text-red-300">*</span>
        </label>
        <select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="privilege-category"
          :class="
            errorMsg['hoa_privilege_package_category']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          v-model="form.hoa_privilege_package_category"
          placeholder="Privilege Category"
        >
          <option value="Hotel Room">Hotel Room</option>
          <option value="Af Waterpark">Af Waterpark</option>
          <option value="DTT">DTT</option>
          <option value="Food Outlet">Food Outlet</option>
          <option value="Others">Others</option>
        </select>
        <span
          v-if="errorMsg['hoa_privilege_package_category']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_privilege_package_category"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="privilege-cost">
          Privilege Cost <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="privilege-cost"
          :class="
            errorMsg['hoa_privilege_package_cost'] ? 'border-red-300' : 'border-gray-300'
          "
          type="number"
          v-model="form.hoa_privilege_package_cost"
          placeholder="Privilege Cost"
        />
        <span
          v-if="errorMsg['hoa_privilege_package_cost']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_privilege_package_cost"][0] }}
        </span>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="privilege-limit">
          Privilege Limit <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="privilege-limit"
          :class="
            errorMsg['hoa_privilege_package_limit'] ? 'border-red-300' : 'border-gray-300'
          "
          type="number"
          v-model="form.hoa_privilege_package_limit"
          placeholder="Privilege Limit"
        />
        <span
          v-if="errorMsg['hoa_privilege_package_limit']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_privilege_package_limit"][0] }}
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
  addPrivilege: Boolean;
}>();
const emits = defineEmits(["closeModal"]);

const form = ref({
  hoa_privilege_package_name: "",
  hoa_privilege_package_desc: "",
  hoa_privilege_package_category: "",
  hoa_privilege_package_cost: "",
  hoa_privilege_package_limit: "",
});

const errorMsg = ref("");
let btnLoading = ref(false);
function closeModal() {
  (form.value.hoa_privilege_package_name = ""),
    (form.value.hoa_privilege_package_desc = ""),
    (form.value.hoa_privilege_package_category = ""),
    (form.value.hoa_privilege_package_cost = ""),
    (form.value.hoa_privilege_package_limit = ""),
    (errorMsg.value = "");
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
  const res = await store.dispatch("privilege/addPrivilege", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("privilege/getPrivileges");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The privilege data was successfully created",
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

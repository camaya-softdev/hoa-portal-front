<template>
  <el-dialog
    v-model="changePassword"
    title="Change Password"
    width="30%"
    :before-close="handleClose"
    custom-class="border-2 border-gray-600 opacity-80"
    center
  >
    <form>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="old-password">
          Old Password<span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="old-password"
          type="password"
          v-model="form.old_password"
          :class="errorMsg['old_password'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Old Password"
        />
        <span
          v-if="errorMsg['old_password']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["old_password"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password"
          >New Password<span class="text-red-300">*</span></label
        >
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          v-model="form.password"
          :class="errorMsg['password'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="New Password"
        />
        <span
          v-if="errorMsg['password']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["password"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password-confirmation"
          >Password Confirmation<span class="text-red-300">*</span></label
        >
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password-confirmation"
          type="password"
          v-model="form.password_confirmation"
          :class="
            errorMsg['password_confirmation'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Password Confirmation"
        />
        <span
          v-if="errorMsg['password_confirmation']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["password_confirmation"][0] }}
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
import store from "../../../../store";

const props = defineProps<{
  changePassword: Boolean;
}>();

const emits = defineEmits(["closeModal"]);
const form = ref({
  old_password: "",
  password: "",
  password_confirmation: "",
});

const errorMsg = ref("");

function closeModal() {
  form.value.old_password = "";
  form.value.password = "";
  form.value.password_confirmation = "";
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
    const res = await store.dispatch("adminChangePassword/changePassword", form.value);
    if (res.status == 200) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "You are successfully change your password",
      });
      closeModal();
    } else {
      errorMsg.value = res.response.data.errors;
    }
  } catch (err) {
    await store.commit("alert/notify", {
      title: "Error",
      type: "error",
      message: err.message,
    });
  }
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

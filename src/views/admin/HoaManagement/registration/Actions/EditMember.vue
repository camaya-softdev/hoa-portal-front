<template>
  <el-dialog
    v-model="editMember"
    title="Edit Member"
    width="50%"
    :before-close="handleClose"
    center
  >
    <div v-if="memberLoading">Loading...</div>
    <form v-else>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Email Address
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          :class="errorMsg['email'] ? 'border-red-300' : 'border-gray-300'"
          v-model="form.email"
          placeholder="Email Address"
        />
        <span
          v-if="errorMsg['email']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["email"][0] }}
        </span>
      </div>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa_member_lname"
        >
          Last Name
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa_member_lname"
          type="text"
          :class="
            errorMsg['hoa_member_lname'] ? 'border-red-300' : 'border-gray-300'
          "
          v-model="form.hoa_member_lname"
          placeholder="Last Name"
        />
        <span
          v-if="errorMsg['hoa_member_lname']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_member_lname"][0] }}
        </span>
      </div>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa_member_fname"
        >
          First Name
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa_member_fname"
          type="text"
          :class="
            errorMsg['hoa_member_fname'] ? 'border-red-300' : 'border-gray-300'
          "
          v-model="form.hoa_member_fname"
          placeholder="First Name"
        />
        <span
          v-if="errorMsg['hoa_member_fname']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_member_fname"][0] }}
        </span>
      </div>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa_member_mname"
        >
          Middle Name
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa_member_mname"
          type="text"
          v-model="form.hoa_member_mname"
          placeholder="Middle Name"
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa_member_suffix"
        >
          Suffix
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa_member_suffix"
          type="text"
          v-model="form.hoa_member_suffix"
          placeholder="Suffix"
        />
      </div>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa_member_suffix"
        >
          Notification
        </label>
        <el-checkbox
          value="1"
          v-model="form.hoa_member_ebill"
          label="E-Bill"
          border
        />
        <el-checkbox
          value="1"
          v-model="form.hoa_member_sms"
          label="Sms"
          border
        />
      </div>
    </form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
        <el-button type="primary" @click="updateMember">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";

const props = defineProps<{
  editMember: Boolean;
  editId: Number;
}>();

const emits = defineEmits(["closeModal", "editId"]);

const errorMsg = ref("");

const form = ref({
  id: "",
  email: "",
  hoa_member_lname: "",
  hoa_member_fname: "",
  hoa_member_mname: "",
  hoa_member_suffix: "",
  hoa_member_ebill: 0,
  hoa_member_sms: 0,
});

const memberLoading = computed(() => store.state.member.currentMember.loading);

watch(
  () => store.state.member.currentMember.data,
  (newVal, oldVal) => {
    form.value = { ...JSON.parse(JSON.stringify(newVal.data)) };
  }
);

if (props.editId !== 0) {

  store.dispatch("member/getMember", props.editId);
}

async function updateMember(ev) {
  try {
    ev.preventDefault();
    const res = await store.dispatch("member/updateMember", form.value);
    if (res.status == 200) {
      await store.dispatch("member/getMembers");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The user data was successfully updated",
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
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

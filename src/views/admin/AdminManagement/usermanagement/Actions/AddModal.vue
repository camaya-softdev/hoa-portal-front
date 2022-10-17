<template>
  <el-dialog
    v-model="addDialog"
    title="Add User"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="hoa-member-type">
          HOA Member Type <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="memberType"
          placeholder="HOA Member Type"
        >
          <el-option v-for="data in optionstwo" :label="data.label" :value="data.value" />
        </el-select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="hoa-access-type">
          HOA Access Type <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.hoa_access_type"
          v-if="memberType === 1"
          placeholder="HOA Access Type"
        >
          <el-option v-for="data in options" :label="data.label" :value="data.value" />
        </el-select>
        <el-select
          v-else
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.hoa_access_type"
          placeholder="HOA Access Type"
        >
          <el-option label="Subdivision Admin" :value="2" />
        </el-select>
        <span
          v-if="errorMsg['hoa_access_type']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_access_type"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="subdivision">
          Assigned Subdivision <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.subdivision_id"
          v-if="form.hoa_access_type === 2"
          filterable
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="Subdivision Name"
        >
          <el-option
            v-for="item in subdivisionData"
            :key="item.id"
            :label="item.hoa_subd_name"
            :value="item.id"
          />
        </el-select>
        <input
          v-if="form.hoa_access_type === 1"
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="subdivision"
          type="text"
          value="All"
          disabled
          placeholder="HOA Full Name"
        />
        <!--        <input-->
        <!--          v-if="member"-->
        <!--          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"-->
        <!--          id="subdivision"-->
        <!--          type="text"-->
        <!--          value="All"-->
        <!--          disabled-->
        <!--          placeholder="HOA Full Name"-->
        <!--        />-->
        <span
          v-if="errorMsg['subdivision_id']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["subdivision_id"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="user">
          Email Address <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="users"
          filterable
          remote
          :remote-method="searchEmail"
          :change="onChange(users)"
          placeholder="Email Address"
        >
          <el-option
            v-for="item in userEmail"
            :key="item.id"
            :label="item.email"
            :value="item.id"
          />
        </el-select>
        <span
          v-if="errorMsg['id']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["id"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label for="hoa_full_name" class="block text-gray-700 text-sm font-bold mb-2">
          HOA Full Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa_full_name"
          type="text"
          v-model="fullNameData"
          disabled
          placeholder="HOA Full Name"
        />
      </div>
      <div class="mb-4">
        <label
          for="hoa_contact_number"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          HOA Contact Number
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa_contact_number"
          type="text"
          v-model="form.hoa_member_phone_num"
          placeholder="HOA Contact Number"
        />
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
import { ref, computed } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";

const props = defineProps<{
  addDialog: Boolean;
  userEmail: Object;
  subdivisionData: Object;
  options: Object;
  optionstwo: Object;
}>();
const emits = defineEmits(["closeModal", "searchShowUser"]);

const errorMsg = ref("");
const form = ref({
  hoa_admin: "",
  hoa_member: "",
  hoa_access_type: "",
  subdivision_id: "",
  hoa_member_phone_num: "",
  id: "",
});

let memberType = ref(1);
const users = ref("");
let fullName = ref({});
function onChange(event) {
  if (event) {
    fullName.value = props.userEmail.find((users) => users.id === event);
  }
}
const fullNameData = computed(() =>
  fullName.value !== undefined ? fullName.value.hoa_member_name : ""
);

function searchEmail(users) {
  return emits("searchShowUser", users);
}
function closeModal() {
  memberType.value = 1;
  form.value.hoa_admin = "";
  form.value.hoa_member = "";
  form.value.hoa_access_type = "";
  form.value.subdivision_id = "";
  form.value.id = "";
  users.value = "";
  form.value.hoa_member_phone_num = "";
  fullName.value = {};
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
  form.value.id = users.value;
  if (memberType.value === 1) {
    form.value.hoa_admin = "1";
    form.value.hoa_member = "0";
  }
  if (memberType.value === 2) {
    form.value.hoa_admin = "1";
    form.value.hoa_member = "1";
  }

  if (form.value.subdivision_id.length === 0) {
    form.value.subdivision_id = "0";
  }
  const res = await store.dispatch("user/addUser", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("user/getUsers");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The user data was successfully updated",
      });
      closeModal();
    } else {
      if (res.response.data.errors) {
        errorMsg.value = res.response.data.errors;
      }
      await store.commit("alert/notify", {
        title: "Error",
        type: "error",
        message: "This User has been already an Admin",
      });
    }
  } catch (err) {
    await store.commit("alert/notify", {
      title: "Error",
      type: "error",
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

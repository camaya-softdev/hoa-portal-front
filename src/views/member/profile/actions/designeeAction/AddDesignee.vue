<template>
  <el-dialog
    v-model="addDesignee"
    title="Add Designee"
    width="50%"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="name-of-designee-name"
        >
          Name of Designee
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name-of-designee-name"
          type="text"
          v-model="form.hoa_member_designee_name"
          :class="
            errorMsg['hoa_member_designee_name'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Full name of Designee"
        />
        <span
          v-if="errorMsg['hoa_member_designee_name']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_member_designee_name"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="relationship">
          Relationship
        </label>
        <select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="relationship"
          type="text"
          v-model="form.hoa_member_designee_relation"
          :class="
            errorMsg['hoa_member_designee_relation']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="Relationship"
        >
          <option disabled>For Married Owner:</option>
          <option>Spouse</option>
          <option>Children</option>
          <option disabled>For Single Owner:</option>
          <option>Parents</option>
        </select>
        <span
          v-if="errorMsg['hoa_member_designee_relation']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_member_designee_relation"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="birthday">
          Birthday
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="birthday"
          type="date"
          v-model="form.hoa_member_bday"
          :class="errorMsg['hoa_member_bday'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Birthday"
        />
        <span
          v-if="errorMsg['hoa_member_bday']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_member_bday"][0] }}
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
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";

const props = defineProps<{
  addDesignee: Boolean;
}>();
const emits = defineEmits(["closeModal"]);

let form = ref({
  hoa_member_designee_name: "",
  hoa_member_designee_relation: "",
  hoa_member_bday: "",
});

let errorMsg = ref("");

function closeModal() {
  form.value.hoa_member_designee_name = "";
  form.value.hoa_member_designee_relation = "";
  form.value.hoa_member_bday = "";
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
  console.log(form.value);
  const res = await store.dispatch("designee/addDesignee", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("designee/getDesignees");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The designee data was successfully created",
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

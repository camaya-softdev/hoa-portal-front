<template>
  <el-dialog
    v-model="editDesignee"
    title="Edit Member Designee"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
  <div v-if="designeeLoading">Loading...</div>

    <form v-else>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-member-designee-name"
        >
          Designee Full Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-member-designee-name"
          type="text"
          v-model="form.hoa_member_designee_name"
          :class="
            errorMsg['hoa_member_designee_name'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Designee FullName"
        />
        <span
          v-if="errorMsg['hoa_member_designee_name']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_member_designee_name"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-member-designee-relation"
        >
          Designee Relation <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-member-designee-relation"
          type="text"
          v-model="form.hoa_member_designee_relation"
          :class="
            errorMsg['hoa_member_designee_relation']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="Designee Relation"
        />
        <span
          v-if="errorMsg['hoa_member_designee_relation']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_member_designee_relation"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="hoa-member-bday">
          Designee Birthday <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-member-bday"
          type="date"
          v-model="form.hoa_member_bday"
          :class="errorMsg['hoa_member_bday'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Subdivision Block Number"
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
        <el-button
          type="primary"
          @click="handleSubmit"
          :disabled="btnLoading"
          :loading="btnLoading"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch,computed } from "vue";
import { ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
import store from "../../../../../store";

const props = defineProps<{
  editDesignee: Boolean;
  editId: Number;
}>();

const route = useRoute();
const emits = defineEmits(["closeModal", "editId"]);
const btnLoading = ref(false);

const form = ref({
  hoa_member_designee_name: "",
  hoa_member_bday: "",
  hoa_member_designee_relation: "",
  user_id: route.params.user_id,
});

if (props.editId !== 0) {
  store.dispatch("adminMemberDesignee/getDesignee", props.editId);
}
const designeeLoading = computed(() => store.state.adminMemberDesignee.currentDesignee.loading);
watch(
  () => store.state.adminMemberDesignee.currentDesignee.data,
  (newVal, oldVal) => {
    form.value = { ...JSON.parse(JSON.stringify(newVal.data)) };
    console.log(form.value);
    console.log(newVal.data)
  }
);
const errorMsg = ref("");

function closeModal() {
  form.value.hoa_member_bday = "";
  form.value.hoa_member_designee_name = "";
  form.value.hoa_member_designee_relation = "";
  errorMsg.value = "";
  emits("closeModal");
  emits('editId');
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
  btnLoading.value = true;
  const res = await store.dispatch("adminMemberDesignee/editDesignee", form.value);
  try {
    if (res.status === 200) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The designee data was successfully updated",
      });
      closeModal();
    } else {
      if (res.response.data.errors) {
        errorMsg.value = res.response.data.errors;
      }
      await store.commit("alert/notify", {
        title: "Error",
        type: "error",
        message: errorMsg.value,
      });
    }
  } catch (err) {
    await store.commit("alert/notify", {
      title: "Error",
      type: "error",
      message: err,
    });
  }
  btnLoading.value = false;
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

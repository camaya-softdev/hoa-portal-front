<template>
  <el-dialog
    v-model="editRFID"
    title="Edit RFID"
    width="50%"
    :before-close="handleClose"
    center
  >
    <div v-if="rfidLoading">Loading...</div>
    <form v-else>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-rfid-num"
        >
          HOA RFID Number <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-rfid-num"
          type="text"
          disabled
          v-model="form.hoa_rfid_num"
          :class="
            errorMsg['hoa_rfid_num'] ? 'border-red-300' : 'border-gray-300'
          "
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
          disabled
          v-model="form.hoa_rfid_semnox_num"
          :class="
            errorMsg['hoa_rfid_semnox_num'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="HOA RFID Semnox Number"
        />
        <span
          v-if="errorMsg['hoa_rfid_semnox_num']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_rfid_semnox_num"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="user-id"
        >
          HOA Member Name <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.user_id"
          disabled
          filterable placeholder="Please Select Member Name">
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

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-rfid-status"
        >
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
        <el-button type="primary" @click="handleSubmit"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import {ref, computed, watch} from "vue";
  import { ElMessageBox } from "element-plus";
  import store from "../../../../../store";

  const props = defineProps<{
    editRFID: Boolean;
    userEmail:Object;
    editId: Number;
  }>();
  const emits = defineEmits(["closeModal", "editId"]);

  const form = ref({
    hoa_rfid_num:'',
    hoa_rfid_semnox_num:'',
    hoa_rfid_reg_privilege_load:0,
    hoa_rfid_reg_status:'',
    user_id:''
  });

  let errorMsg = ref('')
  let userData = ref('')
  function closeModal(){
    errorMsg.value = '';
    emits("editId");
    emits("closeModal");
  }

  if (props.editId !== 0) {
    store.dispatch("rfid/getRFID", props.editId);
  }
  const rfidLoading = computed(
    () => store.state.rfid.currentRFID.loading
  );

  watch(
    () => store.state.rfid.currentRFID.data,
    (newVal, oldVal) => {
      form.value = { ...JSON.parse(JSON.stringify(newVal.data)) };
    }
  );
  const handleClose = (done: () => void) => {
    ElMessageBox.confirm("Are you sure to close this dialog?")
      .then(() => {
        closeModal()
        done();
      })
      .catch(() => {});
  };
  function updateDropdowns(index){
    props.userEmail[index-1]
  }
  async function handleSubmit() {
    const res = await store.dispatch("rfid/editRFID", form.value);
    try {
      if (res.status === 200 || res.status === 201) {
        await store.dispatch("rfid/getRFIDs");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The rfid data was successfully updated",
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

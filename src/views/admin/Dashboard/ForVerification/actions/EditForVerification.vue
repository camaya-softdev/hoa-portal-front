<template>
  <el-dialog
    v-model="editForVerification"
    title="Edit Member Transaction"
    width="30%"
    :before-close="handleClose"
    center
  >
    <div v-if="currentPaymentHistoryLoading">Loading...</div>
    <form v-else>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="date-paid">
          Date Paid <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="date-paid"
          type="date"
          v-model="form.hoa_billing_date_paid"
          :class="
            errorMsg['hoa_billing_date_paid'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Date Paid"
        />
        <span
          v-if="errorMsg['hoa_billing_date_paid']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_billing_date_paid"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2"
          >Billing Status <span class="text-red-300">*</span></label
        >
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.hoa_billing_status"
          placeholder="Please Select Billing Status"
        >
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span
          v-if="errorMsg['subdivision_id']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["subdivision_id"][0] }}
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
import { ref, watch, computed } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";
import { useRoute } from "vue-router";

const props = defineProps<{
  editForVerification: Boolean;
  editId: Number;
}>();

const emits = defineEmits(["closeModal", "editId"]);
const route = useRoute();
const form = ref({
  hoa_billing_status: "",
  hoa_billing_date_paid: "",
});

const options = [
  {
    value: "Paid",
    label: "Paid",
  },
  {
    value: "For Verification",
    label: "For Verification",
  },
  {
    value: "Unpaid",
    label: "Unpaid",
  },
];
const errorMsg = ref("");

if (props.editId !== 0) {
  store.dispatch("paymentHistory/getCurrentPaymentHistory", props.editId);
}
const currentPaymentHistoryLoading = computed(
  () => store.state.paymentHistory.currentPaymentHistory.loading
);
watch(
  () => store.state.paymentHistory.currentPaymentHistory.data,
  (newVal, oldVal) => {
    form.value = { ...JSON.parse(JSON.stringify(newVal.data)) };
  }
);
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

async function handleSubmit() {
  try {
    const res = await store.dispatch("paymentHistory/editPaymentHistory", form.value);
    if (res.status == 200) {
      store.dispatch("forVerification/getForVerifications");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The payment transaction was successfully updated",
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

<template>
  <el-dialog
    v-model="addLoad"
    title="Add Load"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-privilege-transaction-package-name"
        >
          HOA LOAD Transaction Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-privilege-transaction-package-name"
          type="text"
          v-model="form.hoa_privilege_transaction_name"
          :class="
            errorMsg['hoa_privilege_transaction_type']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="HOA Load Transaction Name"
        />
        <span
          v-if="errorMsg['hoa_privilege_transaction_name']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_privilege_transaction_name"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-privilege-transaction-description"
        >
          HOA LOAD Transaction Description <span class="text-red-300">*</span>
        </label>
        <textarea
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-privilege-transaction-description"
          rows="5"
          cols="5"
          v-model="form.hoa_privilege_transaction_desc"
          :class="
            errorMsg['hoa_privilege_transaction_desc']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="HOA Load Transaction Description"
        />
        <span
          v-if="errorMsg['hoa_privilege_transaction_desc']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_privilege_transaction_desc"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-privilege-transaction-type"
        >
          HOA LOAD Transaction Type <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-privilege-transaction-type"
          type="text"
          v-model="form.hoa_privilege_transaction_type"
          :class="
            errorMsg['hoa_privilege_transaction_type']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          disabled
          placeholder="HOA Privilege Transaction Type"
        />
        <span
          v-if="errorMsg['hoa_privilege_transaction_type']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_privilege_transaction_type"][0] }}
        </span>
      </div>

      <!-- <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-privilege-transaction-booking-number"
        >
          HOA Privilege Transaction Booking Number
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-privilege-transaction-booking-number"
          type="text"
          v-model="form.hoa_privilege_booking_num"
          :class="
            errorMsg['hoa_privilege_booking_num'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="HOA Privilege Transaction Booking Number"
        />
        <span
          v-if="errorMsg['hoa_privilege_booking_num']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_privilege_booking_num"][0] }}
        </span>
      </div> -->
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-privilege-transaction-amount"
        >
          HOA LOAD Transaction Amount <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-privilege-transaction-amount"
          type="number"
          v-model="form.hoa_privilege_transaction_amount"
          :class="
            errorMsg['hoa_privilege_transaction_amount']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="  HOA Load Transaction Amount"
        />
        <span
          v-if="errorMsg['hoa_privilege_transaction_amount']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_privilege_transaction_amount"][0] }}
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
import store from "../../../../../store";

const props = defineProps<{
  addLoad: Boolean;
  cardID: Number;
}>();

const emits = defineEmits(["closeModal"]);

const form = ref({
  hoa_privilege_transaction_name: "",
  hoa_privilege_transaction_desc: "",
  hoa_privilege_transaction_type: "LOAD",
  hoa_privilege_transaction_qty: 0,
  hoa_privilege_transaction_amount: "",
  card_id: 0,
  hoa_privilege_booking_num: "LOAD",
  hoa_transaction: 0,
});

let errorMsg = ref("");

function closeModal() {
  form.value.hoa_privilege_transaction_name = "";
  form.value.hoa_privilege_transaction_desc = "";
  form.value.hoa_privilege_transaction_amount = "";
  form.value.hoa_privilege_booking_num = "";
  form.value.card_id = 0;
  form.value.hoa_transaction = 0;
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
  form.value.card_id = props.cardID;
  form.value.hoa_transaction = 2;
  const res = await store.dispatch(
    "payment_transaction/addPaymentTransaction",
    form.value
  );
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("payment_transaction/getPaymentTransactions", {
        id: props.cardID,
      });
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The payment transaction data was successfully created",
      });
      closeModal();
    } else {
      errorMsg.value = res.response.data.errors;
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

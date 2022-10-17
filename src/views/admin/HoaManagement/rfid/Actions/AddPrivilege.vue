<template>
  <el-dialog
    v-model="addPrivilege"
    title="Avail Privilege"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="card-id">
          HOA Privilege Transaction Package Name
          <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="privilege"
          @change="onChange(privilege)"
          filterable
          placeholder="Please Select Member Name"
        >
          <el-option
            v-for="item in privilegeData"
            :key="item.id"
            :label="item.hoa_privilege_package_name"
            :value="item.hoa_privilege_package_name"
          />
        </el-select>
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
          HOA Privilege Transaction Description
        </label>
        <textarea
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-privilege-transaction-description"
          rows="5"
          cols="5"
          disabled
          v-model="selectedOptions"
          :class="
            errorMsg['hoa_privilege_transaction_desc']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="HOA Privilege Transaction Description"
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
          HOA Privilege Transaction Type <span class="text-red-300">*</span>
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

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-privilege-transaction-booking-number"
        >
          Booking Reference Number <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-privilege-transaction-booking-number"
          type="text"
          v-model="form.hoa_privilege_booking_num"
          :class="
            errorMsg['hoa_privilege_booking_num'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="Booking Reference Number"
        />
        <span
          v-if="errorMsg['hoa_privilege_booking_num']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_privilege_booking_num"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-privilege-transaction-amount"
        >
          HOA Privilege Transaction Quantity <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-privilege-transaction-amount"
          type="number"
          v-model="form.hoa_privilege_transaction_qty"
          :class="
            errorMsg['hoa_privilege_transaction_qty']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="  HOA Privilege Transaction Quantity"
        />
        <span
          v-if="errorMsg['hoa_privilege_transaction_qty']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_privilege_transaction_qty"][0] }}
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
import { ref, computed } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";
import { useRouter } from "vue-router";

const props = defineProps<{
  addPrivilege: Boolean;
  privilegeData: Object;
  cardID: Number;
}>();

const router = useRouter();
const emits = defineEmits(["closeModal", "loadAmount"]);

const form = ref({
  hoa_privilege_transaction_name: "",
  hoa_privilege_transaction_desc: "",
  hoa_privilege_transaction_qty: 0,
  hoa_privilege_transaction_type: "PCKG",
  hoa_privilege_transaction_amount: 0,
  card_id: 0,
  hoa_privilege_booking_num: "",
  hoa_transaction: 0,
});

let errorMsg = ref("");

function closeModal() {
  form.value.hoa_privilege_transaction_name = "";
  form.value.hoa_privilege_transaction_desc = "";
  form.value.hoa_privilege_transaction_amount = 0;
  form.value.hoa_privilege_booking_num = "";
  privilege.value = "";
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

let data = ref({});
let privilege = ref("");
function onChange(event) {
  if (event) {
    return (data.value = props.privilegeData.find(
      (privileges) => privileges.hoa_privilege_package_name === event
    ));
  }
}

const selectedOptions = computed(() =>
  data.value !== undefined ? data.value.hoa_privilege_package_desc : ""
);
const cost = computed(() =>
  data.value !== undefined ? data.value.hoa_privilege_package_cost : ""
);
const limit = computed(() =>
  data.value !== undefined ? data.value.hoa_privilege_package_limit : ""
);

function changeLoad(load) {
  console.log(load);
  return emits("loadAmount", load);
}
async function handleSubmit() {
  form.value.card_id = props.cardID;
  form.value.hoa_privilege_transaction_amount =
    form.value.hoa_privilege_transaction_qty * cost.value;
  form.value.hoa_privilege_transaction_name = privilege.value;
  form.value.hoa_privilege_transaction_desc = selectedOptions.value;
  form.value.hoa_transaction = 1;

  const load = parseInt(form.value.hoa_privilege_transaction_amount);

  if (form.value.hoa_privilege_transaction_qty > limit.value) {
    return store.commit("alert/notify", {
      title: "Error",
      type: "error",
      message: `The quantity must not be greater than on your picked privilege your only limit was ${limit.value}`,
    });
  }

  const res = await store.dispatch(
    "payment_transaction/addPaymentTransaction",
    form.value
  );
  try {
    if (res.status === 200 || res.status === 201) {
      await changeLoad(load);
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
      message: `The quantity must not be greater than on your picked privilege your only limit was ${limit.value}`,
    });
  }

  //   await store.commit("alert/notify", {
  //     title: "Error",
  //     type: "danger",
  //     message: err,
  //   });
  // }
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

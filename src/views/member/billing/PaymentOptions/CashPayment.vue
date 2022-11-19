<template>
  <form action="#" method="POST">
    <div class="shadow sm:rounded-md sm:overflow-hidden bg-white opacity-80">
      <div class="px-4 py-5 space-y-6 sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label for="bank-name" class="block text-sm font-medium text-gray-700"
              >Bank Name <span class="text-red-300">*</span></label
            >
            <input
              type="text"
              name="memberID"
              v-model="form.bank_name"
              :class="errorMsg['bank_name'] ? 'border-red-300' : 'border-gray-300'"
              id="bank-name"
              autocomplete="bank-name"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <span
              v-if="errorMsg['bank_name']"
              class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            >
              {{ errorMsg["bank_name"][0] }}
            </span>
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label for="amount-paid" class="block text-sm font-medium text-gray-700"
              >Amount Paid <span class="text-red-300">*</span></label
            >
            <input
              type="number"
              name="amount-paid"
              id="amount-paid"
              v-model="form.amount_paid"
              :class="errorMsg['amount_paid'] ? 'border-red-300' : 'border-gray-300'"
              autocomplete="amount-paid"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <span
              v-if="errorMsg['amount_paid']"
              class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            >
              {{ errorMsg["amount_paid"][0] }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="date-paid" class="block text-sm font-medium text-gray-700"
              >Date Paid <span class="text-red-300">*</span></label
            >
            <input
              type="date"
              name="date-paid"
              v-model="form.date_paid"
              id="date-paid"
              :class="errorMsg['date_paid'] ? 'border-red-300' : 'border-gray-300'"
              autocomplete="date-paid"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <span
              v-if="errorMsg['date_paid']"
              class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            >
              {{ errorMsg["date_paid"][0] }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700"> Deposit Slip </label>
            <el-upload
              class="upload-demo"
              drag
              :class="errorMsg['filenames'] ? 'border-red-300' : 'border-gray-300'"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              :on-change="updateImageList"
              accept=".jpg, .png, .jpeg, .pdf, .svg, .gif"
              multiple
            >
              <el-icon class="el-icon--upload">
                <upload-filled />
              </el-icon>
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpeg,jpg,png,gif,svg/pdf files with a size less than 2mb
                </div>
              </template>
            </el-upload>
            <span
              v-if="errorMsg['filenames']"
              class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            >
              {{ errorMsg["filenames"][0] }}
            </span>
          </div>

          <div class="col-span-6 sm:col-span-6">
            <label for="description" class="block text-sm font-medium text-gray-700"
              >Description <span class="text-red-300">*</span></label
            >
            <textarea
              cols="5"
              rows="5"
              name="memberID"
              v-model="form.description"
              :class="errorMsg['description'] ? 'border-red-300' : 'border-gray-300'"
              id="bank-name"
              autocomplete="description"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            ></textarea>
            <span
              v-if="errorMsg['description']"
              class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            >
              {{ errorMsg["description"][0] }}
            </span>
          </div>
        </div>
      </div>
      <div class="bg-gray-100 px-5 py-4 text-right sm:px-6 mt-10">
        <a
          type="button"
          @click="handleSubmit"
          class="cursor-pointer ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </a>
      </div>
    </div>
  </form>
</template>
<script setup>
import { ref } from "vue";
import store from "../../../../store";
import { useRoute, useRouter } from "vue-router";
import { UploadFilled } from "@element-plus/icons-vue";

const form = ref({
  bank_name: "",
  amount_paid: "",
  filenames: [],
  date_paid: "",
  description: "",
});
const route = useRoute();
const router = useRouter();
const errorMsg = ref("");
const updateImageList = (file) => {
  const rawFile = file.raw;
  const reader = new FileReader();
  reader.onload = () => {
    form.value.filenames.push(reader.result);
  };
  reader.readAsDataURL(rawFile);
};

async function handleSubmit() {
  try {
    const res = await store.dispatch("paymentOption/cashPayment", {
      id: route.params.id,
      payment: form.value,
    });
    if (res.status === 200 || res.status === 201) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "Your payment was successfully submitted",
      });
      await router.push({ name: "Billing" });
    } else {
      errorMsg.value = res.response.data.errors;
    }
  } catch (err) {
    throw err;
  }
}
</script>

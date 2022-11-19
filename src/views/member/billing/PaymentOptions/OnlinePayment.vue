<template>
  <div class="container">
    <div class="row">
      <div class="shadow sm:rounded-md sm:overflow-hidden bg-white opacity-80">
        <div class="px-4 py-5 space-y-6 sm:p-6">
          <div class="grid grid-cols-9 gap-6">
            <div class="col-span-4 sm:col-span-3">
              <img src="/payment_provider/jcb.png" class="object-fit w-20" alt="JCB" />
            </div>
            <div class="col-span-4 sm:col-span-3">
              <img src="/payment_provider/visa.png" class="object-fit w-20" alt="Visa" />
            </div>

            <div class="col-span-4 sm:col-span-3">
              <img
                src="/payment_provider/mastercard.png"
                class="object-fit w-20"
                alt="MasterCard"
              />
            </div>
          </div>
        </div>
        <div class="bg-gray-100 px-5 py-4 text-right sm:px-6 mt-10">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="handleSubmit"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import store from "../../../../store";
const route = useRoute();
const billingID = route.params.id;
async function handleSubmit() {
  const res = await store.dispatch("paymentOption/onlinePayment", billingID);
  if (res.status === 200) {
    return window.location.replace(res.data);
  }
}
</script>

<style scoped></style>

<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900 mt-10">
              Bill Payment
            </h3>
            <p class="mt-1 text-sm text-gray-600">Payment Option</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow overflow-hidden sm:rounded-md mt-10">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="memberID"
                    class="block text-sm font-medium text-gray-700"
                  >Balance</label
                  >
                  <input
                    type="text"
                    name="memberID"
                    id="memberID"
                    :value="billPaymentData.total_cost"
                    disabled
                    autocomplete="memberID"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="email-address"
                    class="block text-sm font-medium text-gray-700"
                  >Due Date</label
                  >
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    :value="billPaymentData.payment_due"
                    disabled
                    autocomplete="email-address"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-6">
                  <label
                    for="subdivision"
                    class="block text-sm font-medium text-gray-700"
                  >Payment Option</label
                  >
                  <select
                    id="subdivision"
                    disabled
                    name="subdivision"
                    v-model="optionsVar"
                    @click="paymentOption"
                    autocomplete="country-name"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="1">Cash/Bank Deposit/Bank Transfer</option>
                    <option value="2">Credit Card</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200"/>
      </div>
    </div>
    <div v-if="optionsVar" class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900 mt-5">
            Payment Address
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            This information will be saved as reference
          </p>
        </div>
      </div>
      <div v-if="cashPayment" class="mt-5 md:mt-0 md:col-span-2">
        <CashPayment></CashPayment>
      </div>
      <div v-if="onlinePayment" class="mt-5 md:mt-0 md:col-span-2">
        <online-payment></online-payment>
      </div>
    </div>
    <div class="bg-gray-100 px-5 py-4 text-right sm:px-6 mt-10">
      <router-link
        type="button"
        to="/billing"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Back
      </router-link>
    </div>
  </div>
</template>
<script setup>
  import {computed, ref} from "vue";
  import CashPayment from "./PaymentOptions/CashPayment.vue";
  import OnlinePayment from "./PaymentOptions/OnlinePayment.vue";
  import store from "../../../store";
  import {useRoute} from 'vue-router'

  const route = useRoute();

  store.dispatch('billPayment/getBillPayments',route.params.id)
  const billPaymentData = computed(() => store.state.billPayment.billPayments.data)
  const billPaymentLoading = computed(() => store.state.billPayment.billPayments.loading)

  let cashPayment = ref(true);
  let onlinePayment = ref(false);
  let optionsVar = ref(1);

  function paymentOption() {
    let optionsNumber = parseInt(optionsVar.value);
    if (optionsNumber === 1) {
      cashPayment.value = true;

      onlinePayment.value = false;
    } else if (optionsNumber === 2) {
      cashPayment.value = false;

      onlinePayment.value = true;
    }
  }
</script>

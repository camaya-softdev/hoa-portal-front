<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:p-6 sm:px-0 bg-white opacity-90">
            <h3 class="text-lg font-medium leading-6 text-black pl-3">
              Personal Information
            </h3>
            <p class="mt-1 text-sm text-black pl-3">
              Use a permanent address where you can receive mail.
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="handleSubmit">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6 opacity-90">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="memberID" class="block text-sm font-medium text-gray-700"
                    >Member ID</label
                  >
                  <input
                    type="text"
                    name="memberID"
                    id="memberID"
                    v-model="form.id"
                    disabled
                    autocomplete="memberID"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="email-address"
                    class="block text-sm font-medium text-gray-700"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    v-model="form.email"
                    autocomplete="email-address"
                    :class="errorMsg['email'] ? 'border-red-300' : 'border-gray-300'"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <span
                    v-if="errorMsg['email']"
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                  >
                    {{ errorMsg["email"][0] }}
                  </span>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="last-name" class="block text-sm font-medium text-gray-700"
                    >Last name</label
                  >
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    v-model="form.hoa_member_lname"
                    :class="
                      errorMsg['hoa_member_lname'] ? 'border-red-300' : 'border-gray-300'
                    "
                    autocomplete="last-name"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <span
                    v-if="errorMsg['hoa_member_lname']"
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                  >
                    {{ errorMsg["hoa_member_lname"][0] }}
                  </span>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="first-name" class="block text-sm font-medium text-gray-700"
                    >First name</label
                  >
                  <input
                    type="text"
                    name="first-name"
                    v-model="form.hoa_member_fname"
                    :class="
                      errorMsg['hoa_member_fname'] ? 'border-red-300' : 'border-gray-300'
                    "
                    id="first-name"
                    autocomplete="family-name"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <span
                    v-if="errorMsg['hoa_member_fname']"
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                  >
                    {{ errorMsg["hoa_member_fname"][0] }}
                  </span>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="middle-name" class="block text-sm font-medium text-gray-700"
                    >Middle name</label
                  >
                  <input
                    type="text"
                    name="middle-name"
                    id="middle-name"
                    v-model="form.hoa_member_mname"
                    :class="
                      errorMsg['hoa_member_mname'] ? 'border-red-300' : 'border-gray-300'
                    "
                    autocomplete="middle-name"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <span
                    v-if="errorMsg['hoa_member_mname']"
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                  >
                    {{ errorMsg["hoa_member_mname"][0] }}
                  </span>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="contact-number"
                    class="block text-sm font-medium text-gray-700"
                    >Contact Number <span class="text-red-300">*</span></label
                  >
                  <input
                    type="text"
                    name="contact-number"
                    id="contact-number"
                    v-model="form.hoa_member_phone_num"
                    :class="
                      errorMsg['hoa_member_phone_num']
                        ? 'border-red-300'
                        : 'border-gray-300'
                    "
                    autocomplete="contact-number"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <span
                    v-if="errorMsg['hoa_member_phone_num']"
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                  >
                    {{ errorMsg["hoa_member_phone_num"][0] }}
                  </span>
                </div>

                <div class="col-span-6 sm:col-span-6">
                  <label for="subdivision" class="block text-sm font-medium text-gray-700"
                    >Subdivision</label
                  >
                  <input
                    id="subdivision"
                    name="subdivision"
                    type="text"
                    disabled
                    v-model="form.hoa_subd_name"
                    autocomplete="country-name"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="house-number"
                    class="block text-sm font-medium text-gray-700"
                    >House Number <span class="text-red-300">*</span></label
                  >
                  <input
                    type="number"
                    name="last-name"
                    v-model="form.hoa_subd_lot_house_num"
                    :class="
                      errorMsg['hoa_subd_lot_num'] ? 'border-red-300' : 'border-gray-300'
                    "
                    id="house-number"
                    autocomplete="house-number"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <span
                    v-if="errorMsg['hoa_subd_lot_num']"
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                  >
                    {{ errorMsg["hoa_subd_lot_num"][0] }}
                  </span>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="street-name" class="block text-sm font-medium text-gray-700"
                    >Street Name <span class="text-red-300">*</span></label
                  >
                  <input
                    type="text"
                    name="street-name"
                    v-model="form.hoa_subd_lot_street_name"
                    :class="
                      errorMsg['hoa_subd_lot_street_name']
                        ? 'border-red-300'
                        : 'border-gray-300'
                    "
                    id="street-name"
                    autocomplete="street-name"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <span
                    v-if="errorMsg['hoa_subd_lot_street_name']"
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                  >
                    {{ errorMsg["hoa_subd_lot_street_name"][0] }}
                  </span>
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label
                    for="lot-block-number"
                    class="block text-sm font-medium text-gray-700"
                    >Block Number</label
                  >
                  <input
                    type="text"
                    name="lot-block-number"
                    id="lot-block-number"
                    disabled
                    v-model="form.hoa_subd_lot_block"
                    autocomplete="block-number"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    for="block-number"
                    class="block text-sm font-medium text-gray-700"
                    >Lot Number</label
                  >
                  <input
                    type="text"
                    name="block-number"
                    disabled
                    v-model="form.hoa_subd_lot_num"
                    id="block-number"
                    autocomplete="block-number"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="lot-area" class="block text-sm font-medium text-gray-700"
                    >Lot Area</label
                  >
                  <input
                    type="text"
                    name="lot-area"
                    disabled
                    v-model="form.hoa_subd_lot_area"
                    id="lot-area"
                    autocomplete="lot-area"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 opacity-80">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transform transition duration-500 hover:scale-105"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import store from "../../../../store";
import { ref, computed, watch } from "vue";

store.dispatch("information/getInformations");
let form = ref({
  id: "",
  lotId: "",
  hoa_member_lname: "",
  hoa_member_fname: "",
  hoa_member_mname: "",
  email: "",
  hoa_member_phone_num: "",
  hoa_subd_name: "",
  hoa_subd_lot_street_name: "",
  hoa_subd_lot_house_num: "",
  hoa_subd_lot_block: "",
  hoa_subd_lot_num: "",
  hoa_subd_lot_area: "",
});
watch(
  () => store.state.information.information.data,
  (newVal, oldVal) => {
    form.value = { ...JSON.parse(JSON.stringify(newVal)) };
  }
);
let errorMsg = ref("");

async function handleSubmit() {
  const res = await store.dispatch("information/editInformation", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("information/getInformations");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The personal information data was successfully updated",
      });
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
<style></style>

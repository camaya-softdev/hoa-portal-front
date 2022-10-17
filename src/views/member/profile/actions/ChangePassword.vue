<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:p-6 sm:px-0 bg-white opacity-80">
            <h3 class="text-lg font-medium leading-6 text-black pl-3">
              Change your Password
            </h3>
            <p class="mt-1 text-sm text-black pl-3">
              you must change or remember your password
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="handleSubmit">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6 opacity-80">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6">
                  <label for="password" class="block text-sm font-medium text-gray-700"
                    >New Password <span class="text-red-300">*</span></label
                  >
                  <input
                    type="password"
                    name="password"
                    v-model="form.password"
                    :class="errorMsg['password'] ? 'border-red-300' : 'border-gray-300'"
                    id="password"
                    autocomplete="password"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <span
                    v-if="errorMsg['password']"
                    class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                  >
                    {{ errorMsg["password"][0] }}
                  </span>
                </div>
                <div class="col-span-6">
                  <label for="password" class="block text-sm font-medium text-gray-700"
                    >Confirm Password <span class="text-red-300">*</span></label
                  >
                  <input
                    type="password"
                    name="password-confirmation"
                    id="password-confirmation"
                    v-model="form.password_confirmation"
                    autocomplete="password-confirmation"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 opacity-80">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

let form = ref({
  password: "",
  password_confirmation: "",
});
let errorMsg = ref([]);
async function handleSubmit() {
  const res = await store.dispatch("changePassword/editChangePassword", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("notification/getNotifications");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "successfully change your password",
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

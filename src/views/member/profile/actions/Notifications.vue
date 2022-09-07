<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Notifications
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            Decide which communications you'd like to receive and how.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="handleSubmit">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <fieldset>
                <legend class="text-base font-medium text-gray-900">
                  By Email
                </legend>
                <div class="mt-4 space-y-4">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="comments"
                        checked
                        disabled
                        name="comments"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="comments"
                        class="font-medium text-gray-700"
                      >Announcement</label
                      >
                      <p class="text-gray-500">
                        Get notified on a Latest Announcement.
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="candidates"
                        name="candidates"
                        disabled
                        checked
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="candidates"
                        class="font-medium text-gray-700"
                      >News</label
                      >
                      <p class="text-gray-500">
                        Get notified on a Latest News.
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="offers"
                        name="offers"
                        :value="1"
                        v-model="form.hoa_member_ebill"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="offers"
                        class="font-medium text-gray-700"
                      >E-Billing</label
                      >
                      <p class="text-gray-500">
                        Get notified when Latest Billing.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <div>
                  <legend class="text-base font-medium text-gray-900">
                    Push Notifications
                  </legend>
                  <p class="text-sm text-gray-500">
                    These are delivered via SMS to your mobile phone.
                  </p>
                </div>
                <div class="mt-4 space-y-4">
                  <div class="flex items-center">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      disabled
                      checked
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      for="push-everything"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Everything
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="push-email"
                      name="push-notifications"
                      disabled
                      checked
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      for="push-email"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Same as email
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      disabled
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      for="push-nothing"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
  import {ref, computed, watch} from "vue";


  store.dispatch('notification/getNotifications')
  let form = ref({
    hoa_member_ebill:false,
    hoa_member_sms:true
  })
  watch(() => store.state.notification.notification.data,
    (newVal, oldVal) => {
      form.value = {...JSON.parse(JSON.stringify(newVal))}
      if(newVal.hoa_member_ebill === 1){
        form.value.hoa_member_ebill = true;
      }
    });
  let errorMsg = ref('');


  async function handleSubmit() {
    const res = await store.dispatch("notification/editNotification", form.value);
    try {
      if (res.status === 200 || res.status === 201) {
        await store.dispatch("notification/getNotifications");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The notification data was successfully updated",
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
<style>

</style>

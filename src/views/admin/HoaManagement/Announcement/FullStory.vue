<template>
  <page-component
    navTitle="Member Management"
    navContent="Event"
    navLink="Announcement"
    navChildContent="Full Story"
  >
    <template v-slot:content>
      <div
        v-if="announcementLoading"
        v-loading.fullscreen.lock="announcementLoading"
        element-loading-text="Fetching Data..."
      ></div>
      <div class="mb-4 pb-4 bg-white opacity-80" v-else>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Replace with your content -->
          <div class="px-4 py-6 sm:px-0 mt-5">
            <div class="flex justify-center">
              <div class="mt-4 mb-2">
                <label for="description" class="block text-sm font-medium text-gray-700">
                  <div class="flex justify-between mb-4">
                    <a
                      @click="handleSubmit"
                      href="#"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >Save</a
                    >
                  </div>
                </label>
                <!-- <textarea
            rows="30"
            cols="100"
            name="description"
            v-model="data.hoa_event_notices_fullstory"
            id="description"

            autocomplete="description"
            :class="
            errorMsg['hoa_event_notices_fullstory'] ? 'border-red-300' : 'border-gray-300'
          "
            placeholder="Full Story"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          ></textarea> -->

                <RichTextEditor
                  class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="hoa-autogate-template-message"
                  v-model:content="data.hoa_event_notices_fullstory"
                />
                <span
                  v-if="errorMsg['hoa_event_notices_fullstory']"
                  class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
                >
                  {{ errorMsg["hoa_event_notices_fullstory"][0] }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </page-component>
</template>
<script setup>
// import RichTextEditor from "../../../../components/RichTextEditor.vue";
import store from "../../../../store";
import { useRouter, useRoute } from "vue-router";
import { watch, ref, computed } from "vue";

const router = useRouter();
const route = useRoute();
const data = ref({
  id: route.params.id,
  hoa_event_notices_fullstory: "",
});
const errorMsg = ref("");
store.dispatch("announcement/getAnnouncementFullStory", route.params.id);
const announcementLoading = computed(
  () => store.state.announcement.announcementFullStory.loading
);
watch(
  () => store.state.announcement.announcementFullStory.data,
  (newVal, oldVal) => {
    if (
      newVal.data.hoa_event_notices_fullstory === "" ||
      newVal.data.hoa_event_notices_fullstory === null
    ) {
    } else {
      data.value.hoa_event_notices_fullstory = content(
        newVal.data.hoa_event_notices_fullstory
      );
    }
  }
);

function content(value) {
  return JSON.parse(value);
}

async function handleSubmit() {
  data.value.hoa_event_notices_fullstory = JSON.stringify(
    data.value.hoa_event_notices_fullstory
  );
  const res = await store.dispatch("announcement/editAnnouncementFullStory", data.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("announcement/getAnnouncements");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The announcement data was successfully updated",
      });
      router.push({ name: "Announcement" });
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

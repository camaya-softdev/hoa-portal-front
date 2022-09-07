<template>
  <el-dialog
    v-model="editAnnouncement"
    title="Edit Event"
    width="50%"
    :before-close="handleClose"
    center
  >
    <div v-if="announcementLoading">Loading...</div>
    <form v-else>
      <div class="mb-4">
        <label
          for="hoa_event_notices_title"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Title <span class="text-red-300">*</span></label
        >
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa_event_notices_title"
          type="text"
          v-model="form.hoa_event_notices_title"
          :class="
            errorMsg['hoa_event_notices_title']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="Title"
        />
        <span
          v-if="errorMsg['hoa_event_notices_title']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_event_notices_title"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision-lot-house-number"
        >
          Image <span class="text-red-300">*</span>
        </label>
        <div class="mt-1 flex items-center">
          <img
            v-if="form.hoa_event_notices_photo"
            :src="form.hoa_event_notices_photo"
            :class="
              errorMsg['hoa_event_notices_photo']
                ? 'border-red-300'
                : 'border-gray-300'
            "
            class="w-64 h-48 object-cover"
          />
          <span
            v-else
            class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-[80%] w-[80%] text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <button
            type="button"
            class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <input
              type="file"
              @change="onImageChoose"
              class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
            />
            Change
          </button>
     
        </div>
              <div>
             <p class="text-gray-500 text-[10px]">The width should be 1200 px and height 675 px files with less than 2mb each </p>
          </div>
        <span
          v-if="errorMsg['hoa_event_notices_photo']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_event_notices_photo"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa_event_notices_desc"
        >
          Description <span class="text-red-300">*</span>
        </label>
        <textarea
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa_event_notices_desc"
          cols="5"
          rows="5"
          v-model="form.hoa_event_notices_desc"
          :class="
            errorMsg['hoa_event_notices_desc']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="Subdivision Lot Street Name"
        />
        <span
          v-if="errorMsg['hoa_event_notices_desc']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_event_notices_desc"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="subdivision"
        >
          Subdivision <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.subdivision_id"
          @change="updateDropdowns(index)"
          filterable
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="Subdivision Name"
        >
          <el-option
            v-for="item in subdivisionData.data"
            :key="item.id"
            :label="item.hoa_subd_name"
            :value="item.id"
          />
        </el-select>
        <span
          v-if="errorMsg['subdivision_id']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["subdivision_id"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa_event_notices_type"
        >
          Type <span class="text-red-300">*</span>
        </label>
        <select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa_event_notices_type"
          v-model="form.hoa_event_notices_type"
          :class="
            errorMsg['hoa_event_notices_type']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="Type"
        >
          <option value="Announcement">Announcement</option>
          <option value="News">News</option>
        </select>
        <span
          v-if="errorMsg['hoa_event_notices_type']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_event_notices_type"][0] }}
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
import { computed, ref, watch } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";

const fileList = ref([{ name: "", url: "" }]);
const props = defineProps<{
  editAnnouncement: Boolean;
  editId: Number;
  subdivisionData: Object;
}>();
const emits = defineEmits(["closeModal", "editId"]);

const form = ref({
  hoa_event_notices_title: "",
  hoa_event_notices_photo: "",
  hoa_event_notices_desc: "",
  subdivision_id: [],
  hoa_event_notices_type: "",
});

if (props.editId !== 0) {
  store.dispatch("announcement/getAnnouncement", props.editId);
}
const announcementLoading = computed(
  () => store.state.announcement.currentAnnouncement.loading
);
watch(
  () => store.state.announcement.currentAnnouncement.data,
  (newVal, oldVal) => {
    form.value = { ...JSON.parse(JSON.stringify(newVal.data)) };
    let subData = [];
    for (let i = 0; i <= newVal.data.subdivision.length - 1; i++) {
      subData.push(newVal.data.subdivision[i].id);
    }
    form.value.subdivision_id = subData;
  }
);
function closeModal() {
  emits("editId");
  emits("closeModal");
}
const errorMsg = ref("");

function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    // The field to send on backend and apply validations
    // form.value.hoa_event_notices_photo = reader.result;

    // The field to display here
    form.value.hoa_event_notices_photo = reader.result;
    ev.target.value = "";
  };
  reader.readAsDataURL(file);
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      closeModal();
      done();
    })
    .catch(() => {});
};

function updateDropdowns(index) {
  props.subdivisionData.data[index - 1];
}
async function handleSubmit() {
  const res = await store.dispatch("announcement/editAnnouncement", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("announcement/getAnnouncements");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The announcement data was successfully updated",
      });
      closeModal();
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
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

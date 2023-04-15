<template>
  <el-dialog
    v-model="editDirectors"
    title="Edit Board Of Directors"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <div v-if="directorLoading">Loading...</div>
    <form v-else>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="full_name">
          Full Name <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.user_id"
          filterable
          placeholder="Full Name"
        >
          <el-option
            v-for="item in showPerson"
            :key="item.id"
            :label="item.hoa_member_name"
            :value="item.user_id"
          />
        </el-select>
        <span
          v-if="errorMsg['user_id']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["user_id"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="hoa-access-type">
          HOA Access Type
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.hoa_access_type"
          filterable
          placeholder="HOA Access Type"
        >
          <el-option v-for="data in options" :label="data.label" :value="data.value" />
        </el-select>
        <span
          v-if="errorMsg['hoa_access_type']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_access_type"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="board-of-directors-description"
        >
          Description
        </label>
        <textarea
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="board-of-directors-description"
          type="text"
          rows="5"
          cols="5"
          v-model="form.hoa_bod_desc"
          :class="errorMsg['hoa_bod_desc'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Description"
        />
        <span
          v-if="errorMsg['hoa_bod_desc']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_bod_desc"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="board-of-directors-position"
        >
          Position <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="board-of-directors-position"
          type="text"
          v-model="form.hoa_bod_position"
          :class="errorMsg['hoa_bod_position'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="Position"
        />
        <span
          v-if="errorMsg['hoa_bod_position']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_bod_position"][0] }}
        </span>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Image <span class="text-red-300">*</span>
        </label>
        <div class="mt-1 flex items-center">
          <img
            v-if="form.image"
            :src="form.image"
            :class="errorMsg['image'] ? 'border-red-300' : 'border-gray-300'"
            :alt="form.fullName"
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
        <p class="text-gray-500 text-[10px]">
          The width should be 300 px and height 300 px files with less than 2mb each
        </p>
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
import { ref, computed, watch } from "vue";
import { ElMessageBox } from "element-plus";
import type { UploadFile } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { useRoute } from "vue-router";
import store from "../../../../../store";

const props = defineProps<{
  editDirectors: Boolean;
  showPerson: Object;
  editId: Number;
  options: Object;
}>();

const fileList = ref([{ name: "", url: "" }]);
const route = useRoute();
const emits = defineEmits(["closeModal", "editId"]);

const form = ref({
  user_id: "",
  subdivision_id: 0,
  hoa_bod_desc: "",
  hoa_bod_position: "",
  image_url: null,
  image: null,
  hoa_access_type: "",
});
let userData = ref({});
const errorMsg = ref("");
let search = ref("");

const directorLoading = computed(() => store.state.director.currentDirector.loading);
if (props.editId !== 0) {
  store.dispatch("director/getDirector", props.editId);
}

watch(
  () => store.state.director.currentDirector.data,
  (newVal, oldVal) => {
    userData.value = newVal.data;
    userData.value.hoa_member_name = newVal.data.fullName;
    form.value = { ...JSON.parse(JSON.stringify(newVal.data)) };
  }
);

function closeModal() {
  emits("editId");
  emits("closeModal");
}

const filteredPeople = computed(() =>
  search.value === ""
    ? props.showPerson
    : props.showPerson.filter((person) => {
        return person.hoa_member_name.toLowerCase().includes(search.value.toLowerCase());
      })
);

function onImageChoose(ev) {
  const file = ev.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    // The field to send on backend and apply validations
    form.value.image = reader.result;

    // The field to display here
    form.value.image_url = reader.result;
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

async function handleSubmit() {
  form.value.subdivision_id = route.params.id;
  const res = await store.dispatch("director/editDirector", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The board of director data was successfully updated",
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

<template>
  <el-dialog
    v-model="addBackground"
    title="Add Background Image"
    width="50%"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-background-name"
        >
          HOA Background Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-background-name"
          type="text"
          v-model="form.hoa_background_name"
          :class="errorMsg['hoa_bacground_name'] ? 'border-red-300' : 'border-gray-300'"
          placeholder="HOA Background Name"
        />
        <span
          v-if="errorMsg['hoa_autogate_background_name']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_autogate_background_name"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">
          HOA Background Image <span class="text-red-300">*</span>
        </label>

        <div class="mt-1 flex items-center">
          <img
            v-if="form.hoa_background_image"
            :src="form.hoa_background_image"
            :class="
              errorMsg['hoa_background_image'] ? 'border-red-300' : 'border-gray-300'
            "
            :alt="form.hoa_background_name"
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
          The width should be 1366 px and height 768 px files with less than 100 kb each
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
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";

const props = defineProps<{
  addBackground: Boolean;
}>();

const fileList = ref([{ name: "", url: "" }]);

const emits = defineEmits(["closeModal"]);

const form = ref({
  hoa_background_name: "",
  hoa_background_image: "",
});

const errorMsg = ref("");

function closeModal() {
  form.value.hoa_background_name = "";
  form.value.hoa_background_image = "";
  errorMsg.value = "";
  emits("closeModal");
}

function onImageChoose(ev) {
  const file = ev.target.files[0];
  const fsize = Math.round(file.size / 1024);
  if (fsize > 2048) {
    return store.commit("alert/notify", {
      title: "Error",
      type: "error",
      message:
        "The background image  should be atleast 2mb each. Please delete it Imediately or else it will not be saved!",
    });
  }
  const reader = new FileReader();
  reader.onload = () => {
    // The field to send on backend and apply validations
    form.value.hoa_background_image = reader.result;
    // The field to display here
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
  const res = await store.dispatch("background_image/addBackgroundImage", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("background_image/getBackgroundImages");
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The background image data was successfully created",
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
<style scoped></style>

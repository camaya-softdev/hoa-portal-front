<template>
  <el-dialog
    v-model="addTemplate"
    title="Add Autogate Template"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-autogate-template-name"
        >
          HOA Autogate Template Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-autogate-template-name"
          type="text"
          v-model="form.hoa_autogate_template_name"
          :class="
            errorMsg['hoa_autogate_template_name'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="HOA Autogate Template Name"
        />
        <span
          v-if="errorMsg['hoa_autogate_template_name']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_autogate_template_name"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">
          HOA Autogate Template Image <span class="text-red-300">*</span>
        </label>

        <div class="mt-1 flex items-center">
          <img
            v-if="form.image_url"
            :src="form.image_url"
            :class="
              errorMsg['hoa_autogate_template_picture']
                ? 'border-red-300'
                : 'border-gray-300'
            "
            :alt="form.hoa_autogate_template_name"
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
          The width should be 500 px and height 500 px files with less than 100 kb each
        </p>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-autogate-template-footer"
        >
          HOA Autogate Template Footer <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-autogate-template-footer"
          type="text"
          v-model="form.hoa_autogate_template_footer"
          :class="
            errorMsg['hoa_autogate_template_footer']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="HOA Autogate Template Footer"
        />
        <span
          v-if="errorMsg['hoa_autogate_template_footer']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_autogate_template_footer"][0] }}
        </span>
      </div>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-autogate-member-name"
        >
          Background Image Name <span class="text-red-300">*</span>
        </label>
        <el-select
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="background"
          filterable
          placeholder="HOA Autogate Member Name"
          :change="onChange(background)"
          remote
          :remote-method="searchBackgroundImage"
        >
          <el-option
            v-for="item in backgroundData"
            :key="item.id"
            :label="item.hoa_background_name"
            :value="item.id"
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
        <label
          for="hoa-autogate-template-second-page"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          HOA Autogate Template Second Page <span class="text-red-300">*</span>
        </label>

        <RichTextEditor
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-autogate-template-footer-second-page"
          v-model:content="form.hoa_autogate_template_second_page"
          placeholder="HOA Autogate Template Second Page"
        />
        <span
          v-if="errorMsg['hoa_autogate_template_second_page']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_autogate_template_second_page"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          for="hoa-autogate-template-footer-second-page"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          HOA Autogate Template Footer Second Page
          <span class="text-red-300">*</span>
        </label>

        <RichTextEditor
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-autogate-template-footer-second-page"
          v-model:content="form.hoa_autogate_template_footer_second_page"
          placeholder="HOA Autogate Template Footer Second Page"
        />
        <span
          v-if="errorMsg['hoa_autogate_template_footer_second_page']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_autogate_template_footer_second_page"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-autogate-template-third-page"
        >
          HOA Autogate Template Third Page <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-autogate-template-third-page"
          type="text"
          v-model="form.hoa_autogate_template_third_page"
          :class="
            errorMsg['hoa_autogate_template_third_page']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="HOA Autogate Template Third Page"
        />
        <span
          v-if="errorMsg['hoa_autogate_template_third_page']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_autogate_template_third_page"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-autogate-template-footer-third-page"
        >
          HOA Autogate Template Footer Third Page
          <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-autogate-template-footer-third-page"
          type="text"
          v-model="form.hoa_autogate_template_footer_third_page"
          :class="
            errorMsg['hoa_autogate_template_footer_third_page']
              ? 'border-red-300'
              : 'border-gray-300'
          "
          placeholder="HOA Autogate Template Footer Third Page"
        />
        <span
          v-if="errorMsg['hoa_autogate_template_footer_third_page']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_autogate_template_footer_third_page"][0] }}
        </span>
      </div>
    </form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit" :disabled="btnLoading" :loading="btnLoading">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import RichTextEditor from "../../../../../components/RichTextEditor.vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";

const props = defineProps<{
  addTemplate: Boolean;
  backgroundData: Object;
}>();

const fileList = ref([{ name: "", url: "" }]);
let btnLoading = ref(false);
const emits = defineEmits(["closeModal", "searchBackground"]);

const form = ref({
  hoa_autogate_template_name: "",
  hoa_autogate_template_picture: "",
  image_url: "",
  hoa_autogate_template_footer: "",
  hoa_autogate_template_second_page: "",
  hoa_autogate_template_third_page: "",
  hoa_autogate_template_footer_second_page: "",
  hoa_autogate_template_footer_third_page: "",
  background_image_id: "",
});

const errorMsg = ref("");

function searchBackgroundImage(background) {
  return emits("searchBackground", background);
}
let background = ref("");
let data = ref({});

function onChange(event) {
  if (event) {
    return (data.value = props.backgroundData.find(
      (background) => background.id === event
    ));
  }
}

function closeModal() {
  form.value.hoa_autogate_template_name = "";
  form.value.hoa_autogate_template_picture = "";
  form.value.image_url = "";
  background.value = "";
  form.value.background_image_id = "";
  form.value.hoa_autogate_template_footer = "";
  form.value.hoa_autogate_template_second_page = "";
  form.value.hoa_autogate_template_footer_second_page = "";
  form.value.hoa_autogate_template_third_page = "";
  form.value.hoa_autogate_template_footer_third_page = "";
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
    form.value.hoa_autogate_template_picture = reader.result;
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
  btnLoading.value = true;
  form.value.background_image_id = background.value;
  form.value.hoa_autogate_template_second_page = JSON.stringify(
    form.value.hoa_autogate_template_second_page
  );
  form.value.hoa_autogate_template_footer_second_page = JSON.stringify(
    form.value.hoa_autogate_template_footer_second_page
  );
  const res = await store.dispatch("template/addTemplate", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The autogate template data was successfully created",
      });
      closeModal();
    } else {
      errorMsg.value = res.response.data.errors;
    }
    btnLoading.value = false
  } catch (err) {
    await store.commit("alert/notify", {
      title: "Error",
      type: "danger",
      message: err,
    });
    btnLoading.value = false
  }
}
</script>
<style scoped></style>

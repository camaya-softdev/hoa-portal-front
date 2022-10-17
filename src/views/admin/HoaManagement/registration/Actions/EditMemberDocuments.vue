<template>
  <page-component
    navTitle="Member Management"
    navContent="Member Registration"
    navLink="MemberRegistration"
    navChildContent="Member Documents"
    :navName="documentEmail"
  >
    <template v-slot:content>
      <div
        v-if="documentLoading"
        v-loading.fullscreen.lock="documentLoading"
        element-loading-text="Fetching Data..."
      ></div>
      <div v-else class="flex justify-center items-center mb-4 pb-4">
        <form class="w-2/5" @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="hoa_document_name"
            >
              Document Name <span class="text-red-300">*</span>
            </label>
            <input
              v-model="form.hoa_document_name"
              :class="
                errorMsg['hoa_document_name'] ? 'border-red-300' : 'border-gray-300'
              "
              class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hoa_document_name"
              type="text"
              placeholder="Document Name"
            />
            <span
              v-if="errorMsg['hoa_document_name']"
              class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            >
              {{ errorMsg["hoa_document_name"][0] }}
            </span>
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="hoa_document_desc"
            >
              Document Description <span class="text-red-300">*</span>
            </label>
            <textarea
              v-model="form.hoa_document_desc"
              :class="
                errorMsg['hoa_document_desc'] ? 'border-red-300' : 'border-gray-300'
              "
              class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hoa_document_desc"
              type="text"
              rows="4"
              cols="4"
              placeholder="Document Description"
            />
            <span
              v-if="errorMsg['hoa_document_desc']"
              class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            >
              {{ errorMsg["hoa_document_desc"][0] }}
            </span>
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="hoa_document_tag"
            >
              Document Tag <span class="text-red-300">*</span>
            </label>
            <select
              v-model="form.hoa_document_tag"
              :class="errorMsg['hoa_document_tag'] ? 'border-red-300' : 'border-gray-300'"
              class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hoa_document_tag"
              placeholder="Document Tag"
            >
              <option value="SOA TEMPLATE">Soa Template</option>
              <option value="Valid ID">Valid ID</option>
              <option value="Receipt">Receipt</option>
              <option value="Deeds">Deeds</option>
              <option value="Others">Others</option>
            </select>
            <span
              v-if="errorMsg['hoa_document_tag']"
              class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            >
              {{ errorMsg["hoa_document_tag"][0] }}
            </span>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Document Path <span class="text-red-300">*</span>
            </label>
            <ul class="el-upload-list el-upload-list--picture-card">
              <li
                class="el-upload-list__item is-ready"
                v-for="image in attachments"
                :key="image.id"
                tabindex="image.id"
              >
                <img class="el-upload-list__item-thumbnail" :src="image.url" alt="" /><a
                  class="el-upload-list__item-name"
                  ><i class="el-icon el-icon--document"
                    ><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="currentColor"
                        d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z"
                      ></path></svg
                  ></i>
                  {{ image.url }}</a
                ><label class="el-upload-list__item-status-label"
                  ><i class="el-icon el-icon--upload-success el-icon--check"
                    ><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="currentColor"
                        d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
                      ></path></svg></i></label
                ><i class="el-icon el-icon--close"
                  ><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="currentColor"
                      d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                    ></path></svg></i
                ><!-- Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn--><!-- This is a bug which needs to be fixed --><!-- TODO: Fix the incorrect navigation interaction --><i
                  class="el-icon--close-tip"
                  >press delete to remove</i
                ><!--v-if--><span class="el-upload-list__item-actions"
                  ><span class="el-upload-list__item-preview"
                    ><i class="el-icon el-icon--zoom-in"
                      ><svg
                        @click="handlePreview(image.url)"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="currentColor"
                          d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zm-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96z"
                        ></path></svg></i></span
                  ><span
                    @click="handleRemove(image.id)"
                    class="el-upload-list__item-delete"
                    ><i class="el-icon el-icon--delete"
                      ><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill="currentColor"
                          d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                        ></path></svg></i></span
                ></span>
              </li>
            </ul>
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              action="https://jsonplaceholder.typicode.com/posts/"
              drag
              :class="
                errorMsg['hoa_document_path'] ? 'border-red-300' : 'border-gray-300'
              "
              :auto-upload="false"
              :on-change="updateImageList"
              accept=".jpg, .png, .jpeg, .pdf, .svg, .gif"
            >
              <el-icon class="el-icon--upload">
                <upload-filled />
              </el-icon>
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpeg,jpg,png,gif,svg/pdf files with a size less than 2mb
                </div>
              </template>
            </el-upload>
            <span
              v-if="errorMsg['filenames']"
              class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            >
              {{ errorMsg["filenames"][0] }}
            </span>
            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </div>
          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3"> </span>
              Save
            </button>
          </div>
        </form>
      </div>
      <hr />
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <router-link
          :to="{
            name: 'MemberDocuments',
            params: { id: route.params.userId, email: documentEmail },
          }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
</template>
<script setup>
import PageComponent from "../../../../../components/PageComponent.vue";
import { ref, watch, computed } from "vue";
import store from "../../../../../store";
import { useRoute, useRouter } from "vue-router";

import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const errorMsg = ref("");
const route = useRoute();
const router = useRouter();
const documentEmail = route.params.documentEmail;
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

let attachments = ref([]);

if (route.params.documentId !== 0) {
  store.dispatch("document/getDocument", route.params.documentId);
}

const documentLoading = computed(() => store.state.document.currentDocument.loading);
const form = ref({
  user_id: "",
  hoa_document_name: "",
  hoa_document_desc: "",
  filenames: [],
  hoa_document_tag: "",
});
watch(
  () => store.state.document.currentDocument.data,
  (newVal, oldVal) => {
    form.value = { ...JSON.parse(JSON.stringify(newVal.data)) };
    form.value.filenames = [];
    let arr = [...JSON.parse(JSON.stringify(form.value.files))];
    attachments.value = arr;
    console.log(attachments.value);
  }
);

const updateImageList = (file) => {
  if (file.size > 2) {
    return store.commit("alert/notify", {
      title: "Error",
      type: "error",
      message:
        "The user documents files should be atleast 2mb each. Please delete it Imediately or else it will not be saved!",
    });
  }
  const rawFile = file.raw;
  const reader = new FileReader();
  reader.onload = () => {
    form.value.filenames.push(reader.result);
    console.log(form.value.filenames);
  };
  reader.readAsDataURL(rawFile);
};

async function handleRemove(id) {
  if (confirm(`Are you sure you want to delete this files? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("document/deleteFile", id);
      if (res.status === 204 || res.status === 200) {
        await store.dispatch("document/getDocument", route.params.documentId);
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The file was successfully deleted",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}

const handlePreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile;
  dialogVisible.value = true;
};

async function handleSubmit() {
  try {
    form.value.user_id = route.params.userId;
    const res = await store.dispatch("document/editDocument", form.value);
    if (res.status === 200 || res.status === 201) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The user documents was successfully updated",
      });
      await router.push({
        name: "MemberDocuments",
        params: { id: route.params.userId, email: documentEmail },
      });
    } else {
      if (res.response.data.errors) {
        errorMsg.value = res.response.data.errors;
      }
      await store.commit("alert/notify", {
        title: "Error",
        type: "error",
        message: "The user documents files should be atleast 2mb each",
      });
    }
  } catch (err) {
    throw err;
  }
}
</script>

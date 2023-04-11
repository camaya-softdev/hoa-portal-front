<template>
  <page-component
    navTitle="Member Management"
    navContent="Member Registration"
    navLink="MemberRegistration"
    navChildContent="Member Documents"
    :navName="documentEmail"
  >
    <template v-slot:content>
      <div class="flex justify-center items-center mb-4 pb-4">
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
            <el-upload
              class="upload-demo"
              drag
              :class="
                errorMsg['hoa_document_path'] ? 'border-red-300' : 'border-gray-300'
              "
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              :on-change="updateImageList"
              accept=".jpg, .png, .jpeg, .pdf, .svg, .gif"
              multiple
            >
              <el-icon class="el-icon--upload">
                <upload-filled />
              </el-icon>
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpeg,jpg,png,gif,svg/pdf files with a size less than 2mb each
                </div>
              </template>
            </el-upload>
            <span
              v-if="errorMsg['filenames']"
              class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
            >
              {{ errorMsg["filenames"][0] }}
            </span>
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
            params: { id: route.params.userId, documentEmail: documentEmail },
          }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
</template>
<script lang="ts" setup>
import PageComponent from "../../../../../components/PageComponent.vue";
import { ref } from "vue";
import store from "../../../../../store";
import { useRoute, useRouter } from "vue-router";

import { UploadFilled } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";

const form = ref({
  user_id: "",
  hoa_document_name: "",
  hoa_document_desc: "",
  filenames: [],
  hoa_document_tag: "",
});

const errorMsg = ref("");
const route = useRoute();
const router = useRouter();
const documentEmail = route.params.documentEmail;
const updateImageList = (file) => {
  const fileMb = file.size / 1024 ** 2;
  if (fileMb >  2) {
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
  };
  console.log(form.value.filenames);
  reader.readAsDataURL(rawFile);
};

async function handleSubmit() {
  try {
    form.value.user_id = route.params.userId;
    const res = await store.dispatch("document/addDocument", form.value);
    if (res.status === 200 || res.status === 201) {
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The user documents was successfully created",
      });
      await router.push({
        name: "MemberDocuments",
        params: { id: route.params.userId, documentEmail: documentEmail },
      });
    } else if (res.status === 413) {
      await store.commit("alert/notify", {
        title: "Error",
        type: "error",
        message: "The user documents files should be atleast 2mb each",
      });
    } else {
      errorMsg.value = res.response.data.errors;
    }
  } catch (err) {
    throw err;
  }
}
</script>

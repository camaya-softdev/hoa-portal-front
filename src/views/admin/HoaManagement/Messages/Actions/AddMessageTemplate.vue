<template>
  <el-dialog
    v-model="addMessage"
    title="Add Email Template"
    width="50%"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="hoa-comm-template-name"
        >
          HOA Email Template Name <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-comm-template-name"
          type="text"
          v-model="form.hoa_comm_template_name"
          :class="
            errorMsg['hoa_comm_template_name'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder="HOA Email Template Name"
        />
        <span
          v-if="errorMsg['hoa_comm_template_name']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_comm_template_name"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          for="hoa-comm-template-title"
          class="block text-gray-700 text-sm font-bold mb-2">
          HOA Email Template Title <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-comm-template-title"
          type="text"
          v-model="form.hoa_comm_template_title"

          :class="
            errorMsg['hoa_comm_template_title'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder=" HOA Email Template Title"
        />
        <span
          v-if="errorMsg['hoa_comm_template_title']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_comm_template_title"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          for="hoa-comm-template-subject"
          class="block text-gray-700 text-sm font-bold mb-2">
          HOA Email Template Subject <span class="text-red-300">*</span>
        </label>
        <input
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-comm-template-subject"
          type="text"
          v-model="form.hoa_comm_template_subject"

          :class="
            errorMsg['hoa_comm_template_subject'] ? 'border-red-300' : 'border-gray-300'
          "
          placeholder=" HOA Email Template Subject"
        />
        <span
          v-if="errorMsg['hoa_comm_template_subject']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_comm_template_subject"][0] }}
        </span>
      </div>
      <div class="mb-4">
        <label
          for="hoa-comm-template-message"
          class="block text-gray-700 text-sm font-bold mb-2">
          HOA Email Template Message <span class="text-red-300">*</span>
        </label>

        <textarea
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-comm-template-message"
          cols="5"
          rows="5"
          v-model="form.hoa_comm_template_message"
          placeholder="HOA Email Template Message"
        ></textarea>
        <span
          v-if="errorMsg['hoa_comm_template_message']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_comm_template_message"][0] }}
        </span>
      </div>
    </form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref, reactive } from "vue";
  
  import { ElMessageBox } from "element-plus";
  import store from "../../../../../store";

  const props = defineProps<{
    addMessage: Boolean;
  }>();

  const fileList = ref([{ name: "", url: "" }]);

  const emits = defineEmits(["closeModal"]);

  const form = ref({
    hoa_comm_template_name: "",
    hoa_comm_template_title: "",
    hoa_comm_template_message:'',
    hoa_comm_template_subject:''
  });

  const errorMsg = ref('')
  function closeModal() {
    form.value.hoa_comm_template_name = ''
    form.value.hoa_comm_template_title = ''
    form.value.hoa_comm_template_message = ''
    form.value.hoa_comm_template_subject = ''
    errorMsg.value = ''
    emits('closeModal');
  }

  const handleClose = (done: () => void) => {
    ElMessageBox.confirm("Are you sure to close this dialog?")
      .then(() => {
        closeModal()
        done();
      })
      .catch(() => {});
  };

  async function handleSubmit() { 
    const res = await store.dispatch("communication/addCommunication", form.value);
    try {
      if (res.status === 200 || res.status === 201) {
        await store.dispatch("communication/getCommunications");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The email template data was successfully created",
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

</style>

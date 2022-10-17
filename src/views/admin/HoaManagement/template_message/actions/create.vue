<template>
  <el-dialog
    v-model="addMessage"
    title="Add Autogate Template Message"
    width="50%"
    custom-class="border-2 border-gray-600"
    :before-close="handleClose"
    center
  >
    <form>
      <div class="mb-4">
        <label
          for="hoa-autogate-template-message"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          HOA Autogate Template Message
        </label>

        <RichTextEditor
          class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoa-autogate-template-message"
          v-model:content="form.hoa_autogate_template_message"
          placeholder="HOA Autogate Template Message"
        />
        <span
          v-if="errorMsg['hoa_autogate_template_message']"
          class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
        >
          {{ errorMsg["hoa_autogate_template_message"][0] }}
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
import { ref, reactive } from "vue";
import RichTextEditor from "../../../../../components/RichTextEditor.vue";
import { ElMessageBox } from "element-plus";
import store from "../../../../../store";
import { useRoute } from "vue-router";

const props = defineProps<{
  addMessage: Boolean;
}>();

const emits = defineEmits(["closeModal"]);
const route = useRoute();
const form = ref({
  hoa_autogate_template_message: "",
  template_id: 0,
});

const errorMsg = ref("");
function closeModal() {
  form.value.hoa_autogate_template_message = JSON.stringify(
    (form.value.hoa_autogate_template_message = "")
  );
  errorMsg.value = "";
  emits("closeModal");
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
  form.value.hoa_autogate_template_message = JSON.stringify(
    form.value.hoa_autogate_template_message
  );
  form.value.template_id = parseInt(<string>route.params.id);
  const res = await store.dispatch("temp_msg/addMessage", form.value);
  try {
    if (res.status === 200 || res.status === 201) {
      await store.dispatch("temp_msg/getMessages", route.params.id);
      await store.commit("alert/notify", {
        title: "Success",
        type: "success",
        message: "The autogate template message data was successfully created",
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

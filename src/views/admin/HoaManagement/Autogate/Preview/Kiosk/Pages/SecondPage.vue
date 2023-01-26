<template>
  <el-dialog
    v-model="secondPreviewTemplate"
    title="Second Page"
    width="100%"
    :fullscreen="true"
    custom-class="border-2 border-gray-600 bg-black"
    :before-close="handleClose"
    center
  >
  <div v-if="secondPageLoading">
    <p>Data is Loading....</p>
  </div>
    <Kiosk v-else #preview :background-image="backgroundImage" :logo="logo">
      <div class="mb2">
        <RichTextEditor
          theme="bubble"
          :content="content(secondPage)"
        ></RichTextEditor>
      </div>
      <div class="mb-2">
        <RichTextEditor
        theme="bubble"
        :content="content(footerSecondPage)"
      ></RichTextEditor>
      </div>
    </Kiosk>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal">Close</el-button>
        <el-button type="primary" @click="thirdPage">Next Page</el-button>
      </span>
    </template>
  </el-dialog>
  <ThirdPage
    :third-preview-template="thirdPreviewTemplate"
    :thirdPages = "thirdPages"
    :footerThirdPage="footerThirdPage"
    :backgroundImage="backgroundImage"
    :logo="logo"
    @reset="reset"
    @close-modal="thirdPreviewTemplate = false"
  ></ThirdPage>
</template>
<script lang="ts" setup>
import Kiosk from "../../Kiosk.vue";
import RichTextEditor from "../../../../../../../components/RichTextEditor.vue";
import { ElMessageBox } from "element-plus";
import ThirdPage from "./ThirdPage.vue";
import { ref, watchEffect } from "vue";
import reset from "../../../../../../../store/modules/member/reset";

let thirdPreviewTemplate = ref(false);
let secondPageLoading = ref(true);
const props = defineProps<{
  secondPage: String;
  resetID:Function;
  footerSecondPage: String;
  thirdPages:String;
  footerThirdPage:String;
  backgroundImage:String;
  logo:String;
  secondPreviewTemplate: Boolean;
}>();
const emits = defineEmits(["closeModal","resetID"]);

function thirdPage() {
  thirdPreviewTemplate.value = true;
  emits("closeModal");
}

function reset(){
  emits("resetID")
}
function content(value) {
  //   let balance = value
  //     .replace("[balance]", value.balance)
  //     .replace("[fullname]", value.fullName)
  //     .replace("[duedate]", value.duedate)
  //     .replace("[load]", value.privilegeLoad)
  //     .replace("[subdivision]", value.subdivision)
  //     .replace("[address]", value.address);
  return JSON.parse(value);
}

watchEffect((onInvalidate) => {
  if (props.secondPage || props.footerSecondPage) {
    const timerLoading = setTimeout(
      () => (secondPageLoading.value = false),
      1000
    );
    onInvalidate(()=>{
        clearInterval(timerLoading);
    })
  }
});

function closeModal() {
  emits("closeModal");
  reset();
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      closeModal();
      done();
    })
    .catch(() => {});
};
</script>

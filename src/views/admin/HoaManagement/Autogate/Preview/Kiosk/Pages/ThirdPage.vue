<template>
  <el-dialog
    v-model="thirdPreviewTemplate"
    title="Third Page"
    width="100%"
    :fullscreen="true"
    custom-class="border-2 border-gray-600 bg-black"
    :before-close="handleClose"
    center
  >

    <Kiosk #preview :background-image="backgroundImage" :logo="logo">
        <p class="text-9xl mb-5 text-white">{{thirdPages}}</p>
        <p class="text-7xl text-white">
          {{footerThirdPage}}
        </p>
    </Kiosk>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal">Close</el-button>
        <!-- <el-button type="primary" @click="secondPage">Next Page</el-button> -->
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import Kiosk from "../../Kiosk.vue";
import { ElMessageBox } from "element-plus";
// import {ref,watchEffect} from "vue";

// let thirdPageLoading = ref(true);
const props = defineProps<{
  thirdPages: String;
  backgroundImage:String;
  footerThirdPage: String;
  logo:String;
  resetID:Function;
  thirdPreviewTemplate: Boolean;
}>();
const emits = defineEmits(["closeModal","reset"]);
function closeModal() {
  emits("closeModal");
  emits("reset")
}
// watchEffect((onInvalidate) => {
//   if (props.thirdPage || props.footerThirdPage) {
//     const timerLoading = setTimeout(
//       () => (thirdPageLoading.value = false),
//       1000
//     );
//     onInvalidate(()=>{
//         clearInterval(timerLoading);
//     })
//   }
// });
function content(value) {
  return JSON.parse(value);
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

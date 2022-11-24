<template>
  <el-dialog
    v-model="showPreviewTemplate"
    title="Welcome Page"
    width="100%"
    :fullscreen="true"
    custom-class="border-2 border-gray-600 bg-black"
    :before-close="handleClose"
    center
  >
    <div v-if="templateLoading">
      <p>Data is Loading.....</p>
    </div>
    <Kiosk v-else #preview :background-image="templateData.hoa_background_image" :logo="templateData.logo">
      <p className="text-white">
        <span className="text-9xl md:text-7xl sm:text-5xl ">WELCOME </span
        ><span className="text-9xl  md:text-7xl sm:text-5xl ">
          {{templateData.fullName.toUpperCase()}}
          <!-- {scanHoaData.users.autogate.hoa_autogate_member_name.toUpperCase()} --> </span
        >,
      </p>
      <p className="text-white">
        <span className="text-5xl md:text-5xl sm:text-3xl ">OF </span
        ><span className="text-5xl md:text-5xl sm:text-3xl">
          {{templateData.subdivision.toUpperCase()}} SUBDIVISION!
          <!-- {scanHoaData.users.autogate.hoa_autogate_subdivision_name.toUpperCase()} SUBDIVISION! -->
        </span>
      </p>
      <p className="text-3xl md:text-3xl sm:text-3xl text-black">
        Wait Lang Po
        <!-- {scanHoaData.users.autogate.template.hoa_autogate_template_footer} -->
      </p>
    </Kiosk>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal">Close</el-button>
        <el-button type="primary" @click="secondPage">Next Page</el-button>
      </span>
    </template>
  </el-dialog>
  <SecondPage
    :second-preview-template="secondPreviewTemplate"
    :secondPage ="templateData.hoa_autogate_template_second_page"
    :footerSecondPage = "templateData.hoa_autogate_template_footer_second_page"
    :thirdPages = "templateData.hoa_autogate_template_third_page"
    :footerThirdPage = "templateData.hoa_autogate_template_footer_third_page"
    :backgroundImage = "templateData.hoa_background_image"
    :logo="templateData.logo"
    :reset-id="resetID"
    @close-modal="secondPreviewTemplate = false"
  ></SecondPage>
</template>
<script lang="ts" setup>
import Kiosk from "../Kiosk.vue";
import { ref, watch, computed } from "vue";
import { ElMessageBox } from "element-plus";
import SecondPage from "./Pages/SecondPage.vue";
import store from "../../../../../../store";

let secondPreviewTemplate = ref(false);

const props = defineProps<{
  showPreviewId: Number;
  showPreviewTemplate: Boolean;
}>();
const emits = defineEmits(["closeModal", "showPreviewId"]);

if (props.showPreviewId !== 0) {
  store.dispatch(
    "autogateTemplatePreview/getAutogateTemplate",
    props.showPreviewId
  );
}
let templateLoading = computed(
  () => store.state.autogateTemplatePreview.currentAutogateTemplate.loading
);

let templateData = computed(()=>store.state.autogateTemplatePreview.currentAutogateTemplate.data);


function secondPage() {
  secondPreviewTemplate.value = true;
  emits("closeModal");
 
}

function resetID(){
    emits('showPreviewId');
}

function closeModal() {
  resetID();
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
</script>
<style></style>

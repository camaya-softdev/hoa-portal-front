<template>
  <el-dialog
    v-model="newsDialog"
    title="LATEST NEWS"
    width="80%" 
  >
  <!-- :before-close="handleClose" -->

    <div v-if="newsLoading">Loading...</div>
    <div v-else class="bg-white">
      <div>
        <h2 class="text-2xl text-center font-bold tracking-tight text-gray-900">{{newsData.title}}</h2>

        <div class="mt-6 content-center">
          <!-- <div class="w-full min-h-80 bg-gray-200 aspect-w-2 aspect-h-2 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img :src="newsData.photo" :alt="newsData.title" class="w-full h-full object-center object-cover lg:w-full lg:h-full"/>
          </div> -->

          <div class="flex justify-center" style="width: 100%;">
              <img :src="newsData.photo" :alt="newsData.title" class="w-full aspect-w-2 aspect-h-2">
            </div>

          <div class="mt-6 flex justify-center">
              <div>
                <h3 class="text-2xl font-semibold text-center text-gray-700">
                  <span aria-hidden="true" class="absolute inset-0"></span>{{newsData.desc}}
                </h3>
                <RichTextEditor
                  class="mt-12 text-sm text-gray-600"
                  id="hoa-autogate-template-message"
                  theme="bubble"
                  :content="content(newsData.story)"
                  :readOnly="true"
                />
              </div>
            </div>
        </div>

      </div>
    </div>

    <!--    <template #footer>-->
    <!--      <span class="dialog-footer">-->
    <!--        <el-button @click="closeDialog">Close</el-button>-->
    <!--      </span>-->
    <!--    </template>-->

  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessageBox } from "element-plus";
import store from "../../../../store";
import { computed } from "vue";
import RichTextEditor from "../../../../components/RichTextEditor.vue";

const props = defineProps<{
  newsDialog: Boolean;
  newsId: Number;
}>();
const emits = defineEmits(["closeModal", "newsId"]);

function closeDialog() {
  emits("newsId");
  emits("closeModal");
}
if (props.newsId !== 0) {
  store.dispatch("showNews/getNews", props.newsId);
}
const newsData = computed(() => store.state.showNews.currentNews.data);
const newsLoading = computed(() => store.state.showNews.currentNews.loading);

function content(value) {
  return JSON.parse(value);
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      closeDialog();
      done();
    })
    .catch(() => {});
};
</script>

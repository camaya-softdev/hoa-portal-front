<template>
  <el-dialog
    v-model="eventDialog"
    title="ANNOUNCEMENTS"
    width="80%"
    :before-close="handleClose"
  >
  <!-- :before-close="handleClose" -->

    <div v-if="eventLoading">Loading...</div>
    <div v-else class="">
      <div>
        <h2 class="text-2xl text-center font-bold tracking-tight text-gray-900">{{eventData.title}}</h2>

        <div class="mt-6">
            <!-- <div class="w-full min-h-80 bg-gray-400 aspect-w-2 aspect-h-2 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img :src="eventData.photo" :alt="eventData.title" class="w-full h-full object-center object-cover lg:w-full lg:h-full">
            </div> -->

            <!-- desktop view -->
            <div class="hidden md:block flex justify-center justify-items-center">
              <img :src="eventData.photo" :alt="eventData.title" class="w-full aspect-w-2 aspect-h-2">
              <h3 class="mt-6 mb-6 text-2xl font-semibold text-center text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>{{eventData.desc}}
              </h3>

              <RichTextEditor
                class="text-sm text-gray-600"
                id="hoa-autogate-template-message"
                theme="bubble"
                :content="content(eventData.story)"
                :readOnly="true"
              />
            </div>

            <!-- mobile view -->
            <div class="md:hidden">
              <img :src="eventData.photo" :alt="eventData.title" class="w-full aspect-w-2 aspect-h-2">
            </div>

            <div class="mt-6 md:hidden">
              <div>
                <p class="mb-6 text-lg font-semibold text-center text-gray-700">
                  <span aria-hidden="true" class="absolute inset-0"></span>{{eventData.desc}}
                </p>
                <RichTextEditor
                  class="text-xs text-gray-600"
                  id="hoa-autogate-template-message"
                  theme="bubble"
                  :content="content(eventData.story)"
                  :readOnly="true"
                />
              </div>
            </div>
            
          </div>

          <button class="mt-6 rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-yellow-600 text-white hover:bg-yellow-600 hover:text-white active:bg-yellow-600 active:text-slate-300 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105" 
          @click="closeDialog">
            <span>Close</span>
          </button>

        </div>
      </div>

   <!-- <template #footer>
     <span class="dialog-footer">
       <el-button @click="closeDialog">Close</el-button>
     </span>
   </template> -->

  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessageBox } from "element-plus";
  import store from "../../../../store";
  import {computed} from "vue"
  import RichTextEditor from "../../../../components/RichTextEditor.vue";

  const props = defineProps<{
    eventDialog: Boolean;
    eventId:Number;
  }>();
  const emits = defineEmits(["closeModal",'eventId']);



  function closeDialog(){
    emits('eventId')
    emits('closeModal')
  }

  function content(value) {
  return JSON.parse(value);
  }

  if(props.eventId !== 0){

    store.dispatch('showEvent/getEvents',props.eventId);
  }

  const eventData = computed(()=>store.state.showEvent.currentEvent.data)
  const eventLoading = computed(()=>store.state.showEvent.currentEvent.loading)

  const handleClose = (done: () => void) => {
    ElMessageBox.confirm("Are you sure to close this dialog?")
      .then(() => {
        closeDialog()
        done();
      })
      .catch(() => {});
  };

</script>

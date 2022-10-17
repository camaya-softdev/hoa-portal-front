<template>
  <el-dialog
    v-model="eventDialog"
    title="Event/Announcements"
    width="80%"
    :before-close="handleClose"
    center
  >
    <div v-if="eventLoading">Loading...</div>
    <div v-else class="bg-white">
      <div>
        <h2 class="text-2xl text-center font-extrabold tracking-tight text-gray-900">{{eventData.title}}</h2>

        <div class="mt-6 content-center">
            <div class="w-full min-h-80 bg-gray-200 aspect-w-2 aspect-h-2 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img :src="eventData.photo" :alt="eventData.title" class="w-full h-full object-center object-cover lg:w-full lg:h-full">
            </div>
            <div class="mt-4 flex justify-center">
              <div>
                <h3 class="text-2xl font-semibold text-center text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                  {{eventData.desc}}
                </h3>
                <RichTextEditor
                class="mt-1 text-sm text-gray-500"
                id="hoa-autogate-template-message"
                theme="bubble"
                :content="content(eventData.story)"
                :readOnly="true"
              />
                <!-- <p class="mt-1 text-sm text-gray-500">
                  {{eventData.story}}
                </p> -->
              </div>
            </div>
          </div>

          <!-- More products... -->
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
  import {computed} from "vue"
  import RichTextEditor from "../../../../components/RichTextEditor.vue";

  const props = defineProps<{
    eventDialog: Boolean;
    eventId:Number;
  }>();
  const emits = defineEmits(["closeModal",'eventId']);

  console.log(props.eventId)

  function closeDialog(){
    emits('eventId')
    emits('closeModal')
  }

  function content(value) {
  return JSON.parse(value);
  }

  if(props.eventId !== 0){
    console.log(props.eventId)
    store.dispatch('showEvent/getEvents',props.eventId);
  }
  console.log(props.eventId)
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

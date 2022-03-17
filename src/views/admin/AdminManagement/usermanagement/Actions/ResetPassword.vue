<template>
  <el-dialog
    v-model="resetDialog"
    title="Reset Password"
    width="30%"
    :before-close="handleClose"
  >
    <span v-if="rand !==''">{{rand}}</span>
    <el-button v-else type="info" class="flex justify-center" @click="random(8)">Generate Password</el-button>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModals">Cancel</el-button>
        <el-button type="primary" @click="closeModals"
          >Save</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const props = defineProps({
  resetDialog:Boolean
})
const emits = defineEmits(["closeModal"]);

const rand = ref('');
const closeModals = () =>{
  emits('closeModal')
  return rand.value = ''
}
const random = (length = 8) => {
    return rand.value = Math.random().toString(16).substr(2, length);
};
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      emits('closeModal')
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

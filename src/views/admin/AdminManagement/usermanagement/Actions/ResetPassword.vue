<template>
  <el-dialog
    v-model="resetDialog"
    title="Reset Password"
    width="30%"
    :before-close="handleClose"
  >
    <span v-if="form.password !==''">New password is <strong>{{form.password}}</strong> <br />
      Please coordinate accordingly</span>
    <el-button v-else type="info" class="flex justify-center" @click="random(8)">Generate Password</el-button>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModals">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit"
          >Save</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import store from "../../../../../store";

const props = defineProps({
  resetDialog:Boolean,
  changePasswordId:Number
})
const emits = defineEmits(["closeModal","changePasswordId"]);

const form = ref({
  id:props.changePasswordId,
  password:''
})

console.log(props.changePasswordId)
const closeModals = () =>{
  emits('closeModal')
  emits('changePasswordId')
  form.value.password = ''
  form.value.id = ''
}
const random = (length = 8) => {
    return form.value.password = Math.random().toString(16).substr(2, length);
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

async function handleSubmit(){
  const res = await store.dispatch('generate_new_password/generateNewPassword',form.value)
   try {
      if (res.status === 200 || res.status === 201) {
        await store.dispatch("user/getUsers");
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "the user password was successfully updated",
        });
        closeModals();
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
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

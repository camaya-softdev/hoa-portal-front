<template>
  <page-component
    navTitle="Member Management"
    navContent="Autogate Template"
    navLink="AutogateTemplate"
    navChildContent="Autogate Template Message">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addMessage = true"
      >Add Autogate Template Message</el-button
      >
    </template>
    <template v-slot:content>
      <div
        v-if="templateLoading"
        v-loading.fullscreen.lock="templateLoading"
        element-loading-text="Fetching Data..."
      ></div>
      <el-table
        v-else
        align="center"
        header-align="center"
        :data="filterTableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" prop="id"></el-table-column>
        <el-table-column sortable label="Template Message" width="300">
          <template #default="scope">
            <div>
              <RichTextEditor
                class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="hoa-autogate-template-message"
                theme="bubble"
                :content="content(scope.row.hoa_autogate_template_message)"
                :readOnly="true"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column align="right" width="180" fixed="right">
          <template #header>
            <el-input
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover
              placement="top-start"
              title="Action"
              :width="180"
              trigger="hover"
            >
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Edit Autogate Template Message" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editModal(scope.row)"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                content="Delete Autogate Template Message"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteMessage(scope.row)"
                ></el-button
                ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <router-link
          :to="{ name: 'AutogateTemplate' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
  <create :add-message="addMessage" @closeModal="addMessage = false"></create>
  <edit
    v-if="editId!== 0"
    :edit-message="editMessage"
    :edit-id="editId"
    @editId="editId = 0"
    @closeModal="editMessage = false"></edit>
</template>
<script setup>
  import { ref,computed } from "vue";
  import PageComponent from "../../../../components/PageComponent.vue";
  import Pagination from "../../../../components/Pagination.vue";
  import RichTextEditor from "../../../../components/RichTextEditor.vue";
  import {Edit,Delete} from "@element-plus/icons-vue";
  import create from "./Actions/create.vue"
  import edit from "./Actions/edit.vue"
  import store from "../../../../store";
  import _ from "lodash";
  import { useRouter,useRoute } from "vue-router";

  const router = useRouter();
  const route = useRoute()
  let addMessage = ref(false);
  let editMessage = ref(false);
  let editId = ref(0)
  store.dispatch('temp_msg/getMessages',route.params.id);

  let tableData = computed(()=>store.state.temp_msg.message);
  let templateLoading = computed(()=>store.state.temp_msg.message.loading);
  const filterTableData = computed(() => tableData.value.data);

  function content(value){
    return JSON.parse(value)
  }

  function editModal(row){
    console.log(row.id)
    editId.value = row.id;
    editMessage.value = true;
  }

  async function deleteMessage(row) {
    if (
      confirm(`Are you sure you want to delete this data? Operation can't be undone`)
    ) {
      try {
        const res = await store.dispatch("temp_msg/deleteMessage", row.id);
        if (res.status === 204 || res.status === 200) {
          await store.dispatch("temp_msg/getMessages",route.params.id);
          await store.commit("alert/notify", {
            title: "Success",
            type: "success",
            message: "The autogate template message data was successfully deleted",
          });
        }
      } catch (err) {
        throw err;
      }
    }
  }
</script>

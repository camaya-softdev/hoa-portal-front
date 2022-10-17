<template>
  <page-component
    navTitle="Member Management"
    navContent="Member Registration"
    navLink="MemberRegistration"
    navChildContent="Member Documents"
    :navName="documentEmail"
  >
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addMemberDocuments"
      >
        Add Documents
      </button>
    </template>
    <template v-slot:content>
      <div
        v-if="lotLoading"
        v-loading.fullscreen.lock="lotLoading"
        element-loading-text="Fetching Data..."
      ></div>
      <el-table
        v-else
        align="center"
        header-align="center"
        :data="filterTableData"
        style="width: 100%; overflow-x: auto"
        :flexible="true"
        table-layout="auto"
      >
        <el-table-column type="index" prop="id" width="50"></el-table-column>
        <el-table-column
          sortable
          label="Document Name"
          prop="hoa_document_name"
        ></el-table-column>
        <el-table-column
          sortable
          label="Document Description"
          prop="hoa_document_desc"
        ></el-table-column>
        <el-table-column sortable label="Document Tag">
          <template #default="scope">
            <el-tag disable-transitions>{{ scope.row.hoa_document_tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable label="Uploaded At" prop="created_at"></el-table-column>
        <el-table-column align="right" x fixed="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-popover placement="top-start" title="Action" :width="180" trigger="hover">
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Edit Member Address" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editModal(scope.row)"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                content="Delete Member Address"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteDocument(scope.row)"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6 opacity-80">
        <router-link
          :to="{ name: 'MemberRegistration' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </router-link>
      </div>
    </template>
  </page-component>
</template>
<script setup>
import { ref, computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import store from "../../../../store";
import _ from "lodash";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const documentEmail = route.params.email;

store.dispatch("document/getDocuments", route.params.id);

const tableData = computed(() => store.state.document.document);
const lotLoading = computed(() => store.state.document.document.loading);

const search = ref("");
const fullName = "";
const filterTableData = computed(() =>
  tableData.value.data.filter(
    (data) =>
      !search.value ||
      data.hoa_subd_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

function editModal(row) {
  router.push({
    name: "EditMemberDocuments",
    params: { userId: route.params.id, documentId: row.id },
  });
}

function addMemberDocuments() {
  router.push({
    name: "AddMemberDocuments",
    params: { userId: route.params.id, documentEmail: documentEmail },
  });
}

async function deleteDocument(row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("document/deleteDocument", row.id);
      if (res.status === 204 || res.status === 200) {
        await store.dispatch("document/getDocuments", route.params.id);
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The document data was successfully deleted",
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
function disableSubdivision(survey) {
  if (confirm(`Are you sure you want to disable this data?`)) {
  }
}
</script>
<style>
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>

<template>
  <page-component
    navTitle="Member Management"
    navContent="Member Registration"
    navLink="MemberRegistration"
    navChildContent="Member Designees"
    :navName="designeeEmail"
  >
    <template v-slot:buttons>
      <button
        class="text-blue-600 px-4 rounded-md ml-10 hover:bg-[#FFFFC2] hover:text-blue-900"
        @click="addDesignee = true"
      >
        Add Designees
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
          label="Full Name"
          prop="hoa_member_designee_name"
        ></el-table-column>
        <el-table-column
          sortable
          label="Relation"
          prop="hoa_member_designee_relation"
        ></el-table-column>
        <el-table-column
        sortable
        label="Birthday"
        prop="hoa_member_bday"
      ></el-table-column>
        <el-table-column sortable label="Date Added" prop="created_at"></el-table-column>
        <el-table-column align="right" x fixed="right">
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
                  @click="deleteDesignee(scope.row)"
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
  <add-member-designee
  :add-designee="addDesignee"
  @closeModal="addDesignee = false"
></add-member-designee>
<edit-member-designee
  v-if="editId !== 0"
  :edit-designee="editDesignee"
  :edit-id="editId"
  @closeModal="editDesignee = false"
  @editId="editId = 0"
></edit-member-designee>

</template>
<script setup>
import { ref, computed } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import store from "../../../../store";
import AddMemberDesignee from "./Actions/AddMemberDesignee.vue"
import EditMemberDesignee from "./Actions/EditMemberDesignee.vue"
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const designeeEmail = route.params.email;
let editDesignee = ref(false);
let addDesignee = ref(false);
let editId = ref(0);
store.dispatch("adminMemberDesignee/getDesignees", route.params.user_id);

const tableData = computed(() => store.state.adminMemberDesignee.designee);
const lotLoading = computed(() => store.state.adminMemberDesignee.designee.loading);

const search = ref("");
const filterTableData = computed(() =>
  tableData.value.data.filter(
    (data) =>
      !search.value ||
      data.hoa_subd_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

function editModal(row) {
  editId.value = row.id;
  editDesignee.value = true;
}

async function deleteDesignee(row) {
  if (confirm(`Are you sure you want to delete this data? Operation can't be undone`)) {
    try {
      const res = await store.dispatch("designee/deleteDesignee", row.id);
      if (res.status === 204 || res.status === 200) {
        await store.dispatch("adminMemberDesignee/getDesignee", route.params.user_id);
        await store.commit("alert/notify", {
          title: "Success",
          type: "success",
          message: "The designee data was successfully deleted",
        });
      }
    } catch (err) {
      throw err;
    }
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

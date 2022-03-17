<template>
  <PageComponent navTitle="Admin Management" navContent="User Management">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addDialog = true"
        >Add User</el-button
      >
    </template>
    <template v-slot:content>
      <el-table
        align="center"
        header-align="center"
        :data="filterTableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          sortable
          v-for="header in tableHeader"
          :key="header.id"
          :prop="header.prop"
          :label="header.name"
          :width="header.width"
        ></el-table-column>
        <el-table-column align="right" width="130" fixed="right">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-popover
              placement="top-start"
              title="Action"
              :width="240"
              trigger="hover"
            >
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Edit User" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="success"
                  :icon="Edit"
                  @click="editDialog = true"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Disable User"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="warning"
                  :icon="Lock"
                  @click="disableSubdivision(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Delete User"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteSubdivision(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Generate New Password"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  :icon="Lollipop"
                  @click="resetDialog = true"
                ></el-button>
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </PageComponent>
  <add-modal
    :add-dialog="addDialog"
    @closeModal="addDialog = false"
  ></add-modal>
  <edit-modal
    :edit-dialog="editDialog"
    @closeModal="editDialog = false"
  ></edit-modal>
  <reset-password
    :reset-dialog="resetDialog"
    @close-modal="resetDialog = false"
  ></reset-password>
</template>
<script setup>
import { ref, computed } from "vue";
import AddModal from "./Actions/AddModal.vue";
import EditModal from "./Actions/EditModal.vue";
import ResetPassword from "./Actions/ResetPassword.vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, Delete, Lollipop, Lock } from "@element-plus/icons-vue";

const addDialog = ref(false);
const editDialog = ref(false);
const resetDialog = ref(false);
const tableHeader = [
  { id: "0", name: "HOA ID", prop: "hoaid", width: "100" },
  { id: "1", name: "Email Address", prop: "emailaddress", width: "180" },
  { id: "2", name: "Last Name", prop: "lastname", width: "180" },
  { id: "3", name: "First Name", prop: "firstname", width: "180" },
  { id: "4", name: "Middle Name", prop: "middlename", width: "180" },
  { id: "5", name: "Contact Number", prop: "contactnumber", width: "180" },
  { id: "6", name: "Position", prop: "position", width: "180" },
  { id: "7", name: "Access Type", prop: "accesstype", width: "180" },
  { id: "8", name: "Assigned", prop: "assigned", width: "180" },
  { id: "9", name: "Member Type", prop: "membertype", width: "180" },
];

const tableData = [
  {
    hoaid: "1",
    emailaddress: "jinky.ulijan@camayacoast.com",
    lastname: "Ulijan",
    firstname: "Jinky",
    middlename: "",
    contactnumber: "9563770943",
    position: "Admin",
    accesstype: "Full Admin",
    assigned: "All Subdivision",
    membertype: "HOA Admin",
  },
  {
    hoaid: "2",
    emailaddress: "franciscofelizardo123@gmail.com",
    lastname: "Felizardo",
    firstname: "Francisco",
    middlename: "Cortez",
    contactnumber: "9171234567",
    position: "Bayu Peak President",
    accesstype: "Subdivision Admin",
    assigned: "Bayu Peak",
    membertype: "HOA Admin, HOA Member",
  },
  {
    hoaid: "3",
    emailaddress: "rhenanmendones123@gmail.com",
    lastname: "Mendones",
    firstname: "Rhenan",
    middlename: "",
    contactnumber: "9953166421",
    position: "CRM Admin",
    accesstype: "Subdivision Admin",
    assigned: "Mont Kiarra Phase 1, Menara Point North",
    membertype: "HOA Admin",
  },
];
const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.emailaddress.toLowerCase().includes(search.value.toLowerCase()) ||
      data.lastname.toLowerCase().includes(search.value.toLowerCase()) ||
      data.firstname.toLowerCase().includes(search.value.toLowerCase()) ||
      data.middlename.toLowerCase().includes(search.value.toLowerCase())
  )
);

function deleteSubdivision(index, row) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
  }
}
function disableSubdivision(survey) {
  if (
    confirm(
      `Are you sure you want to disable this data? Operation can't be undone`
    )
  ) {
  }
}

// function editModal(index, row) {

// }
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

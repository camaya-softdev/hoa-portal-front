<template>
  <page-component navTitle="Member Management" navContent="Email Management">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addEmail = true"
        >Add Email</el-button
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
              :width="100"
              trigger="hover"
            >
              <template #reference>
                <el-button round>...</el-button>
              </template>

              <el-tooltip
                content="Edit Email"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editEmail = true"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Delete Email"
                placement="bottom"
                effect="light"
              >
                <el-button size="small" type="danger" :icon="Delete" @click="deleteSubdivision"></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <router-link
          :to="{ name: 'MessageTemplate' }"
          class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Show Template
        </router-link>
      </div>
    </template>
  </page-component>

  <add-email :add-email="addEmail" @closeModal="addEmail = false"></add-email>
  <edit-email
    :edit-email="editEmail"
    @closeModal="editEmail = false"
  ></edit-email>
</template>
<script setup>
import { ref, computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import AddEmail from "./Actions/AddEmail.vue";
import EditEmail from "./Actions/EditEmail.vue";

const addEmail = ref(false);
const editEmail = ref(false);

const tableHeader = [
  { id: "0", name: "Member Id", prop: "memberId", width: "180" },
  { id: "1", name: "Member Name", prop: "memberName" },
  { id: "2", name: "Email Address", prop: "emailAddress" },
  { id: "3", name: "Email Schedule", prop: "messageSchedule" },
  { id: "4", name: "Email Recurrent", prop: "messageRecurrent" },
  { id: "5", name: "Email", prop: "message" },
];

const tableData = [
  {
    id: "0",
    memberId: "1",
    memberName: "Francisco Felizardo",
    emailAddress: "franciscofelizardo123@gmail.com",
    messageSchedule: "January 15, 2022",
    messageRecurrent: "Monthly",
    message: "SOA",
  },
  {
    id: "2",
    memberId: "1",
    memberName: "Francisco Felizardo",
    emailAddress: "franciscofelizardo123@gmail.com",
    messageSchedule: "May 23, 2022",
    messageRecurrent: "Annualy",
    message: "Birthday Greeting",
  },
  {
    id: "1",
    memberId: "2",
    memberName: "Roldan Laguna",
    emailAddress: "LagunaRoldan321@yahoo.com",
    messageSchedule: "January 30, 2022",
    messageRecurrent: "Monthly",
    message: "SOA",
  },
  {
    id: "1",
    memberId: "2",
    memberName: "Roldan Laguna",
    emailAddress: "LagunaRoldan321@yahoo.com",
    messageSchedule: "November 13, 2022",
    messageRecurrent: "Annualy",
    message: "Birthday Greeting",
  },
];

const search = ref("");

const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.memberName.toLowerCase().includes(search.value.toLowerCase()) ||
      data.emailAddress.toLowerCase().includes(search.value.toLowerCase()) ||
      data.description.toLowerCase().includes(search.value.toLowerCase())
  )
);

function deleteSubdivision(survey) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
  }
}

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>

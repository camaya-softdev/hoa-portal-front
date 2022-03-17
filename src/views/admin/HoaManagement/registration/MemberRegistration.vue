<template>
  <page-component navTitle="Hoa Management" navContent="Member Registration">
    <template v-slot:buttons>
      <el-button class="button" type="text" @click="addMember = true"
        >Add Member</el-button
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
        <el-table-column align="right" width="180" fixed="right">
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
              title="Extension of Member Table"
              :width="240"
              trigger="hover"
            >
              <template #reference>
                <el-button round>Extension</el-button>
              </template>
              <el-tooltip content="Property" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Coordinate"
                  @click="property"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Document" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="primary"
                  :icon="Document"
                  @click="documents"
                ></el-button
              ></el-tooltip>
              <el-tooltip
                content="Reset Password"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="Loading"
                  @click="resetPassword"
                ></el-button
              ></el-tooltip>
              <el-tooltip
                content="Payment Transaction"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="CreditCard"
                  @click="paymentHistory"
                ></el-button
              ></el-tooltip>
            </el-popover>
            <el-popover
              placement="top-start"
              title="Action"
              :width="180"
              trigger="hover"
            >
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip
                content="Edit Member"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                  @click="editMember = true"
                ></el-button>
              </el-tooltip>
                <el-tooltip
                content="Disabled Member"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="warning"
                  :icon="Lock"
                  @click="disableSubdivision"
                ></el-button
              ></el-tooltip>
              <el-tooltip
                content="Delete Member"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="danger"
                  :icon="Delete"
                  @click="deleteSubdivision"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </page-component>
<add-member :addMember="addMember" @closeModal="addMember = false"></add-member>
<edit-member :editMember="editMember" @closeModal="editMember = false"></edit-member>
</template>
<script setup>
import { ref, computed } from "vue";
import AddMember from "./Actions/AddMember.vue"
import EditMember from "./Actions/EditMember.vue"
import PageComponent from "../../../../components/PageComponent.vue";
import {
  Edit,
  Delete,
  Coordinate,
  Document,
  Loading,
  CreditCard,
  Lock
} from "@element-plus/icons-vue";
import store from "../../../../store";
import {useRouter} from "vue-router"

const router = useRouter()
const addMember = ref(false);
const editMember = ref(false);

const user = {
  last_name: "",
  first_name: "",
  middle_name: "",
  email: "",
  notifications: "",
};

const tableHeader = [
  { id: "0", name: "Member Id", prop: "id", width: "100" },
  { id: "1", name: "Email Address", prop: "emailAddress", width: "200" },
  { id: "2", name: "Last Name", prop: "lastName", width: "180" },
  { id: "2", name: "First Name", prop: "firstName", width: "180" },
  { id: "3", name: "Middle Name", prop: "middleName", width: "180" },
  { id: "4", name: "E Bill", prop: "eBill", width: "180" },
  { id: "5", name: "SMS", prop: "sms", width: "180" },
];

const tableData = [
  {
    id: "1",
    emailAddress: "franciscofelizardo123@gmail.com",
    lastName: "Felizardo",
    firstName: "Francisco",
    middleName: "Cortez",
    eBill: "Yes",
    sms: "No",
  },
  {
    id: "2",
    emailAddress: "LagunaRoldan321@yahoo.com",
    lastName: "Laguna",
    firstName: "Roldan",
    middleName: "Barros",
    eBill: "Yes",
    sms: "Yes",
  },
  {
    id: "3",
    emailAddress: "julietg0621@gmail.com",
    lastName: "Guevara",
    firstName: "Juliet",
    middleName: "Anico",
    eBill: "No",
    sms: "No",
  },
];

const search = ref("");

const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.emailAddress.toLowerCase().includes(search.value.toLowerCase()) ||
      data.lastName.toLowerCase().includes(search.value.toLowerCase())
  )
);

function registration(ev) {
  ev.preventDefault();
  store.dispatch("registerMember", user).then((res) => {
    this.closeModal();
  });
}
function deleteSubdivision(survey) {
  if (
    confirm(
      `Are you sure you want to delete this data? Operation can't be undone`
    )
  ) {
  }
}
function disableSubdivision(survey) {
  if (confirm(`Are you sure you want to disable this data?`)) {
  }
}

function resetPassword(survey) {
  if (confirm(`Are you sure you want to reset his/her password?`)) {
  }
}
function property() {
  router.push({name:'MemberAddress'})
}
function documents() {
  router.push({name:'MemberDocuments'})
}
function paymentHistory() {
  router.push({name:'MemberPaymentHistory'})
}
</script>

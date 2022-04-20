<template>
  <page-component navTitle="Member Management" navContent="RFID Registration">
     <template v-slot:buttons>
      <el-button class="button" type="text" @click="addRFID = true"
        >Add RFID</el-button
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
                content="Edit RFID"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="primary"
                  :icon="Edit"
                   @click="editRFID = true"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Show Privilege"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  type="success"
                  :icon="CreditCard"
                  @click="showPrivilege"
                ></el-button
              ></el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </page-component>

  <addRFID :addRFID="addRFID" @closeModal="addRFID=false"></addRFID>
  <editRFID :editRFID="editRFID" @closeModal="editRFID=false"></editRFID>
</template>
<script setup>
import { ref,computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import { Edit, CreditCard } from "@element-plus/icons-vue";
import {useRouter} from "vue-router"
import AddRFID from "./Actions/AddRFID.vue"
import EditRFID from "./Actions/EditRFID.vue"

const router = useRouter()
const addRFID = ref(false);
const editRFID = ref(false);

const tableHeader = [
  {id:'0',name:'Registration Date',prop:'registration',width:'180'},
  {id:'1',name:'RFID NO.',prop:'rfid',width:'180'},
  {id:'2',name:'Semnox NO.',prop:'semnox',width:'180'},
  {id:'3',name:'Member ID',prop:"memberID",width:'180'},
  {id:'4',name:'Member Name',prop:'memberName',width:'180'},
  {id:'5',name:'Status',prop:'status',width:'180'},
  {id:'6',name:'Privilege Load',prop:'privilegeLoad',width:'180'},

]

const tableData = [
  {id:'0',registration:'March 15, 2022',rfid:'2999720368',semnox:'B019CCB2',memberID:'1',memberName:'Francisco Felizardo',status:'Active',privilegeLoad:'132'},
  {id:'1',registration:'March 15, 2022',rfid:'2041219302',semnox:'E688AA79',memberID:'2',memberName:'Roldan Laguna',status:'Active',privilegeLoad:'133'},
  {id:'2',registration:'March 15, 2022',rfid:'2041386134',semnox:'9614AD79',memberID:'3',memberName:'Juliet Guevara',status:'Active',privilegeLoad:'130'},
]

const search = ref("");

const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.memberName.toLowerCase().includes(search.value.toLowerCase())||
       data.semnox.toLowerCase().includes(search.value.toLowerCase())
  )
);
function showPrivilege() {
  router.push({name:'Priveleges'})
}

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

function closeModal2() {
  isOpen2.value = false;
}
function openModal2() {
  isOpen2.value = true;
}
</script>

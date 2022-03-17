<template>
<PageComponent navTitle="Hoa Management" navContent="Dues & Fees">

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
              :width="80"
              trigger="hover"
            >
              <template #reference>
                <el-button round>...</el-button>
              </template>
              <el-tooltip content="Show Fees" placement="bottom" effect="light">
                <el-button
                  size="small"
                  type="success"
                  :icon="Files"
                  @click="showDialog = true"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="Add Other Fees"
                type="primary"
                placement="bottom"
                effect="light"
              >
                <el-button
                  size="small"
                  :icon="Document"
                  @click="otherFees"
                ></el-button>
              </el-tooltip>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </PageComponent>
<show-fees :show-dialog="showDialog" @closeModal="showDialog = false"></show-fees>
</template>
<script setup>
import { Files, Document } from "@element-plus/icons-vue";
import { ref,computed } from "vue";
import PageComponent from "../../../../components/PageComponent.vue";
import ShowFees from "./Actions/ShowFees.vue";
import {useRouter} from "vue-router"

const router = useRouter()

const showDialog = ref(false);

const tableHeader = [
  { id: "0", name: "Member Id",prop:'id',width:'180' },
  { id: "1", name: "Full Name",prop:'fullName',width:'180' },
  { id: "2", name: "Subdivision",prop:'subdivision',width:'180' },
  { id: "3", name: "Address",prop:'address',width:'500' }
];

const tableData = [
  {
    id: "1",
    fullName: "Francisco Felizardo",
    subdivision: "Bayu Peak",
    address: "Blk 1 Lot 5",
  },
  {
    id: "2",
    fullName: "Roldan Laguna",
    subdivision: "Mont Kiarra Phase 1",
    address: "Blk 7 Lot 15",
  },
  {
    id: "3",
    fullName: "Juliet Guevara",
    subdivision: "Menara Point North",
    address: "Blk 2 Lot 1",
  },
];
const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.fullName.toLowerCase().includes(search.value.toLowerCase()) ||
      data.subdivision.toLowerCase().includes(search.value.toLowerCase()) ||
      data.address.toLowerCase().includes(search.value.toLowerCase())

  )
);

function otherFees(){
  router.push({name:"MemberFees"})
}

</script>

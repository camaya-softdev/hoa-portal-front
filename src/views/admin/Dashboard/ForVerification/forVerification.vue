<template>
  <div class="px-4 py-6">
    <h1 class="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-5 mt-5">
      For Verification
    </h1>
    <el-table
      :data="filterTableData"
      style="width: 100%; overflow-x: auto"
      :flexible="true"
      table-layout="auto"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div m="4">
            <h3 class="text-center">Payment For Verification</h3>
            <el-table
              :data="props.row.billing"
              style="width: 100%; overflow-x: auto"
              :flexible="true"
              table-layout="auto"
            >
              <el-table-column type="index" labe="#" prop="id" />
              <el-table-column label="Statement Number" prop="statement_number" />
              <el-table-column label="Bill Month" prop="bill_month" />
              <el-table-column label="Date Paid" prop="hoa_billing_date_paid" />
              <el-table-column label="Past Due" prop="past_due" />
              <el-table-column label="Total Cost" prop="total_cost" />
              <el-table-column label="Amount Paid" prop="amount_paid" />
              <el-table-column label="Payment Status" prop="hoa_billing_status" />
              <el-table-column align="right" fixed="right">
                <template #header>
                  <h3>Action</h3>
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
                    <el-tooltip
                      content="Edit Transaction"
                      placement="bottom"
                      effect="light"
                    >
                      <el-button
                        size="small"
                        type="primary"
                        :icon="Edit"
                        @click="editModal(scope.row)"
                      ></el-button>
                    </el-tooltip>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
            <h3 class="text-center">Payment Documents and Files</h3>
            <el-table
              :data="props.row.document"
              style="width: 100%; overflow-x: auto"
              :flexible="true"
              table-layout="auto"
            >
              <el-table-column type="index" label="#" prop="id" width="50" />
              <el-table-column
                label="Document Name"
                prop="hoa_document_name"
                width="180"
              />
              <el-table-column
                label="Document Description"
                prop="hoa_document_desc"
                width="180"
              />
              <el-table-column sortable label="Document Tag" width="180">
                <template #default="scope">
                  <el-tag disable-transitions>{{ scope.row.hoa_document_tag }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column sortable label="Document Files" width="180">
                <template #default="scope">
                  <el-image
                    v-for="file in scope.row.files"
                    :key="file.id"
                    :src="scope.row.files[0].url"
                    lazy
                  >
                    <template #error>
                      <a
                        href="#"
                        class="text-blue-500 underline"
                        @click="downloadPDF(file.url)"
                        >Download a PDF File</a
                      >
                    </template>
                  </el-image>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Date" prop="member_id" />
      <el-table-column label="Name" prop="member_name" />
      <el-table-column label="Subdivision" prop="address"></el-table-column>
    </el-table>
    <Pagination :tableData="tableData" @getForPage="getForPage"></Pagination>
  </div>
  <edit-for-verification
    v-if="editId !== 0"
    :editId="editId"
    :edit-for-verification="editForVerification"
    @closeModal="editForVerification = false"
    @editId="editId = 0"
  ></edit-for-verification>
</template>
<script setup>
import store from "../../../../store";
import { computed, ref } from "vue";
import { Edit } from "@element-plus/icons-vue";
import EditForVerification from "./actions/EditForVerification.vue";
import Pagination from "../../../../components/Pagination.vue";

store.dispatch("forVerification/getForVerifications");

let tableData = computed(() => store.state.forVerification.forVerification);
let filterTableData = computed(() => tableData.value.data);
let editId = ref(0);
let editForVerification = ref(false);

function editModal(row) {
  editId.value = row.id;
  editForVerification.value = true;
}

function downloadPDF(url) {
  return window.open(url);
}

async function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  await store.dispatch("forVerification/getForVerifications", {
    url: link.label,
  });
}
</script>

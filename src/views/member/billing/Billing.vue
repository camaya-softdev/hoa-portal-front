<template>
  <div class="md:max-lg:flex">

    <h1 class="text-xl md:text-2xl font-semibold text-center text-black mt-12">
      Payment History
    </h1>

    <!-- desktop view -->
    <div class="px-48 hidden md:block">
      <Table class="mt-3" stripe style="width: 100%">
        <template v-slot:table>
          <thead class="border-gray-50 border-b-2">
            <tr>
              <th class="p-3 text-sm tracking-wide text-center">
                Bill Month
              </th>
              <th class="p-3 text-sm tracking-wide text-center">
                Statement No.
              </th>
              <th class="p-3 text-sm tracking-wide text-center">
                Date Paid
              </th>
              <th class="p-3 text-sm tracking-wide text-center">
                Past Due
              </th>
              <th class="p-3 text-sm tracking-wide text-center">
                Current Balance
              </th>

              <th class="p-3 text-sm  tracking-wide text-center">
                Amount Paid
              </th>
              <!-- <th class="p-3 text-sm font-semibold tracking-wide text-center"></th> -->
              <th class="p-3 text-sm tracking-wide text-center">

                Payment Status
              </th>
              <th class="p-3 text-sm tracking-wide text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr class="bg-gray-50" v-for="data in tableData" :key="data.id">
              <td class="text-sm text-gray-700 text-center">
                {{ data.bill_month }}
              </td>
              <td class="text-sm text-gray-700 text-center">
                {{ data.statement_number }}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                {{ data.date_paid }}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                &#8369; {{ data.past_due }}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                &#8369; {{ data.current_balance }}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"> &#8369; {{data.amount_paid}}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                {{ data.status }}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                <a
                  @click="getBillings(data.id)"
                  class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                  >View Bill
                </a>
                |
                <a
                  href="#"
                  class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                  @click="downloadPDF(memberID, data.id)"
                >
                  Download
                </a>
              </td>
            </tr>
          </tbody>
        </template>
      </Table>
    </div>

    <!-- mobile view -->
    <div class="pt-0 mt-0 px-4 md:hidden">
      <Table class="mt-3" stripe style="width: 100%">
        <template v-slot:table>
          <thead class="border-gray-50 border-b-2">
            <tr>
              <th class="p-3 text-sm tracking-wide text-center">
                Bill Month
              </th>
              <th class="p-3 text-sm tracking-wide text-center">
                Statement No.
              </th>
              <th class="p-3 text-sm tracking-wide text-center">
                Date Paid
              </th>
              <th class="p-3 text-sm tracking-wide text-center">
                Past Due
              </th>
              <th class="p-3 text-sm tracking-wide text-center">
                Current Balance
              </th>
              <th class="p-3 text-sm tracking-wide text-center">
                Payment Status
              </th>
              <th class="p-3 text-sm tracking-wide text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr class="bg-gray-50" v-for="data in tableData" :key="data.id">
              <td class="text-sm text-gray-700 text-center">
                {{ data.bill_month }}
              </td>
              <td class="text-sm text-gray-700 text-center">
                {{ data.statement_number }}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                {{ data.date_paid }}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                &#8369; {{ data.past_due }}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                &#8369; {{ data.current_balance }}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                {{ data.status }}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                <a
                  @click="getBillings(data.id)"
                  class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                  >View Bill
                </a>
                |
                <a
                  href="#"
                  class="font-bold text-blue-500 hover:underline cursor-pointer text-center"
                  @click="downloadPDF(memberID, data.id)"
                >
                  Download
                </a>
              </td>
            </tr>
          </tbody>
        </template>
      </Table>
    </div>

  </div>

  <billing-statement
    :openStatement="openStatement"
    :statementID="statementID"
    @closeModal="openStatement = false"
    @reset="statementID = ''"
  ></billing-statement>

</template>

<script setup>
import Table from "../../../components/Table.vue";
import BillingStatement from "./Statement/BillingStatement.vue";
import store from "../../../store";
import { computed, ref } from "vue";

const openStatement = ref(false);
const statementID = ref(0);
store.dispatch("payment/getPayments");
const tableData = computed(() => store.state.payment.payments.data);
const memberID = computed(() => store.state.payment.memberID.data);

async function downloadPDF(memberId, billingId) {
  const res = await store.dispatch("billing/downloadPDF", {
    userId: memberId,
    billingId: billingId,
  });

  if (res.status === 200 || res.status === 201) {
    // var printWindow = window.open(
    //   `http://hoa-portal.test/invoice/${memberId}/${billingId}`
    // );

    var printWindow = window.open(
      `https://apidevhoaportal.camayacoast.com/invoice/${memberId}/${billingId}/`
    );
    await store.dispatch("billing/getBillings", props.statementID);
    await store.commit("alert/notify", {
      title: "Success",
      type: "success",
      message: "You are successfully download your Invoice",
    });
  }
}

function getBillings(id) {
  statementID.value = id;
  openStatement.value = true;
}
</script>

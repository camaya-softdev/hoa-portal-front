<template>
  <div
    v-if="billingLoading"
    v-loading.fullscreen.lock="billingLoading"
    element-loading-text="Fetching Data..."
  ></div>
  <div v-else class="overflow-hidden overflow-y-scroll" style="height: 40rem">
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <hr class="border-gray-500" />
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg text-center leading-6 text-gray-900">
          Statement of Account
        </h3>
      </div>
      <div class="border-t border-gray-500">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium font-bold text-gray-500">Bill To:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">
              {{
                billingData.subdivision_name +
                "Blk " +
                billingData.block_number +
                ",Lot " +
                billingData.lot_number
              }}
            </dd>
            <dt class="text-sm font-medium font-bold text-gray-500">Statement Date:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">
              {{ billingData.billing[0].statement_date }}
            </dd>
            <dt class="text-sm font-medium font-bold text-gray-500">Statement #</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">
              {{ billingData.billing[0].statement_number }}
            </dd>
            <dt class="text-sm font-medium font-bold text-gray-500">Member ID #</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">
              {{ billingData.member_id }}
            </dd>
          </div>
          <hr class="border-gray-500" />
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg text-center leading-6 text-gray-900">
              Account Summary
            </h3>
          </div>
          <hr class="border-gray-500" />
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium font-bold text-gray-500">Total Amount Due:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">
              ₱{{ billingData.billing[0].total_cost }}
            </dd>
            <dt class="text-sm font-medium font-bold text-gray-500">Current Due:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">
              ₱{{ billingData.billing[0].current_due }}
            </dd>
            <dt class="text-sm font-medium font-bold text-gray-500">Past Due:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">
              ₱{{ billingData.billing[0].past_due }}
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500"></dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2"></dd>
            <dt class="text-sm font-medium font-bold text-gray-500">Payment Due Date</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">
              {{ billingData.billing[0].payment_due }}
            </dd>
          </div>

          <hr class="border-gray-500" />
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg text-center leading-6 text-gray-900">
              Billing Summary
            </h3>
          </div>
          <hr class="border-gray-500" />
          <Table class="mt-3">
            <template v-slot:table>
              <thead class="border-gray-50 border-b-2" style="color: black;">
                <tr>
                  <th class="p-3 text-sm tracking-wide text-center">
                    Date
                  </th>

                  <th class="p-3 text-sm tracking-wide text-center">
                    Description
                  </th>
                  <th class="p-3 text-sm tracking-wide text-center">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  class="bg-gray-50"
                  v-for="data in billingData.billing[0].billingSummary"
                >
                  <td class="text-sm text-gray-700 text-center">
                    {{ data.date }}
                  </td>

                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    {{ data.description }}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                    ₱{{ data.amount }}
                  </td>
                </tr>
              </tbody>
            </template>
          </Table>
          <!-- <hr class="border-gray-500 mt-4" />
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg text-center leading-6 font-semibold text-gray-900">
              Downloadable Files
            </h3>
          </div> -->
          <!-- <hr class="border-gray-500" />
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Attachments</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul
                role="list"
                class="border border-gray-200 rounded-md divide-y divide-gray-200"
              >
                <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div class="w-0 flex-1 flex items-center">
                    <PaperClipIcon
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span class="ml-2 flex-1 w-0 truncate"> Billing Statement.pdf </span>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      @click="
                        downloadPDF(
                          billingData.memberId,
                          billingData.billing[0].billingId
                        )
                      "
                      class="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> -->
        </dl>
        <hr class="border-gray-500" />
      </div>
    </div>
  </div>
  <div v-if="billingLoading"></div>
  <div v-else class="bg-gray-100 px-4 py-3 text-right sm:px-6">
    <div
      v-if="
        billingData.billing[0].status === 'For Verification' ||
        billingData.billing[0].status === 'Paid' ||
        billingData.billing[0].status === 'Partial Payment' ||
        billingData.billing[0].status === 'Past Due'
      "
      class="flex justify-center"
    >
      <p class="text-sm font-bold text-blue-500">
        <span class="text-green-500">Status: </span>
        <span v-if="billingData.billing[0].status === 'For Verification'">
          For Verification
        </span>
        <span v-if="billingData.billing[0].status === 'Paid'"> Paid </span>
        <span v-if="billingData.billing[0].status === 'Partial Payment'">
          Partial Payment
        </span>
        <span v-if="billingData.billing[0].status === 'Past Due'"> Past Due</span>
      </p>
    </div>
    <!-- <button
      type="button"
      tag="button"
      disabled

      :to="{
        name: 'Payment',
        params: { id: billingData.billing[0].bilingId },
      }"
      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >

    </button> -->

    <div v-if="billingData.billing[0].status === 'Unpaid'">
      <router-link
        type="button"
        :to="{
          name: 'Payment',
          params: { id: billingData.billing[0].billingId },
        }"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
      >
        Pay
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { computed,ref } from "vue";
import store from "../../../store";

const props = defineProps<{
  statementID: Number;
}>();
let billingData = ref('');

if (props.statementID !== 0) {
  store.dispatch("billing/getBillings", props.statementID);
  billingData = computed(() => store.state.billing.billings.data);
}

const billingLoading = computed(() => store.state.billing.billings.loading);
</script>

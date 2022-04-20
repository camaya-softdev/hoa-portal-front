<template>
  <div class="overflow-hidden overflow-y-scroll" style="height: 30rem">
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <hr class="border-gray-500" />
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg text-center leading-6 font-semibold text-gray-900">
          Statement of Account
        </h3>
      </div>
      <div class="border-t border-gray-500">
        <dl>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-black-500">Bill To:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">
              Menara Point North Blk 2, Lot 1
            </dd>
            <dt class="text-sm font-medium text-gray-500">Statement Date:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2"></dd>
            <dt class="text-sm font-medium text-gray-500">Statement #</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">
              MPN-2022-001
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-semibold text-gray-500"></dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2"></dd>
            <dt class="text-sm font-semibold text-gray-500">Account Summary</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2"></dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Bank:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2"></dd>
            <dt class="text-sm font-medium text-gray-500">Total Amount Due:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">26,200</dd>
            <dt class="text-sm font-medium text-gray-500">Account Name:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">
              Taman Ridge/Menara Point North Home Owners Association
            </dd>
            <dt class="text-sm font-medium text-gray-500">Current Due:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2"></dd>
            <dt class="text-sm font-medium text-gray-500">Account Number:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2"></dd>
            <dt class="text-sm font-medium text-gray-500">Past Due:</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2"></dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500"></dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2"></dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500"></dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2"></dd>
            <dt class="text-sm font-medium text-gray-500">Payment Due Date</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-2">
              30-Mar-22
            </dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-semibold text-gray-500">
              For online payments:
            </dt>
            <dd class="mt-1 text-sm text-blue-500 sm:mt-0 sm:col-span-2">
              <a href="https://payments.camayacoast.com"
                >https://payments.camayacoast.com</a
              >
            </dd>
            <dt class="text-sm font-semibold text-gray-500">
              Or you can visit Head Office at:
            </dt>
            <dd class="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">
              Jacinta Bldg. 2, EDSA Guadalupe Nuevo, Makati City, 1212
              Philippines
            </dd>
          </div>

          <hr class="border-gray-500" />
          <div class="px-4 py-5 sm:px-6">
            <h3
              class="text-lg text-center leading-6 font-semibold text-gray-900"
            >
              Account Activity
            </h3>
          </div>
          <hr class="border-gray-500" />
          <Table class="mt-3">
            <template v-slot:table>
              <thead class="border-gray-50 border-b-2">
                <tr>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Date
                  </th>

                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Type
                  </th>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Invoice
                  </th>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Description
                  </th>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Payment
                  </th>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Amount
                  </th>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="bg-gray-50">
                  <td class="text-sm text-gray-700 text-center">02/28/2022</td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    AD
                  </td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    Association Dues
                  </td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    5,600.00
                  </td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    5,600.00
                  </td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="text-sm text-gray-700 text-center"></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    Taman Ridge & Menara Point North
                  </td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="text-sm text-gray-700 text-center"></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                </tr>
                <tr>
                  <td class="text-sm text-gray-700 text-center">02/28/2022</td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    Association Dues
                  </td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    5,600.00
                  </td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    5,600.00
                  </td>
                </tr>
                <tr>
                  <td class="text-sm text-gray-700 text-center"></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    February 28, 2022
                  </td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                </tr>
                <tr>
                  <td class="text-sm text-gray-700 text-center"></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    Taman Ridge & Menara Point North
                  </td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="text-sm text-gray-700 text-center"></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                </tr>
                 <tr class="bg-gray-50">
                  <td class="text-sm text-gray-700 text-center">02/28/2022</td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >Facility Maintenance Fee</td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >₱15,000</td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >₱15,000</td>
                </tr>
                  <tr class="bg-gray-50">
                  <td class="text-sm text-gray-700 text-center"></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >February 28, 2022</td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                </tr>
                  <tr class="bg-gray-50">
                  <td class="text-sm text-gray-700 text-center"></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >Menara Point North</td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                </tr>
                       <tr class="bg-gray-50">
                  <td class="text-sm text-gray-700 text-center"></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                </tr>
                       <tr class="bg-gray-50">
                  <td class="text-sm text-gray-700 text-center"></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >Current Balance</td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >26,200</td>
                </tr>
              </tbody>
            </template>
          </Table>
          <!-- <hr class="border-gray-500" />
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg text-center leading-6 font-semibold text-gray-900">
            Downloadable Files
          </h3>
        </div>
        <hr class="border-gray-500" />
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Attachments</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <ul
              role="list"
              class="border border-gray-200 rounded-md divide-y divide-gray-200"
            >
              <li
                class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
              >
                <div class="w-0 flex-1 flex items-center">
                  <PaperClipIcon
                    class="flex-shrink-0 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span class="ml-2 flex-1 w-0 truncate">
                    Billing Statement.pdf
                  </span>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a
                    href="#"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Download
                  </a>
                </div>
              </li>
            </ul>
          </dd>
        </div> -->
          <hr class="border-gray-500" />
          <Table class="mt-3">
            <template v-slot:table>
              <thead class="border-gray-50 border-b-2">
                <tr>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Past Due 1-13 Days
                  </th>

                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Past Due 31-60 Days
                  </th>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Past Due 61-90 Days
                  </th>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Past Due Over 90 Days
                  </th>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Current Due
                  </th>
                  <th
                    class="p-3 text-sm font-semibold tracking-wide text-center"
                  >
                    Amount Due
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="bg-gray-50">
                  <td class="text-sm text-gray-700 text-center"></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>
                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  ></td>

                  <td
                    class="p-3 text-sm text-gray-700 whitespace-nowrap text-center"
                  >
                    ₱26,200
                  </td>
                </tr>
              </tbody>
            </template>
          </Table>
        </dl>
        <hr class="border-gray-500" />
      </div>
    </div>
  </div>
</template>

<script>
import { PaperClipIcon } from "@heroicons/vue/solid";
import Table from "../../../components/Table.vue";
export default {
  components: {
    PaperClipIcon,
    Table,
  },
};
</script>

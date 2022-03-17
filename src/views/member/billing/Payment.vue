<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900 mt-10">
              Bill Payment
            </h3>
            <p class="mt-1 text-sm text-gray-600">Payment Option</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow overflow-hidden sm:rounded-md mt-10">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="memberID"
                    class="block text-sm font-medium text-gray-700"
                    >Balance</label
                  >
                  <input
                    type="text"
                    name="memberID"
                    id="memberID"
                    disabled
                    autocomplete="memberID"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="email-address"
                    class="block text-sm font-medium text-gray-700"
                    >Due Date</label
                  >
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    disabled
                    autocomplete="email-address"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-6">
                  <label
                    for="subdivision"
                    class="block text-sm font-medium text-gray-700"
                    >Payment Option</label
                  >
                  <select
                    id="subdivision"
                    name="subdivision"
                    autocomplete="country-name"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Cash</option>
                    <option>Credit Card</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <router-link
                :to="{ name: 'Billing' }"
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200" />
      </div>
    </div>
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Payment Address
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            This information will be saved as reference
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="col-span-6 sm:col-span-6">
                <label
                  for="memberID"
                  class="block text-sm font-medium text-gray-700"
                  >Bank Name</label
                >
                <input
                  type="text"
                  name="memberID"
                  id="memberID"
                  autocomplete="memberID"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-6 sm:col-span-6">
                <label
                  for="memberID"
                  class="block text-sm font-medium text-gray-700"
                  >Amount Paid</label
                >
                <input
                  type="text"
                  name="memberID"
                  id="memberID"
                  autocomplete="memberID"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="col-span-6 sm:col-span-6">
                <label
                  for="memberID"
                  class="block text-sm font-medium text-gray-700"
                  >Date Paid</label
                >
                <input
                  type="date"
                  name="memberID"
                  id="memberID"
                  autocomplete="memberID"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Deposit Slip
                </label>
                <div
                  class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                >
                  <div class="space-y-1 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label
                        for="file-upload"
                        class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload Deposit Slip</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          class="sr-only"
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="bg-gray-100 px-4 py-3 text-right sm:px-6 mt-5">
      <a
        type="button"
        href="/billing"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Back
      </a>
    </div>
  </div>
</template>

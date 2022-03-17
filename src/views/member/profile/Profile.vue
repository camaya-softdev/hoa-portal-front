<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h3 class="font-bold text-red-700 text-center">
        NOTICE: COMPLETE THE REGISTRATION FORM BELOW TO PROCEED
      </h3>
      <p class="text-center text-sm text-gray-700 mt-2">
        thank you and Welcome to Biyak na Bato
      </p>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <!--
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->

        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p class="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="memberID"
                          class="block text-sm font-medium text-gray-700"
                          >Member ID</label
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
                          >Email Address</label
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

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="last-name"
                          class="block text-sm font-medium text-gray-700"
                          >Last name</label
                        >
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          disabled
                          autocomplete="last-name"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="first-name"
                          class="block text-sm font-medium text-gray-700"
                          >First name</label
                        >
                        <input
                          type="text"
                          name="first-name"
                          disabled
                          id="first-name"
                          autocomplete="family-name"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="middle-name"
                          class="block text-sm font-medium text-gray-700"
                          >Middle name</label
                        >
                        <input
                          type="text"
                          name="middle-name"
                          id="middle-name"
                          disabled
                          autocomplete="middle-name"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="contact-number"
                          class="block text-sm font-medium text-gray-700"
                          >Contact Number</label
                        >
                        <input
                          type="text"
                          name="contact-number"
                          id="contact-number"
                          autocomplete="contact-number"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6">
                        <label
                          for="subdivision"
                          class="block text-sm font-medium text-gray-700"
                          >Subdivision</label
                        >
                        <select
                          id="subdivision"
                          name="subdivision"
                          disabled
                          autocomplete="country-name"
                          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Biyak Na Bato</option>
                          <option>Tadandangan</option>
                          <option>Quinawan</option>
                        </select>
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="last-name"
                          class="block text-sm font-medium text-gray-700"
                          >House Number</label
                        >
                        <input
                          type="text"
                          name="last-name"
                          disabled
                          id="last-name"
                          autocomplete="last-name"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="first-name"
                          class="block text-sm font-medium text-gray-700"
                          >Street Name</label
                        >
                        <input
                          type="text"
                          name="first-name"
                          disabled
                          id="first-name"
                          autocomplete="family-name"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          for="city"
                          class="block text-sm font-medium text-gray-700"
                          >Block Number</label
                        >
                        <input
                          type="text"
                          name="city"
                          id="city"
                          disabled
                          autocomplete="address-level2"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          for="region"
                          class="block text-sm font-medium text-gray-700"
                          >Lot Number</label
                        >
                        <input
                          type="text"
                          name="region"
                          disabled
                          id="region"
                          autocomplete="address-level1"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          for="postal-code"
                          class="block text-sm font-medium text-gray-700"
                          >Lot Area</label
                        >
                        <input
                          type="text"
                          name="postal-code"
                          disabled
                          id="postal-code"
                          autocomplete="postal-code"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
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
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200" />
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Designee
                </h3>
                <p class="mt-1 text-sm text-gray-600">
                  Note: if single parents are qualified designees. if married,
                  spouse and children are qualified
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          for="city"
                          class="block text-sm font-medium text-gray-700 text-center"
                          >Name of Designee</label
                        >
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autocomplete="address-level2"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          for="region"
                          class="block text-sm font-medium text-gray-700 text-center"
                          >Relationship</label
                        >
                        <input
                          type="text"
                          name="region"
                          id="region"
                          autocomplete="address-level1"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          for="postal-code"
                          class="block text-sm font-medium text-gray-700 text-center"
                          >Birthday</label
                        >
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autocomplete="postal-code"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autocomplete="address-level2"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <input
                          type="text"
                          name="region"
                          id="region"
                          autocomplete="address-level1"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autocomplete="postal-code"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autocomplete="address-level2"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <input
                          type="text"
                          name="region"
                          id="region"
                          autocomplete="address-level1"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autocomplete="postal-code"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autocomplete="address-level2"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <input
                          type="text"
                          name="region"
                          id="region"
                          autocomplete="address-level1"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autocomplete="postal-code"
                          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
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
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200" />
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Notifications
                </h3>
                <p class="mt-1 text-sm text-gray-600">
                  Decide which communications you'd like to receive and how.
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                      <legend class="text-base font-medium text-gray-900">
                        By Email
                      </legend>
                      <div class="mt-4 space-y-4">
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input
                              id="comments"
                              name="comments"
                              type="checkbox"
                              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div class="ml-3 text-sm">
                            <label
                              for="comments"
                              class="font-medium text-gray-700"
                              >Announcement</label
                            >
                            <p class="text-gray-500">
                              Get notified on a Latest Announcement.
                            </p>
                          </div>
                        </div>
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input
                              id="candidates"
                              name="candidates"
                              type="checkbox"
                              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div class="ml-3 text-sm">
                            <label
                              for="candidates"
                              class="font-medium text-gray-700"
                              >News</label
                            >
                            <p class="text-gray-500">
                              Get notified on a Latest News.
                            </p>
                          </div>
                        </div>
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input
                              id="offers"
                              name="offers"
                              type="checkbox"
                              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div class="ml-3 text-sm">
                            <label
                              for="offers"
                              class="font-medium text-gray-700"
                              >E-Billing</label
                            >
                            <p class="text-gray-500">
                              Get notified when Latest Billing.
                            </p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset>
                      <div>
                        <legend class="text-base font-medium text-gray-900">
                          Push Notifications
                        </legend>
                        <p class="text-sm text-gray-500">
                          These are delivered via SMS to your mobile phone.
                        </p>
                      </div>
                      <div class="mt-4 space-y-4">
                        <div class="flex items-center">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            for="push-everything"
                            class="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Everything
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            for="push-email"
                            class="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Same as email
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            id="push-nothing"
                            name="push-notifications"
                            type="radio"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            for="push-nothing"
                            class="ml-3 block text-sm font-medium text-gray-700"
                          >
                            No push notifications
                          </label>
                        </div>
                      </div>
                    </fieldset>
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
        </div>
      </div>
      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200" />
        </div>
      </div>
      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Change your Password
              </h3>
              <p class="mt-1 text-sm text-gray-600">
                you must change or remember your password
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6">
                      <label
                        for="password"
                        class="block text-sm font-medium text-gray-700"
                        >New Password</label
                      >
                      <input
                        type="text"
                        name="password"
                        id="password"
                        autocomplete="password"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div class="col-span-6">
                      <label
                        for="password"
                        class="block text-sm font-medium text-gray-700"
                        >Confirm Password</label
                      >
                      <input
                        type="text"
                        name="password-confirmation"
                        id="password-confirmation"
                        autocomplete="password-confirmation"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
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
      </div>
      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200" />
        </div>
      </div>
      <!-- /End replace -->
      <div class="bg-gray-100 px-4 py-3 text-right sm:px-6">
        <a
          type="button"
          href="/"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next
        </a>
      </div>
    </div>
  </main>
</template>

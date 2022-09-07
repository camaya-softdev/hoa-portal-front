<template>
  <form action="#" method="POST">
    <div class="shadow sm:rounded-md sm:overflow-hidden">
      <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
        <div class="col-span-6 sm:col-span-6">
          <label
            for="memberID"
            class="block text-sm font-medium text-gray-700"
          >First Name</label
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
          >Last Name</label
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
          >Credit Card Number</label
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
          >CVC</label
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
          >Card Expiration</label
          >
          <input
            type="date"
            name="memberID"
            id="memberID"
            autocomplete="memberID"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
    export default {
        name: "OnlinePayment"
    }
</script>

<style scoped>

</style>

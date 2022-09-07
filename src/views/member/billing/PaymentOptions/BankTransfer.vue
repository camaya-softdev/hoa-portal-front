<template>
  <form action="#" method="POST">
    <div class="shadow sm:rounded-md sm:overflow-hidden">
      <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
        <div class="col-span-6 sm:col-span-6">
          <label
            for="memberID"
            class="block text-sm font-medium text-gray-700"
          >Enter Amount</label>
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
          >Account Name</label
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
          >Account Number</label
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
          >Send Receipt to (optional)</label
          >
          <input
            type="text"
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
        name: "BankTransfer"
    }
</script>

<style scoped>

</style>

<template>
  <div class="px-5 py-5">
    <h1
      class="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-5 mt-5"
    >
      Event
    </h1>
    <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
      <h1 class="text-2xl font-semibold mb-3 text-center text-gray-700 mt-4">
        Cities are Crowded
      </h1>
      <div class="px-4">
        <p class="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
          suscipit architecto soluta ea asperiores ipsum, porro sequi magnam hic
          alias cum magni ullam. Sapiente, animi repudiandae laudantium fuga
          voluptatum sunt.
        </p>
      </div>
    </div>
    <div class="mt-4 px-4 py-3 bg-gray-50 text-right sm:px-6">
      <router-link
        :to="{ name: 'Announcement' }"
        type="submit"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Back
      </router-link>
    </div>
  </div>
</template>

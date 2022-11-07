<template>
  <header class="shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <nav class="flex mt-4 justify-center" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <span
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-black"
            >
              <svg
                class="mr-2 w-4 h-4 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="text-black"
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                ></path>
              </svg>
              <span class="text-black">{{ navTitle.toUpperCase() }}</span>
            </span>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                class="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <router-link
                v-if="navLink"
                class="ml-1 text-sm font-medium text-black hover:border-current md:ml-2 dark:text-black"
                :to="{ name: navLink }"
                >{{ navContent }}
              </router-link>
              <span
                v-else
                class="ml-1 text-sm font-medium text-black md:ml-2 dark:text-black"
                >{{ navContent.toUpperCase() }}</span
              >
            </div>
          </li>
          <li v-if="navChildContent" aria-current="page">
            <div class="flex items-center">
              <svg
                class="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-1 text-sm font-medium text-black md:ml-2 dark:text-black">{{
                navChildContent
              }}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  </header>
  <main>
    <div class="max-w-10xl mx-auto py-8 sm:px-8 lg:px-10">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <!-- <add-button-search @openModal="openModal"></add-button-search> -->
        <el-card class="box-card">
          <template #header>
            <div class="flex justify-between align-center px-3 py-4">
              <span class="text-black font-semibold">
                {{ navChildContent }}
                <p v-if="!navChildContent">{{ navContent.toUpperCase() }}</p>
                <span
                  v-if="navName"
                  class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full"
                  >{{ navName.toUpperCase() }}</span
                >

                <span
                  v-if="navChildName"
                  class="text-xs inline-flex ml-2 items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full"
                  >{{ navChildName.toUpperCase() }}</span
                >
              </span>

              <slot name="buttons"></slot>
            </div>
          </template>
          <div style="max-width: 99%">
            <slot name="content"></slot>
          </div>
        </el-card>
      </div>
    </div>
  </main>
</template>
<script setup>
const props = defineProps({
  navTitle: String,
  navContent: String,
  navName: String,
  navChildContent: String,
  navLink: String,
  navChildName: String,
});
</script>
<style>
.el-card__header {
  background-color: #eab308;
}

.el-card {
  background: rgba(0, 0, 0, 0.4);
}
</style>

<template>
  <div class="flex items-center justify-between mb-4">
    <form action="">
      <div
        class="relative flex items-center text-gray-400 focus-within:text-blue-600"
      >
        <SearchIcon
          class="w-5 h-5 absolute ml-3 pointer-events-none"
        ></SearchIcon>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          aria-label="Search"
          autocomplete="off"
          class="pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black border-none ring-2 ring-gray-300 focus:ring-blue-500 focus:ring-2"
        />
      </div>
    </form>

    <div>
      <button
        @click="openModal"
        class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:big-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add
      </button>
    </div>
  </div>
</template>
<script setup>
import { SearchIcon } from "@heroicons/vue/outline";

const emit = defineEmits([
  "openModal"
])

function openModal(){
  emit('openModal')
}
</script>

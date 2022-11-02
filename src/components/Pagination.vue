<template>
  <div class="flex justify-center mt-5">
    <nav
      class="opacity-90 relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px bg-yellow-600"
      aria-label="Pagination"
    >
      <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
      <a
        v-for="(link, i) of tableData.links"
        :key="i"
        :disabled="!link.url"
        :href="link.url"
        @click="handleClick($event, link)"
        aria-current="page"
        class="bg-yellow-600 relative text-black inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
        :class="[
          link.active
            ? 'z-10 bg-indigo-50 border-yellow-600 text-yellow-800'
            : 'bg-yellow-600 hover:bg-yellow-700',
          i === 0 ? 'rounded-l-md bg-gray-100' : '',
          i === tableData.links.length - 1 ? 'rounded-r-md' : '',
        ]"
        v-html="link.label"
      >
      </a>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  tableData: Object;
}>();
const emits = defineEmits(["getForPage"]);

function handleClick(ev, link) {
  emits("getForPage", ev, link);
}
</script>

<style scoped></style>

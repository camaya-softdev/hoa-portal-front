<template>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="px-4 py-6 sm:px-0">
        <div class="mb-5">
          <QuickView></QuickView>
        </div>
        <div class="mb-5"><Announcement></Announcement></div>
        <div><News></News></div>
        <div class="mb-5"></div>
        <div class="mb-5"><Community></Community></div>
        <div class="mb-5"></div>
        <div class="mb-5"><BoardofDirectors></BoardofDirectors></div>
      </div>
      <!-- /End replace -->
    </div>
  </main>
</template>
<script setup>
import QuickView from "./IndexComponents/QuickView.vue";
import Announcement from "./IndexComponents/Announcement.vue";
import News from "./IndexComponents/News.vue";
import BoardofDirectors from "./IndexComponents/BoardDirectors.vue";
import Community from "./IndexComponents/Community.vue";
</script>

<template>
  <main>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <!-- Replace with your content -->

      <div class="px-5 sm:px-0 bgtrans">
        <div class="mb-2">
          <QuickView></QuickView>
        </div>
        <div class="mb-2 bg-white bg-opacity-0"><Announcement></Announcement></div>

        <!-- desktop view -->
        <!-- <div class="grid grid-rows-1 grid-flow-col gap-4 hidden md:block">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white bg-opacity-0"><News></News></div>
            <div class="bg-white bg-opacity-0"><BoardofDirectors></BoardofDirectors></div>
          </div>
        </div> -->
        
        <!-- mobile view -->
        <!-- <div class="bg-white bg-opacity-0 md:hidden"><News></News></div>  
        <div class="mb-2 bg-white bg-opacity-0 pb-5 md:hidden"><BoardofDirectors></BoardofDirectors></div> -->

        <div class="bg-white bg-opacity-0"><News></News></div>  
        <div class="mb-2 bg-white bg-opacity-0 pb-5"><BoardofDirectors></BoardofDirectors></div>

        <!-- <div class="mb-5"><Community></Community></div>-->
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
</script>

<style>
  bgtrans {
    background: rgba(0, 0, 0, 0.4);
  }
</style>

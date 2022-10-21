<template>
  <!-- <h1 class="text-2xl md:text-3xl font-semibold text-center text-black mb-5 mt-12">
    Announcements
  </h1> -->
  <div class="mx-auto mt-12">
    <!--<h1 class="text-2xl font-semibold mb-3 text-center text-gray-700 mt-4">Cities are Crowded</h1>-->

    <div class="title_divider font-semibold" style="margin-top: 5rem !important;">
      <div class="subtitle">ANNOUNCEMENTS</div>
    </div>

    <div
      v-if="eventLoading"
      v-loading.fullscreen.lock="eventLoading"
      element-loading-text="Fetching Data..."
    ></div>

    <!-- desktop view -->
    <div class="hidden md:block">
      <el-carousel 
        :interval="3000" 
        height="500px" 
        justify="center" 
        class="shadow-xl shadow-slate-900/10"
        indicator-position="none"
        >
          <el-carousel-item
            v-for="data in eventsData"
            @click="showModal(data.id)"
            :key="data.id"
          >
            <div class="item">
              <div class="item__content">
                {{ data.title }}
              </div>
              <img class="item__image" :src="data.image" :alt="data.title" />
            </div>
          </el-carousel-item>
      </el-carousel>
    </div>

    <!-- mobile view -->
    <div class="md:hidden">
      <el-carousel 
        :autoplay="false"
        height="300px" 
        justify="center" 
        direction="vertical"
        class="shadow-xl shadow-slate-900/10"
        >
          <el-carousel-item
            v-for="data in eventsData"
            @click="showModal(data.id)"
            :key="data.id"
          >
            <div class="item">
              <div class="item__content">
                {{ data.title }}
              </div>
              <img class="item__image" :src="data.image" :alt="data.title" />
            </div>
          </el-carousel-item>
      </el-carousel>
    </div>

  </div>

  <event-action
    v-if="eventId !== 0"
    :eventDialog="eventDialog"
    @eventId="eventId = 0"
    :eventId="eventId"
    @closeModal="eventDialog = false"
  ></event-action>

</template>

<script setup>
  import store from "../../../store";
  import eventAction from "./actions/eventAction.vue";
  import { ref, computed } from "vue";

  let eventDialog = ref(false);
  let eventId = ref(0);
  store.dispatch("event/getEvents");

  function showModal(id) {
    eventId.value = id;
    eventDialog.value = true;
  }
  const eventsData = computed(() => store.state.event.event.data);
  const eventLoading = computed(() => store.state.event.event.loading);
</script>

<style scoped>
  .item {
    position: relative;
    height: 100%;
    text-align: center;
  }

  .item__content {
    position: absolute;
    bottom: 0;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 3px;
  }

  .item__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>

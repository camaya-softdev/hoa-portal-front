<template>
  <!-- <section class="md:h-full flex items-center text-gray-600"> -->
 
    <div class="mx-auto">
      <div class="text-center mb-12">
        <!-- <h5 class="text-base md:text-lg text-blue-500 mb-1">See Our Latest News</h5> -->
        <!-- <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-black sm:text-4xl text-center">
          News
        </p> -->
        <div class="title_divider font-semibold">
          <div class="subtitle">LATEST NEWS</div>
        </div>
        
        <!-- desktop view -->
        <!-- grid -->
        <div class="grid grid-rows-1 grid-flow-col gap-2 hidden md:block m-4">
          <div v-for="data in newsData" :key="data.id" class="grid grid-cols-1 gap-2 my-4 ">
            <div class="h-full border-0 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition duration-500 hover:scale-100 hover:cursor-pointer, hover:shadow-xl hover:shadow-slate-900/10 bg-white shadow-xl shadow-slate-900/10" style="border-radius: 1rem;" >
              <img :src="data.image" :alt="data.title" class="lg:h-42 md:h-48 w-full object-cover object-center"/>
              <div class="p-6">
                <h1 class="text-2xl text-gray-900 font-semibold mb-3">{{ data.title }}</h1>
                <p class="text-gray-700 font-base leading-relaxed mb-3">
                  {{ data.description }}
                </p>
                <div class="flex items-center flex-wrap">
                  <a @click="showModal(data.id)" class="text-yellow-600 cursor-pointer inline-flex items-center md:mb-2 lg:mb-0">
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                  <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    {{ data.type }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- grid mobile view -->
        <!-- <div class="md:hidden m-4">
          <div v-for="data in newsData" :key="data.id" class="grid grid-cols-1 gap-2 my-4">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:cursor-pointer, hover:shadow-xl hover:shadow-slate-900/10" style="border-radius: 1rem;">
              <img
                :src="data.image"
                :alt="data.title"
                class="lg:h-42 md:h-48 w-full object-cover object-center"
              />
              <div class="p-6">
                <h1 class="text-2xl text-gray-900 font-semibold mb-3">{{ data.title }}</h1>
                <p class="text-gray-700 font-base leading-relaxed mb-3">
                  {{ data.description }}
                </p>
                <div class="flex items-center flex-wrap">
                  <a
                    @click="showModal(data.id)"
                    class="text-yellow-600 cursor-pointer inline-flex items-center md:mb-2 lg:mb-0"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                  <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    {{ data.type }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        
        <!-- carousel mobile-->
        <div>
          <div class="md:hidden">
            <el-carousel 
              :autoplay="false"
              height="300px" 
              justify="center" 
              direction="vertical" 
              class="shadow-xl shadow-slate-900/10"
              >
                <el-carousel-item
                  v-for="data in newsData"
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

      </div>
    </div>
    <news-action
      v-if="newsId !== 0"
      :newsDialog="newsDialog"
      @newsId="newsId = 0"
      :newsId="newsId"
      @closeModal="newsDialog = false"
    ></news-action>
  
</template>

<script setup>
  import store from "../../../store";
  import newsAction from "./actions/newsAction.vue";
  import { ref, computed } from "vue";

  let newsDialog = ref(false);
  let newsId = ref(0);
  store.dispatch("news/getNews");

  function showModal(id) {
    newsId.value = id;
    newsDialog.value = true;
  }

  const newsData = computed(() => store.state.news.news.data);
  const newsLoading = computed(() => store.state.event.event.loading);

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

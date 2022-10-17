<template>
  <section class="md:h-full flex items-center text-gray-600">
    <div class="px-5 py-5 mx-auto">
      <div class="text-center mb-12">
        <h5 class="text-base md:text-lg text-blue-500 mb-1">See Our Latest News</h5>
        <p
          class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-black sm:text-4xl text-center"
        >
          News
        </p>
        <div class="flex flex-wrap m-4">
          <div v-for="data in newsData" :key="data.id" class="p-4 sm:w-1/2 lg:w-1/3">
            <div
              class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition duration-500 hover:scale-110 hover:cursor-pointer"
            >
              <img
                :src="data.image"
                :alt="data.title"
                class="lg:h-42 md:h-48 w-full object-cover object-center"
              />
              <div class="p-6">
                <h2 class="text-base font-medium text-indigo-300 mb-1"></h2>
                <h1 class="text-2xl text-black font-semibold mb-3">{{ data.title }}</h1>
                <p class="text-black font-bold leading-relaxed mb-3">
                  {{ data.description }}
                </p>
                <div class="flex items-center flex-wrap">
                  <a
                    @click="showModal(data.id)"
                    class="text-indigo-500 cursor-pointer inline-flex items-center md:mb-2 lg:mb-0"
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
                  <span
                    class="text-blue-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
                  >
                    {{ data.type }}
                  </span>
                </div>
              </div>
            </div>
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
  </section>
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
</script>

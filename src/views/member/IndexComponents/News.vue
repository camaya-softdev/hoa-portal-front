<template>
  <!-- <section class="md:h-full flex items-center text-gray-600"> -->

  <div class="mx-auto mt-5 main-div text-center">
    <div class="text-center mb-12">
      <!-- <h5 class="text-base md:text-lg text-blue-500 mb-1">See Our Latest News</h5> -->
      <!-- <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-black sm:text-4xl text-center">
          News
        </p> -->
      <!-- desktop view-->
   

      <!--laptop view-->
      <div class="xl:block hidden">
        <div class="title_div font-semibold mb-5">
          <div class="div1">
            <div class="flex-item">
              <h2 class="subtitle">MENARA POINT SOUTH UPDATES</h2>
            </div>
            <div class="image">

          
              <img class="floating_image"
                src="https://lp-cms-production.imgix.net/2021-02/Saud_Beach_G.jpg?auto=format&q=75&w=1920"
              />
              <img class="corner_image"
              src="http://www.gravatar.com/avatar/"
            />
            </div>
          </div>
        </div>

        <div class="div2">
          <div class="flex-item">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, quia!
              Veniam facere ullam distinctio molestias praesentium harum facilis sint
              cumque, recusandae modi voluptatum vitae iste tempore id fugit, dolorum
              nostrum!
            </p>
            <button
              class="mt-3 group inline-flex items-center justify-center rounded-full py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#613A24] text-white hover:bg-white hover:text-yellow-700 active:bg-white active:text-yellow-900 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105 shadow-xl shadow-slate-900/10"
            >
              <span class="mr-2">Learn More</span>
            </button>
          </div>
        </div>
      </div>

      <!-- desktop view -->
      <!-- grid -->
      <!-- <div class="md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-4 hidden md:block m-4">
          <div v-for="data in newsData" :key="data.id" class="my-4">
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
        </div> -->

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
      <div class="xl:hidden">
        <div class="title_divider font-semibold">
          <div class="subtitle">LATEST NEWS</div>
        </div>
        <el-carousel
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
.title_div {
  background-color: #f5f5f5;
  padding: 5px;
}
.main-div {
  background-color: #ffcf00;
}
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

.news-container {
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  width: 100%;
}

.flex-item {
  margin-top: 20px;
  margin-left: 650px;
  flex-basis: 10px;
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

.div1 {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-content: space-between;
  text-decoration: underline;
  text-decoration-color: #754924;
  position: relative;
  z-index: 5;
  flex-wrap: wrap;
  color: #333;
}

.div2 {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-content: space-between;
  height: 400px;
  flex-wrap: wrap;
  color: #333;
}

@media screen and (min-width: 1920px) {
  .div2 p{
    margin-left: 10rem;
  }
  .div1 .flex-item h2{
    margin-left: 10rem;
  }
}

@media screen and (min-width: 1620px) {
  .div2 p{
    margin-left: 10rem;
  }
  .div1 .flex-item h2{
    margin-left: 10rem;
  }
}
.image {
  position: absolute;
  bottom: 20%; /* 2/3=66.6 */
  z-index: 4;
  left: 10%;
  width: 30%;
  height: 30%;
  background: green;
}

.floating_image { position: relative; } 
.corner_image { position: absolute; top: 0; left: 0; } 
</style>

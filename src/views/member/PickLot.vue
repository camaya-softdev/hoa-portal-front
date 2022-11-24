<template>
  <div
    v-if="lotDataLoading"
    v-loading.fullscreen.lock="lotDataLoading"
    element-loading-text="Fetching Data..."
  ></div>
  <div v-else class="grid grid-cols-3">
    <div
      v-for="data in lotData"
      :key="data.id"
      class="flex flex-col justify-center items-center h-screen"
    >
      <img :src="data.subdivision_image" class="object-scale-down h-60 mb-16" />
      <p>
        Block {{ data.lot_block }} Lot {{ data.lot_number }}
        {{ data.subdivision_name }}
      </p>
      <div class="mt-3">
        <a
          type="button"
          class="group cursor-pointer inline-flex items-center justify-center rounded-full py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-yellow-700 hover:bg-yellow-700 hover:text-white active:bg-white active:text-yellow-900 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105 shadow-xl shadow-slate-900/10"
          @click="handleSubmit(data.lot_id)"
        >
          <span class="mr-2">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </a>
      </div>
    </div>
    <!-- <div class="flex flex-col justify-center items-center h-screen">
      <img src="/logo/hoa-logo.webp" class="object-scale-down h-60 mb-16" />
    </div>
    <div class="flex flex-col justify-center items-center h-screen">
      <img src="/logo/camayacoast.webp" class="object-scale-down h-60 mb-16" />
    </div> -->
  </div>
</template>
<script setup>
import store from "../../store";
import { computed } from "vue";
import { useRouter } from "vue-router";

store.dispatch("pickLot/getLots");
const lotData = computed(() => store.state.pickLot.lots.data);
const lotDataLoading = computed(() => store.state.pickLot.lots.loading);
const router = useRouter();

async function handleSubmit(id) {
  const res = await store.dispatch("pickLot/editLots", id);
  if (res.status === 200) {
    if (parseInt(store.state.auth.user.hoa_member_registered) !== 1) {
      store.commit("alert/notify", {
        title: "ATTENTION",
        type: "warning",
        message: "Complete all fields in profile first before you proceed",
      });
      router.push({
        name: "Profile",
      });
    }else{
      window.location.href = "/"
        // router.push({name:'Home'});
    }
  }
}
</script>

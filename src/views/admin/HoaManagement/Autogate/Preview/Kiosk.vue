<template>
  <div :style='{
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",

  }'

  
  >
    <div class="flex flex-col  justify-center items-center h-screen">
      <!-- <div class="grid grid-col-auto"> -->
      <img
        :src="logo ? logo : `/logo/camayacoast.webp`"
        alt="logo"
        className="object-scale-down h-60 mb-16"
      />
      <div class="text-center">
        <slot name="preview"></slot>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import store from "../../../../../store";

const props = defineProps<{
  backgroundImage: String;
  logo:String; 
}>();
</script>

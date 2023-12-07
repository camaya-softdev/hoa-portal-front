<script setup>
import Footer from "./components/Footer.vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<style>
  body {
    /* background-image: url("/background-image1.webp"); */
    /* background-image: url("/camaya-bg-new.jpg"); */
  /*  background-color: whitesmoke;
      background-repeat: no-repeat; */
    /* background-attachment: fixed; */
  /*  background-size: cover; */
    /* backdrop-filter: blur(2.5px); */
  }
  .member-header{
    background-color: #FFCF00;
  }
  .el-table {
    opacity: 0.8;
  }

</style>

<template>
  <div class="min-h-screen">
    <router-view></router-view>
  </div>
</template>

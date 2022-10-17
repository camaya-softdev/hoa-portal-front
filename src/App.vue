<script setup>
import Footer from "./components/Footer.vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>
<style>
body {
  background-image: url("/background-image1.webp");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.el-table {
  opacity: 0.8;
}
</style>

<template>
  <div class="min-h-screen">
    <router-view></router-view>
    <Footer />
  </div>
</template>

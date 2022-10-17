<template>
  <div class="footerWrap top-[100vh]">
    <div class="footer">
      <div
        class="mx-auto py-6 sm:px-6 lg:px-8 footerContent bg-white opacity-80"
        style="backdrop-filter: blur(5px)"
      >
        <p class="text-gray-700 font-bold">
          &copy; {{ new Date().getFullYear() }} Camaya Coast All rights reserved
        </p>
        <p classs="text-white font-bold text-center">System Version: v1.0.0</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.footerWrap {
  width: 100%;
  position: sticky;
  bottom: 0px;
}
.footer {
  width: 100%;
  margin: auto;
}
.footerContent {
  float: left;
  color: #374151;
  width: 100%;

  padding: 20px 0;
}
.footer p {
  float: left;
  width: 100%;
  text-align: center;
}
</style>

<template>
  <div class="footerWrap top-[100vh]">
    <div class="footer">
      <div class="mx-auto py-6 sm:px-6 lg:px-8 footerContent">
        <p class="text-gray-700 text-xs">
          &copy; {{ new Date().getFullYear() }} Camaya Coast All rights reserved
          <br/><small classs="text-xs" style="text-transform: uppercase;">System Version: v1.0.0</small>
        </p>
       <p> <router-link :to="{name:'Disclaimer'}">Disclaimer</router-link></p>
       <p> <router-link :to="{name:'PrivacyPolicy'}">Privacy Policy</router-link></p>
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

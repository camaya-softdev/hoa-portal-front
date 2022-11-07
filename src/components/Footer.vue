<template>
  <div class="footerWrap top-[100vh] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="footer">

      <!-- desktop view -->
      <div class="footerContent mx-auto flex items-center justify-between h-16 text-gray-700 text-xs">
        <div class="hidden md:block">
          &copy; {{ new Date().getFullYear() }} Camaya Coast All rights reserved
          <br/><small classs="text-xs" style="text-transform: uppercase;">System Version: v1.0.0</small>
        </div>
        <div class="hidden md:block">
          <router-link :to="{name:'Disclaimer'}"><u>Disclaimer</u></router-link>
          <router-link :to="{name:'PrivacyPolicy'}" class="ml-4"><u>Privacy Policy</u></router-link>
        </div>
      </div>

      <!-- mobile view -->
      <div class="footerContent text-gray-700 text-xs text-center">
        <div class="md:hidden">
          <router-link :to="{name:'Disclaimer'}"><u>Disclaimer</u></router-link>
          <router-link :to="{name:'PrivacyPolicy'}" class="ml-4"><u>Privacy Policy</u></router-link>
        </div>
        <div class="md:hidden my-4">
          &copy; {{ new Date().getFullYear() }} Camaya Coast All rights reserved
          <br/><small classs="text-xs" style="text-transform: uppercase;">System Version: v1.0.0</small>
        </div>
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

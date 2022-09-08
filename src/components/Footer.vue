<template>
  <div class="footerWrap">
    <div class="footer">
      <div class="footerContent">
        <p>&copy; {{ new Date().getFullYear() }} Camaya Coast All rights reserved</p>
        <p classs="text-center">System Version: v1.0.0</p>
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
  width: 400px;
  margin: auto;
}
.footerContent {
  float: left;
  color: gray;
  width: 100%;
  /* background-color:#555; */
  padding: 20px 0;
}
.footer p {
  float: left;
  width: 100%;
  text-align: center;
}
</style>

<template>
  <el-dialog
    v-model="warningZone"
    title="Warning"
    width="50%"
    custom-class="border-2 border-gray-600"
    center
  >
    <div class="text-center">
      <h3>
        You have been idle for 10 minutes. Your session will now end.
        {{ warningCountdownMessage }}
      </h3>
      <button
        class="mt-6 rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-yellow-600 text-white hover:bg-yellow-600 hover:text-white active:bg-yellow-600 active:text-slate-300 focus-visible:outline-slate-900 transform transition duration-500 hover:scale-105"
      >
        <span>Continue Session</span>
      </button>
    </div>
  </el-dialog>
</template>
<script>
import store from "../store";
export default {
  name: "Auto Logout",
  data: function () {
    return {
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      warningTimer: null,
      logoutTimer: null,
      warningZone: false,
      warningCountdown: 10 * 60,
      logoutCountdown: 10 * 60 + 10,
      warningCountdownMessage: 10 * 60 + 10,
    };
  },
  mounted() {
    this.events.forEach(function (event) {
      window.addEventListener(event, this.resetTimer);
    }, this);
    this.setTimers();
    this.warningCountdownTimer();
  },
  destroyed() {
    this.events.forEach(function (event) {
      window.removeEventListener(event, this.resetTimer);
    }, this);
    this.resetTimer();
  },
  methods: {
    setTimers: function () {
      this.warningTimer = setTimeout(this.warningMessage, this.warningCountdown * 1000);
      this.logoutTimer = setTimeout(this.logoutUser, this.logoutCountdown * 1000);
      this.warningZone = false;
    },
    warningCountdownTimer: function () {
      if (this.warningCountdownMessage > 0) {
        setTimeout(() => {
          this.warningCountdownMessage -= 1;
          this.warningCountdownTimer();
        }, 1000);
      }
    },
    warningMessage: function () {
      this.warningZone = true;
    },
    logoutUser: function () {
      store.dispatch("auth/logout").then(() => {
        this.$router.push({
          name: "Login",
        });
      });
    },
    resetTimer: function () {
      clearTimeout(this.warningTimer);
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },
  },
};
</script>

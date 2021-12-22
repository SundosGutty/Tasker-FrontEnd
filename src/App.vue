<template>
  <section :class="[hideNav ? '' : 'flex']" class="main-app">
    <main-nav v-if="!hideNav" :user="loggedinUser" />
    <router-view />
    <div class="cover" v-if="isTaskDetailsHover"></div>
  </section>
</template>

<script>
import mainNav from "@/cmps/main-nav.vue";
import { socketService } from "@/services/socket.service.js";

export default {
  components: {
    mainNav,
  },
  props: [],
  data() {
    return {
      hideNav: null,
      isTaskDetails: null,
    };
  },
  created() {
    const { name } = this.$route;
    if (name === "landing-page" || name === "login") {
      this.hideNav = true;
    }

    this.$store.commit({ type: "setLoggedinUser" });

    if (this.loggedinUser)
      socketService.emit("user-watch", this.loggedinUser._id);
    socketService.on("");
  },
  methods: {
    detailsHover(isHovered) {
      this.isTaskDetailsHover = isHovered;
    },
  },
  computed: {
    isTaskDetailsHover() {
      return this.$store.getters.taskHover;
    },
    loggedinUser() {
      const user = this.$store.getters.loggedinUser;
      return user;
    },
  },
  destroyed() {},
  watch: {
    $route: function (newVal, OldVal) {
      const { name } = newVal;
      if (name === "landing-page" || name === "login") {
        this.hideNav = true;
      } else {
        this.hideNav = false;
      }
    },
  },
};
</script>

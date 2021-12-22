<template>
  <section class="main-nav">
    <nav class="sub-nav-top">
      <router-link to="/home/" title="/Home/">
        <img class="logo-img" :src="require(`@/pics/logo-task.png`)" />
      </router-link>
      <router-link to="/board/" title="Workspace"
        ><span class="icon-workspace"></span
      ></router-link>
      <router-link to="/home/" title="notification" class="far fa-bell" />
      <router-link to="/home/" title="calender" class="far fa-calendar-check" />
    </nav>

    <div class="side-msg">
      <span v-if="user"
        ><a class="icon-two-stars"></a>Hello {{ user.fullname }}</span
      >
      <span v-else><i class="icon-two-stars"></i>Hello Guest</span>
    </div>

    <nav class="sub-nav-bottom">
      <router-link to="/home/" class="fas fa-puzzle-piece" />
      <router-link to="/home/" class="icon-add-user" />
      <router-link to="/home/" class="icon-search" />
      <a class="fas fa-sign-out-alt" @click="logout"></a>
      <!-- <router-link to="/home/" class="icon-user" /> -->
      <section v-if="user">
        <section v-if="!user.imgUrl"><span class="icon-user"></span></section>
        <img
          class="user-img"
          v-if="user.imgUrl"
          :src="require(`@/pics/${user.imgUrl}`)"
        />
      </section>
      <section v-else>
        <span class="icon-user"></span>
      </section>
    </nav>
  </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  components: { Avatar },

  components: {},
  props: ["user"],
  data() {
    return {};
  },
  created() {},
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
  computed: {},
  destroyed() {},
};
</script>
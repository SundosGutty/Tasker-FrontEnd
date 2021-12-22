<template>
  <div class="home">
    <div class="welcome-msg">
    <h1>Tasker</h1>
    <h1>Welcome to your Workspace</h1>
    </div>
     <img class="home-img" :src="require(`@/pics/team-work.png`)" />
  </div>
</template>

<script>
export default {
  components: {},
  props: ["user"],
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  destroyed() {},
};
</script>

<template>
    <section class="workspace-container dashboard-container flex">
    <pop-up-nav
      class="pop-up-nav"
      :board="currBoard"
      :allBoards="allBoards"
      :user="loggedinUser"
    ></pop-up-nav>
  <section class="workspace dashboard">
    <header>
      <div>
        Dashboard
      </div>
    </header>
    <section class="charts-container">
      <div class="flex">
      <doughnut-chart :labelsDate="statusLabelDate" :countsDate="statusCountsDate" class="chart"/>
      <doughnut-chart class="chart"/>
      <doughnut-chart class="chart"/>
      </div>
    </section>
    </section>
    </section>
</template>

<script>
import popUpNav from "@/cmps/pop-up-nav.vue";
import doughnutChart from "@/cmps/charts/doughnut-chart.vue";

export default {
  components: {
    popUpNav,doughnutChart,
  },
  props: [],

  data() {
    return {
    };
  },
  created() {},
  methods: {},
   computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
    loggedinUser() {
      this.user = this.$store.getters.loggedinUser;
      return this.user;
    },
    allBoards() {
      return this.$store.getters.allBoards;
    },
    allUsers() {
      return this.$store.getters.getUsers;
    },
    statusLabelDate(){
        return ['Done','Work','Stuck']
    },
    statusCountsDate(){
          return [3,5,6]
    }
  },
  destroyed() {},
};
</script>


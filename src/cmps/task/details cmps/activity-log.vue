<template>
  <div class="activity-log">
    <div class="actions flex">
      <p>Other activities</p>
      <div>
          <button>integration activity</button>
          <button>automation activity</button>
      </div>
    </div>
    <div class="log-header flex">
      <div class="filter-btn flex">
        <button>filter log<i class="fas fa-chevron-down"></i></button>
        <span class="flex"
          ><i class="fas fa-user-circle"></i>
          <p>preson</p></span
        >
      </div>

      <div class="export-sync flex">
        <i class="fas fa-sync-alt"></i>
        <i class="far fa-file-excel"></i>
      </div>
    </div>
    <ul>
      <li v-for="(activity, idx) in activities" :key="idx">
        <div class="activity-item">
          <div class="log-time">
            <i class="far fa-clock"><span>19h</span></i>
          </div>
          <img
            class="user-img"
            :src="require(`@/pics/${activity.byMember.imgUrl}`)"
          />
          <p>{{ activity.task.title }}</p>
          <div class="type">
            <i :class="getType(activity.type)"></i>
            <span> {{ activity.type }}</span>
          </div>
          <div class="tag-container flex" v-if="activity.type === 'status'">
            <div class="log-tag log-stuck">stuck</div>
            <span><i class="fas fa-chevron-right"></i></span>
            <div class="log-tag log-done">done</div>
          </div>
          <div class="name-container flex" v-if="activity.type === 'name'">
            <div>old title</div>
            <span><i class="fas fa-chevron-right"></i></span>
            <div>new title</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "activity-log",
  props:["task","taskInfo","currBoard",],
  data() {
    return {
      typeIcon: null,
    };
  },
  methods: {
    getType(val) {
      switch (val) {
        case "status":
          return "fas fa-bars";
        case "name":
          return "fas fa-text-height";
        case "member":
          return "far fa-user-circle";
      }
    },
  },
  computed: {
    activities() {
      return this.$store.getters.currBoard.activities;
    },
  },
};
</script>
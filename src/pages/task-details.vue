<template>
  <div
    v-if="task"
    class="task-details"
    @mouseover.self="pageHover(true)"
    @mouseleave="pageHover(false)"
  >
    <i class="fa fa-times" @click="exitModal"></i>
    <div class="details-title flex">
      <input
        placeholder="title"
        v-model="task.title"
        @change="editTask(task)"
        @keyup.enter="editTask(task)"
        @click="isEditMode = true"
        @blur="isEditMode = false"
      />

      <section v-if="!loggedInUser.imgUrl">
        <span class="icon-user"></span>
      </section>
      <avatar
        v-else
        :size="40"
        :src="
          loggedInUser.imgUrl ? require(`@/pics/${loggedInUser.imgUrl}`) : null
        "
      />
      <i class="fas fa-plus-circle"></i>
    </div>
    <div class="log-menu flex">
      <div class="nav-btn flex">
        <button
          class="flex"
          :class="{ underline: component === 'task-updates' }"
          @click="component = 'task-updates'"
          @mouseover="btnHover(true, 'updates')"
          @mouseleave="btnHover(false, null)"
        >
          updates
          <btn-dropdown
            class="dropdown-btn"
            v-if="isBtnHover && hoveredBtn === 'updates'"
          />
        </button>
        <button
          class="flex"
          :class="{ underline: component === 'activity-log' }"
          @click="component = 'activity-log'"
          @mouseover="btnHover(true, 'log')"
          @mouseleave="btnHover(false, null)"
        >
          activity log<btn-dropdown v-if="isBtnHover && hoveredBtn === 'log'" />
        </button>
      </div>
    </div>
    <hr />
    <template>
      <component
        :is="component"
        :taskInfo="taskInfo"
        :task="task"
        :currBoard="currBoard"
        :users="allUsers"
        :loggedInUser="loggedInUser"
        class="cmp-container"
        @editTask="editTask"
      ></component>
    </template>
  </div>
</template>

<script>
import { remoteBoardService } from "@/services/board.service-remote.js";
import taskUpdates from "@/cmps/task/details cmps/task-updates.vue";
import activityLog from "@/cmps/task/details cmps/activity-log.vue";
import btnDropdown from "@/cmps/task/details cmps/btn-dropdown.vue";
import VueDragResize from "vue-drag-resize";
import Avatar from "vue-avatar";

export default {
  name: "task-details",
  components: {
    taskUpdates,
    activityLog,
    btnDropdown,
    VueDragResize,
    Avatar,
  },
  data() {
    return {
      task: null,
      taskInfo: null,
      component: "task-updates",
      isBtnHover: false,
      hoveredBtn: null,
      isEditMode: false,
    };
  },

  async created() {
    try {

      this.$store.commit({ type: "setLoggedinUser" });
      this.getTask();

      const boardIdx = this.$store.getters.currBoardIdx;
      const taskInfo = await remoteBoardService.getTaskRouteIdx(this.task, boardIdx);

      console.log(taskInfo);
      this.taskInfo = taskInfo;
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    exitModal() {
      this.pageHover(false);
      this.$router.push("/board");
    },

    btnHover(isHovered, val) {
      this.isBtnHover = isHovered;
      this.hoveredBtn = val;
    },

    pageHover(isHover) {
      this.$store.commit({ type: "hover", isHover });
    },
    setTask(task) {
      this.task = task;
    },
    async editTask(task) {
      try {
        const boardIdx = this.$store.getters.currBoardIdx;
        const taskInfo = await remoteBoardService.getTaskRouteIdx(
          task,
          boardIdx
        );
        this.$store.dispatch({ type: "editTask", taskInfo });
        this.isEditMode = false;
      } catch (err) {
        console.log(err);
      }
    },

    async getTask() {
      try {
        const { taskId } = this.$route.params;
        const task = await this.$store.dispatch({
          type: "getTaskById",
          taskId,
        });
        this.task = task;

      } catch (err) {
        console.log(err);
      }
    },
  },

  computed: {
    allUsers() {
      return this.$store.getters.getUsers;
    },
    loggedInUser() {
      if (!this.$store.getters.loggedinUser) return "Guest";
      return this.$store.getters.loggedinUser;
    },

    currBoard() {
      return this.$store.getters.currBoard;
    },
  },

  watch: {
    $route: function () {
      this.getTask();
    },

    currBoard: function () {
      this.getTask();
    },
  },
};
</script>
<template>
  <section class="task-container">
    <template v-for="(cmpType, idx) in cmpsOrder">
      <component
        @updated="updateTask(cmpType, $event)"
        :is="cmpType"
        :info="getCmpInfo(cmpType)"
        :key="idx"
        :markerColor="markerColor"
      />
    </template>
  </section>
</template>

<script>
import titlePicker from "./title-picker.vue";
import statusPicker from "./status-picker.vue";
import memberPicker from "./member-picker.vue";
import timelinePicker from "./timeline-picker.vue";
import priorityPicker from "./priority-picker.vue";

export default {
  name: "task-preview",
  data() {
    return {
      cmpsOrder: [
        "title-picker",
        "status-picker",
        "priority-picker",
        "member-picker",
        "timeline-picker",
      ],
    };
  },
  components: {
    statusPicker,
    memberPicker,
    titlePicker,
    timelinePicker,
    priorityPicker,
  },
  methods: {
    getCmpInfo(cmpType) {
      const currentTask = this.currTask;
      switch (cmpType) {
        case "title-picker":
          return { taskId: currentTask.id, title: currentTask.title };
        case "member-picker":
          return {
            members: currentTask.members,
            boardMembers: this.boardMembers,
          };
        case "status-picker":
          return { status: currentTask.status };
        case "timeline-picker":
          return {
            timeline: currentTask.timeline,
            markerColor: this.markerColor,
          };
        case "priority-picker":
          return { priority: currentTask.priority };
      }
    },

    updateTask(cmpType, ev) {
      var task = JSON.parse(JSON.stringify(this.currentTask));
      switch (cmpType) {
        case "title-picker":
          task.title = ev.title;
          break;
        case "member-picker":
          task.members = ev.members;
          break;
        case "status-picker":
          task.status = ev.status;
          break;
        case "timeline-picker":
          task.timeline = ev.timeline;
          break;
        case "priority-picker":
          task.priority = ev.priority;
          break;
      }

      const taskInfo = {
        task,
        groupIdx: this.groupIdx,
        taskIdx: this.taskIdx,
        activity: ev.activity,
      };

      this.$store.dispatch({
        type: "editTask",
        taskInfo,
      });
    },
  },
};
</script>

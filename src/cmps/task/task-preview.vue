<template>
   
  <section class="task-container color-marker-after flex align-center" v-if="currentTask">
    <task-dropdown
      @removeTask="removeTask"
      @openTaskDetails="openTaskDetails"
      @duplicateTask="duplicateTask"
      @sortBy="sortBy"
    />
    <section
      class="task-preview flex align-center"
    >
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
  </section>
</template>

<script>
import titlePicker from "./title-picker.vue";
import statusPicker from "./status-picker.vue";
import memberPicker from "./member-picker.vue";
import timelinePicker from "./timeline-picker.vue";
import priorityPicker from "./priority-picker.vue";
import taskDropdown from "../task-dropdown.vue";

export default {
  name: "task-preview",
 components: {
    statusPicker,
    memberPicker,
    titlePicker,
    timelinePicker,
    priorityPicker,
    taskDropdown,
  },
  props: [
    "currentTask",
    "taskIdx",
    "groupIdx",
    "cmpsOrder",
    "markerColor",
    "boardMembers",
    "markerColor"
  ],
 
  methods: {
    async removeTask() {
      try {
        this.$store.dispatch({
          type: "removeTask",
          taskInfo: {
            task: this.currTask,
            taskIdx: this.taskIdx,
            groupIdx: this.groupIdx,
          },
        });
      } catch (err) {
        console.log("Error", err);
      }
    },
    sortBy(sortBy) {
      this.$emit("sortBy", sortBy);
    },
    openTaskDetails() {
      this.$router.push(`/board/task/${this.currTask.id}`);
    },
    duplicateTask() {
      let taskCopy = JSON.parse(JSON.stringify(this.currTask));
      taskCopy.isCopy = true;
      this.$store.dispatch({
        type: "editTask",
        taskInfo: {
          task: taskCopy,
          groupIdx: this.groupIdx,
          taskIdx: this.taskIdx,
        },
      });
    },
    getCmpInfo(cmpType) {
      const currentTask =this.currTask
      switch (cmpType) {
        case "title-picker":
          return { taskId: currentTask.id, title: currentTask.title , marker:this.marker, members:currentTask.members, seenBy:currentTask.seenBy};
        case "member-picker":
          return { members: currentTask.members, boardMembers: this.boardMembers  };
        case "status-picker":
          return { status: currentTask.status };
        case "timeline-picker":
          return { timeline: currentTask.timeline, markerColor: this.markerColor };
        case "priority-picker":
          return { priority: currentTask.priority};
      }
    },
    updateTask(cmpType, ev) {
      var task = JSON.parse(JSON.stringify(this.currentTask)) 

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
  computed: {
    marker() {
      if (!this.markerColor) return `8px solid #579BFC`;
      return `8px solid ${this.markerColor}`;
    },
    currTask(){
      return this.currentTask
    }

  },
  watch:{
    
  },
  destroyed() {},
};
</script>

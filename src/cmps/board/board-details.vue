<template>
  <section class="board-container" v-if="board">
    <Container
      orientation="vertical"
      lock-axis="y"
      @drop="onColumnDrop($event)"
      drag-handle-selector=".group-drag-handle"
      :drop-placeholder="dropPlaceholderOptions"
    >
      <Draggable
        v-for="(group, groupIdx) in currGroups"
        :key="groupIdx"
        style="
           {
            overflow: visible;
          }
        "
      >
        <board-group
          v-if="group && group.tasks"
          :group="group"
          :user="loggedinUser"
          :board="board"
          :groupIdx="groupIdx"
          :isGroupShown="isGroupShown"
          @isShowGroups="isShowGroups"
          @addTask="addTask"
          @removeGroup="removeGroup"
          @editGroup="editGroup"
          @addNewGroup="addNewGroup"
        />
      </Draggable>
    </Container>
  </section>
</template>

<script>
import boardGroup from "@/cmps/group/board-group.vue";
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "@/services/dnd.util.js";
import { socketService } from "@/services/socket.service.js";
import { utilService } from "@/services/util.service.js";

export default {
  name: "main-board",
  components: {
    boardGroup,
    Container,
    Draggable,
  },
  props: ["board", "user"],

  data() {
    return {
      isGroupShown: true,
      groups: null,
      openModal: false,
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: false,
      },
    };
  },
  created() {
    this.isShowGroups(true);
    socketService.emit("watch board", this.board._id);
  },
  mounted() {
    socketService.on("board updated", this.updateBoard);
  },
  methods: {
    updateBoard(board) {
      this.$emit("updateBoard", board);
    },

    addTask(taskInfo) {
      this.$emit("addTask", taskInfo);
    },

    editGroup(groupInfo) {
      this.$emit("editGroup", groupInfo);
    },

    removeGroup(groupInfo) {
      this.$emit("removeGroup", groupInfo);
    },

    isShowGroups(val) {
      this.isGroupShown = val;
    },

    addNewGroup(groupInfo) {
      if (groupInfo) {
        const { group } = groupInfo;
        delete group.id;
        group.id = utilService.makeId();
        group.tasks.forEach((task) => (task.id = utilService.makeId()));
      }
      // console.log(groupInfo);
      this.$emit("addNewGroup", groupInfo);
    },

    async onColumnDrop(dropResult) {
      try {
        const currBoard = Object.assign({}, this.board);
        currBoard.groups = applyDrag(currBoard.groups, dropResult);
        // console.log("board-details");
        await this.$store.dispatch({
          type: "saveBoard",
          board: currBoard,
        });
      } catch (err) {
        console.log("Error", err);
      }
    },
  },
  computed: {
    currGroups() {
      return this.board.groups;
    },
    loggedinUser() {
      const user = this.$store.getters.loggedinUser;
      return user;
    },
  },
  destroyed() {},
};
</script>
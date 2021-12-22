<template>
  <section
    :style="{ 'border-left': this.info.marker }"
    v-if="info"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="title-picker flex"
    @click.prevent.stop="openDetails"
  >
    <div>
      <span v-if="!isEditMode">{{ currTitle }}</span>
      <input
        v-on:keyup.enter="editMode"
        @blur="
          {
            isEditMode = false;
          }
        "
        @change="onchange"
        v-else
        v-model="currTitle"
      />
      <button
        v-if="hover && !isEditMode"
        @click.stop.prevent="editMode"
        class="btn-edit"
      >
        Edit
      </button>
    </div>
    <button class="comment-bubble">
      <a class="icon-comment" :class="{ unseen: (isSeen = false) }"></a>
    </button>
  </section>
</template>

<script>
export default {
  components: {},
  props: ["info"],
  data() {
    return {
      hover: false,
      isEditMode: false,
      currTitle: null,
      prevTitle: null,
      activity: null,
      debounce: null,
      isSeen: null,
      user: null,
    };
  },
  created() {
    this.getInfo();
    this.seenTask();
  },
  methods: {
    openDetails() {
      if (this.isEditMode) return;
      const info = this.currInfo;
      if (!info) return;
      this.info.seenBy.push(this.loggedinUser);
      this.$router.push(`/board/task/${info.taskId}`).catch(() => {});
    },
    editMode(val) {
      this.isEditMode = !this.isEditMode;
    },
    onchange() {
      clearTimeout(this.debounce);
      this.prevTitle = this.currTitle;
      this.debounce = setTimeout(() => {
        this;
        this.update();
      }, 800);
    },
    update() {
      this.prevTitle = this.currTitle;
      const updateInfo = {
        title: this.currTitle,
        activity: this.activity,
      };
      this.$emit("updated", updateInfo);
    },
    getInfo() {
      const task = this.currInfo;
      this.currTitle = task.title;
      this.prevTitle = task.title;
    },
    seenTask() {
      const { seenBy, members } = this.info;
      let isSeenTask = seenBy.some(
        (member) => member._id === this.loggedinUser._id
      );

      let isTaskMember = null;
      if (!members || !members.length) isTaskMember = false;
      else {
        isTaskMember = members.some(
          (member) => member._id === this.loggedinUser._id
        );
      }
      
      if (this.loggedinUser) {
      }
    },
  },
  computed: {
    currInfo() {
      return this.info;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  watch: {
    currTitle: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.activity = { type: "title", newVal, oldVal: this.prevTitle };
      }
    },
  },
};
</script>
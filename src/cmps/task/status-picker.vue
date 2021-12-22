<template>
  <section class="status-picker" v-if="info">
    <div
      @click="isEditMode = true"
      v-if="!isEditMode"
      class="status-picker empty"
      :class="statusStyle"
      placeholder=""
    >
      {{ status }}
      <img v-if="showDoneGif" />
    </div>
    <ul v-if="isEditMode" class="status-modal">
      <li @click="editStatus('Done')" class="done-bg">Done</li>
      <li @click="editStatus('Work')" class="work-bg">Working on it</li>
      <li @click="editStatus('Hold')" class="hold-bg">On Hold</li>
      <li @click="editStatus('Stuck')" class="stuck-bg">Stuck</li>
      <li @click="editStatus('Empty')" class="empty-bg">Empty</li>
      <hr />
      <li @click="editStatus('New status')" class="new-status-bg">
        + New status
      </li>
    </ul>
    <section
      class="cover-screen"
      v-if="isEditMode"
      @click.stop.prevent="closeModal"
    ></section>
  </section>
</template>

<script>
export default {
  name: "status-picker",
  components: {},
  props: ["info"],
  data() {
    return {
      isEditMode: false,
      showDoneGif: false,
      status: this.info.status,
      statusStyle: this.BGstyle,
      activity: null,
      exitModal: null,
    };
  },
  created() {
    this.statusStyle = this.info.status ? this.info.status.toLowerCase() : null;
  },
  methods: {
    editStatus(status) {
      if (status !== "New status") {
        this.status = status;
        this.statusStyle = status.toLowerCase();
      }
      if (status === "Done") {
        this.showDoneGif = true;
        setTimeout(() => {
          this.showDoneGif = false;
        }, 3000);
      }
      this.isEditMode = !this.isEditMode;
    },

    closeModal() {
      this.isEditMode = false;
    },

    update() {
      const updateInfo = {
        status: this.status,
        activity: this.activity,
      };
      this.$emit("updated", updateInfo);
    },
  },
  computed: {
    BGstyle() {
      return this.info.status ? this.info.status.toLowerCase() : null;
    },
  },
  watch: {
    status: function (newVal, oldVal) {
      this.activity = { type: "status", newVal, oldVal };
      this.update();
    },
    info: {
      handler: function (newVal) {
        if (newVal && newVal.status) {
          this.status = newVal.status;
          this.statusStyle = newVal.status.toLowerCase();
        }
      },
    },
  },
};
</script>
<template>
  <section @click="editStatus" class="member-picker" v-if="info">
    <section>
      <section v-if="!selectedMembers"><span class="icon-user"></span></section>
      <avatar
        v-else
        v-for="member in selectedMembers"
        :size="25"
        :username="member.fullname"
        :src="member.imgUrl ? require(`@/pics/${member.imgUrl}`) : null"
        :key="member._id"
      />
    </section>
    <section v-show="isEditMode" class="member-modal">
      <section class="selected-members">
        <div v-for="member in selectedMembers" :key="member._id">
          <avatar
            :size="22"
            :username="member.fullname"
            :src="member.imgUrl ? require(`@/pics/${member.imgUrl}`) : null"
            :key="member._id"
          ></avatar>
          {{ member.fullname }}
          <button @click.prevent.stop="removeMember(member)">x</button>
        </div>
      </section>
      <br />
      <hr />
      <ul>
        <li
          v-for="(member, idx) in membersToShow"
          :key="idx"
          :value="member"
          @click.prevent.stop="addMember(member)"
          class="flex justify-center align-center"
        >
          <div class="member-picker-selected"> 
            <avatar
              v-if="member.imgUrl"
              :size="20"
              :username="member.fullname"
              :src="require(`@/pics/${member.imgUrl}`)"
              :key="member._id"
            ></avatar>
          </div>
          <div>{{ member.fullname }}</div>
        </li>
      </ul>
    </section>
    <section
      class="cover-screen"
      v-if="isEditMode"
      @click.stop.prevent="closeScreen"
    ></section>
  </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  components: { Avatar },
  props: ["info"],
  data() {
    return {
      isEditMode: false,
      selectedMembers: null,
      activity: null,
    };
  },
  created() {
    if (this.info.members) {
      if (!this.info.members.length) {
        this.selectedMembers = null;
      } else {
        this.selectedMembers = this.info.members;
      }
    }
  },
  methods: {
    update() {
      const updateInfo = {
        members: this.selectedMembers,
        activity: this.activity,
      };
      this.$emit("updated", updateInfo);
    },
    editStatus() {
      this.isEditMode = !this.isEditMode;
    },

    addMember(member) {
      if (!this.selectedMembers) this.selectedMembers = [];
      // const idx = this.selectedMembers.length;
      this.selectedMembers.push(member);
      this.update();
      this.isEditMode = false;
    },

    removeMember(member) {
      const idx = this.selectedMembers.indexOf(member);
      this.selectedMembers.splice(idx, 1);
      this.update();
    },

    closeScreen() {
      console.log("here");
      this.isEditMode = false;
      console.log("isEditMode", this.isEditMode);
    },
  },
  computed: {
    membersToShow() {
      var boardMembers = this.info.boardMembers;
      if (!this.selectedMembers || !this.selectedMembers.length) {
        return boardMembers;
      } else {
        const selectedMembersId = this.selectedMembers.map((m) => m._id);
        const membersToShow = boardMembers.filter((member) => {
          return !selectedMembersId.includes(member._id);
        });
        return membersToShow;
      }
    },
  },
  watch: {
    selectedMembers: function (newVal, oldVal) {
      this.activity = { type: "members", newVal, oldVal };
    },
    info: {
      handler: function (newVal) {
        if (newVal && newVal.members) {
          if (!newVal.members.length) {
            this.selectedMembers = null;
          } else {
            this.selectedMembers = newVal.members;
          }
        }
      },
    },
  },
};
</script>
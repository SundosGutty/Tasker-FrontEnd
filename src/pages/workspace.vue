<template>
  <section class="workspace-container">
    <!-- MEMBERS MODAL -->
    <section
      class="cover"
      v-if="isInviteMode"
      @click="setInviteMode(false)"
    ></section>

    <section class="invite-container" v-if="isInviteMode">
      <ul class="invite-list">
        <span>Board Members</span>
        <p>Subscribe people from your team</p>
        <input type="text" placeholder="Enter name or email" />
        <li class="flex" v-for="currUser in allUsers" :key="currUser._id">
          <div class="user flex" @click="addUserToBoard(currUser)">
            <avatar
              class="memebr-img"
              :size="30"
              :src="
                currUser.imgUrl ? require(`@/pics/${currUser.imgUrl}`) : null
              "
              :username="currUser.fullname"
            />
            <span>{{ currUser.fullname }}</span>
          </div>
          <div class="list-btn">
            <a class="icon-crown"></a>
            <i
              class="fas fa-times"
              :style="{ color: isMember(currUser) }"
              @click="removeUserFromBoard(currUser)"
            ></i>
          </div>
        </li>
      </ul>
    </section>

    <!-- POP UP NAV -->
    <pop-up-nav
      :board="currBoard"
      :allBoards="boards"
      :user="loggedinUser"
    ></pop-up-nav>
    <!-- WORKSPACE -->
    <transition name="fade">
    <section class="workspace" v-show="currBoard">
      <header>
        <board-header
          @screenCover="setInviteMode"
          :board="currBoard"
          :user="loggedinUser"
          :allUsers="allUsers"
        />

        <task-actions-nav
          @sortBy="sortBy"
          @filterBy="filterBy"
          @addNewGroup="addNewGroup"
          :allUsers="allUsers"
          :board="currBoard"
        />
        <!-- <board-filter /> -->
      </header>
      <board-details
        v-if="currBoard"
        :user="loggedinUser"
        :board="currBoard"
        @updateBoard="updateBoard"
        @addTask="addTask"
        @removeGroup="removeGroup"
        @addNewGroup="addNewGroup"
        @editGroup="editGroup"
      />
    </section>
    </transition>
    <section class="gif-container" v-show="!currBoard">
      <img src="../assets/gif/login-gif.gif" class="login-gif" />
    </section>
    <router-view></router-view>
  </section>
</template>

<script>
import boardFilter from "@/cmps/board-filter.vue";
import boardHeader from "@/cmps/board-header.vue";
import taskActionsNav from "@/cmps/task-actions-nav.vue";
import popUpNav from "@/cmps/pop-up-nav.vue";
import BoardDetails from "@/cmps/board/board-details.vue";
import Avatar from "vue-avatar";

export default {
  name: "workspace",
  components: {
    boardFilter,
    boardHeader,
    taskActionsNav,
    popUpNav,
    BoardDetails,
    Avatar,
  },
  props: [],
  data() {
    return {
      boards: null,
      currBoardIdx: 0,
      user: 0,
      isInviteMode: false,
    };
  },
  async created() {
    try {
      this.$store.commit({ type: "setLoggedinUser" });
      this.boards = await this.$store.dispatch({
        type: "loadBoards",
        currBoardIdx: this.currBoardIdx,
      });
      this.users = await this.$store.dispatch({
        type: "loadUsers",
      });
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    // updateBoard(board) {
    //         console.log("workspace",board.title);
    //   this.$store.dispatch({ type: "updateFromSocket", board });
    //},
    updateBoard(board) {
      this.$store.commit({ type: "saveBoard", board });
    },

    async addTask(taskInfo) {
      try {
        await this.$store.dispatch({ type: "editTask", taskInfo });
      } catch (err) {
        console.log("Error", err);
      }
    },
    async editGroup(groupInfo) {
      try {
        await this.$store.dispatch({ type: "editGroup", groupInfo });
        console.log("Group was edited!");
      } catch (err) {
        console.log("Error", err);
      }
    },
    async removeGroup(groupInfo) {
      try {
        await this.$store.dispatch({ type: "removeGroup", groupInfo });
        console.log("Group was deleted!");
      } catch (err) {
        console.log("Error", err);
      }
    },
    async addNewGroup(groupInfo) {
      try {
        await this.$store.dispatch({ type: "addNewGroup", groupInfo });
      } catch (err) {
        console.log("Error", err);
      }
    },
    sortBy(sortBy) {
      console.log(sortBy);
      this.$store.commit({ type: "setSort", sortBy });
    },
    filterBy(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
    },
    setInviteMode(isInvite) {
      this.isInviteMode = isInvite;
    },
    addUserToBoard(user) {
      if (this.currBoard.members.some((member) => member._id === user._id))
        return;

      this.currBoard.members.push(user);
      this.$store.dispatch({ type: "saveBoard", board: this.currBoard });
      this.isInviteMode = false;
    },
    removeUserFromBoard(user) {
      if (!this.currBoard.members.some((member) => member._id === user._id))
        return;
      console.log(user);

      const idx = this.currBoard.members.findIndex(
        (member) => member._id === user._id
      );

      this.currBoard.members.splice(idx, 1);
      this.$store.dispatch({ type: "saveBoard", board: this.currBoard });
      this.isInviteMode = false;
    },
    isMember(user) {
      if (this.currBoard.members.some((member) => member._id === user._id))
        return "#341ff5";
    },
  },
  computed: {
    currBoard() {
      const board = this.$store.getters.currBoard;
      return board;
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
  },
  destroyed() {},
};
</script>
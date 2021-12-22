<template>
  <section class="pop-up-container">
    <div
      class="toggle-nav"
      @click="toggleNav"
      :class="[isShown ? 'toggle-left' : 'toggle-right']"
    >
      <span
        :class="[isShown ? 'icon-toggle-left' : 'icon-toggle-right']"
      ></span>
    </div>
    <section
      class="pop-up-nav"
      :class="[isShown ? 'show-pop-up' : 'hide-pop-up']"
    >
      <transition name="fade">
        <section v-show="isShown">
          <div class="logo">
            <h1>Workspace</h1>
          </div>
          <div class="action-btns">
            <el-select name="board" id="boards" v-if="currBoard" value="board">
              <el-option value="board1">{{ currBoard.title }}</el-option>
              <el-option value="board2">Board 2?</el-option>
            </el-select>
            <div class="search-btns">
              <button @click="toggleModal">
                <span class="icon-plus"></span>Add new board
              </button>
              <button><span class="icon-filter"></span>Filter</button>
              <button>
                <span class="icon-search last-child"></span>Search
              </button>
            </div>
          </div>
          <div class="my-boards">
            <button>My Boards</button>
            <button @click="showDashboard">My Charts</button>
            <ul>
              <li v-for="board in allBoards" :key="board._id">
                <button>{{ board.title }}</button>
              </li>
            </ul>
          </div>
        </section>
      </transition>

      <create-board
        v-if="isEditBoard"
        @addNewBoard="addNewBoard"
        @toggleModal="toggleModal"
      />
    </section>
  </section>
</template>



<script>
import { utilService } from "@/services/util.service.js";
import createBoard from "./create-board.vue";

export default {
  name: "pop-up-nav",
  props: ["board", "user", "allBoards"],
  components: {
    createBoard,
  },
  data() {
    return {
      isShown: false,
      isEditBoard: false,
    };
  },

  created() {
    console.log("allBoards", this.allBoards);
  },
  methods: {
    toggleNav() {
      this.isShown = !this.isShown;
    },
    toggleModal() {
      this.isEditBoard = !this.isEditBoard;
    },

    addNewBoard(board) {
      if (board) this.$store.dispatch({ type: "addNewBoard", board });
    },
    // createBoard(){
    //   const newBoard = utilService.getEmptyBoard()
    //   newBoard.createdBy=this.currUser
    //   this.$store.dispatch({type:"addNewBoard"})

    // }
    showDashboard() {
      this.$router.push("/dashboard");
    },
  },
  computed: {
    currBoard() {
      return this.board ? this.board : null;
    },
    currUser() {
      return this.user ? this.user : null;
    },
  },
};
</script>


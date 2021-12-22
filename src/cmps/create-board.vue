
<template>
  <div class="create-board" @click="closeModal">

    <div class="board-form">
      <input type="text" placeholder="Board Name" v-model="board.title" @click.stop/>
    <button @click="addNewBoard">Save</button>
    </div>
    
  </div>
</template>


<script>
import { utilService } from "@/services/util.service.js";
export default {
  name: "create-board",
  data() {
    return {
      board: utilService.getEmptyBoard(),
    };
  },
  methods: {
    addNewBoard() {
      this.$emit("addNewBoard", this.board);
      this.closeModal
    },
    closeModal(){
        this.$emit("toggleModal")
    }
  },
};
</script>

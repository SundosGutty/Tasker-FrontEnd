<template>
  <section class="task-dropdown">
    <el-dropdown class="dropdown" trigger="click">
      <i class="fa fa-caret-down"></i>
      <el-dropdown-menu trigger="click" size="large" slot="dropdown">
        <el-dropdown-item @click.native="openTaskDetails">
          <i class="fas fa-expand-alt"></i> Open Details
        </el-dropdown-item>
        <el-dropdown-item @click.native="duplicateTask"
          ><i class="far fa-copy"></i>Duplicate</el-dropdown-item
        >
        <el-dropdown-item class="last-child"
          ><i class="fas fa-plus"></i>Create new item below
        </el-dropdown-item>
        <el-dropdown-item @click.native="toggleModal" id="myBtn"
          ><i class="fas fa-trash"></i>Delete
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div v-if="isShown" id="myModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h1>Delete this item?</h1>
          <i class="fas fa-times" @click="toggleModal"></i>
        </div>
        <div class="modal-body">
          <div @click="toggleModal" class="btn-cancel">Cancel</div>
          <div @click="removeTask" class="btn-delete">Delete</div>
        </div>
      </div>
    </div>
  </section>
</template>



<script>
export default {
  name: "task-dropDown",
  prop: [],
  data() {
    return {
      isShown: false,
    };
  },
  methods: {
    removeTask() {
      this.$emit("removeTask");
      this.isShown = !this.isShown;
    },
    toggleModal() {
      this.isShown = !this.isShown;
    },
    openTaskDetails() {
      this.$emit("openTaskDetails");
    },
    duplicateTask() {
      this.$emit("duplicateTask");
    },
  },
};
</script>



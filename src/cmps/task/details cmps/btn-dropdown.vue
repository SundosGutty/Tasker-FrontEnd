<template>
  <section class="dropdown-btn">
    <el-dropdown class="dropdown" trigger="click">
      <i class="fas fa-ellipsis-h"></i>
      <el-dropdown-menu trigger="click" size="large" slot="dropdown">
        <el-dropdown-item @click.native="renameTask"
          ><i class="fas fa-pencil-alt"></i>rename</el-dropdown-item
        >
        <el-dropdown-item @click.native="removeTask"
          ><i class="far fa-trash-alt"></i>Delete</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>



<script>
export default {
  methods: {
    removeTask() {
      console.log("removed");
    },
    renameTask() {
      console.log("renamed");
    },
  },
};
</script>

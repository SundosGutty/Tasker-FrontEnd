<template>
  <section class="group-dropdown">
    <el-dropdown class="dropdown" trigger="click">
      <a
        class="fas fa-caret-down"
        :style="{ 'background-color': group.style.color }"
      ></a>
      <el-dropdown-menu trigger="click" size="large" slot="dropdown">
        <el-dropdown-item @click.native="isShowGroups({all : false , isShow : false})">
          <i class="fas fa-compress-alt"></i>Collapse this group
        </el-dropdown-item>
        <el-dropdown-item class="last-child" @click.native="isShowGroups({all : true , isShow : false})"
          ><i class="fas fa-compress-alt"></i>Collapse all
          groups</el-dropdown-item
        >
        <el-dropdown-item @click.native="isShowGroups({all : false , isShow : true})"
          ><i class="fas fa-expand-alt"></i>Open group</el-dropdown-item
        >
        <el-dropdown-item class="last-child" @click.native="isShowGroups({all : true , isShow : true})"
          ><i class="fas fa-expand-alt"></i>Open all groups</el-dropdown-item
        >
        <el-dropdown-item @click.native="addNewGroup"
          ><i class="fas fa-plus"></i>Add group</el-dropdown-item
        >
        <el-dropdown-item @click.native="duplicateGroup"
          ><i class="far fa-copy"></i>Duplicate group</el-dropdown-item
        >
        <el-dropdown-item @click.native="setEdit"
          ><i class="fas fa-pen"></i>Rename group
        </el-dropdown-item>
        <el-dropdown-item class="last-child" @click.native="openColorModal">
          <span class="icon-circle" :style="{ color: color }"></span>
          Change group color
        </el-dropdown-item>
        <el-dropdown-item @click.native="toggleModal" id="myBtn"
          ><i class="fas fa-trash"></i>Delete
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div v-if="!isHidden" id="myModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h1>Delete this item?</h1>
          <i class="fas fa-times" @click="toggleModal"></i>
        </div>
        <div class="modal-body">
          <div @click="toggleModal" class="btn-cancel">Cancel</div>
          <div @click="removeGroup" class="btn-delete">Delete</div>
        </div>
      </div>
    </div>

    <div class="color-container" v-show="isShown">
      <div
        class="color"
        v-for="color in colors"
        :key="color.name"
        :class="color.name"
        @click="changeColor(color.hexCode)"
      ></div>
    </div>
  </section>
</template>



<script>
import { remoteBoardService } from "@/services/board.service-remote.js";

export default {
  name: "group-dropDown",
  props: ["group"],
  data() {
    return {
      isShown: false,
      color: "#579BFC",
      isHidden: true,
    };
  },
  methods: {
    removeGroup() {
      this.$emit("removeGroup");
      this.isHidden = !this.isHidden;
    },
    toggleModal() {
      this.isHidden = !this.isHidden;
    },
    isShowGroups(val) {
      this.$emit("isShowGroups", val);
    },
    setEdit() {
      this.$emit("setEdit");
    },
    openColorModal() {
      this.isShown = !this.isShown;
    },
    changeColor(color) {
      this.color = color;
      this.$emit("changeColor", color);
      this.isShown = !this.isShown;
    },
    addNewGroup() {
      this.$emit("addNewGroup");
    },
    duplicateGroup() {
      this.$emit("duplicateGroup");
    },
  },
  computed: {
    colors() {
      return remoteBoardService.getColors();
    },
  },
};
</script>
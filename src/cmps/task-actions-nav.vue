<template>
  <section>
    <section class="task-action-btn">
      <button @click="addNewGroup" class="btn-new-task">New Group</button>
      <button v-if="!isSearch" @click.prevent.stop="isSearchMode">
        <label class="icon-search" form="search"></label>Search
      </button>
      <div v-show="isSearch" class="search-Board">
        <input
          id="search"
          ref="search"
          @input="filterBy('searchKey')"
          type="text"
          placeholder="Search"
          v-model="searchKey"
        />
        <a @click.stop.prevent="stopSearch" class="fa fa-times"></a>
      </div>
      <button @click="showFilterModal">
        <span class="icon-filter"></span>Filter<span
          class="icon-arrow-down"
        ></span>
      </button>
      <div v-if="isFilterBy" class="filter-menu">
        <div class="header flex space-between">
          <div>Quick filters</div>
          <div
            class="btn-clear"
            :style="{ isActive: 'active' }"
            @click.prevent.stop="filterBy({ filter: 'all', val: 'all' })"
          >
            Clear all
          </div>
        </div>
        <div>
          <div class="filter-options" v-if="board">
            <div class="member-avatars-filter">
              <h1>By members</h1>
              <div>
                <div v-for="(member, idx) in board.members" :key="idx">
                  <div
                    class="user-container"
                    @click.prevent.stop="
                      filterBy({ filter: 'member', val: member.fullname })
                    "
                  >
                    <img
                      class="member-img"
                      v-if="member.imgUrl"
                      :src="require(`@/pics/${member.imgUrl}`)"
                    />
                    <a v-else class="icon-user"></a>
                    {{ member.fullname }}
                  </div>
                </div>
              </div>
            </div>
            <div class="groups">
              <h1>By group</h1>
              <div
                @click.prevent.stop="
                  filterBy({ filter: 'title', val: group.title })
                "
                class="group-title-container"
                v-for="(group, idx) in board.groups"
                :key="idx"
              >
                {{ group.title }}
              </div>
            </div>
            <div class="status">
              <h1>By status</h1>
              <div class="status-container">
                <div @click="filterBy({ filter: 'status', val: 'done' })">
                  <span class="icon-circle green" value="done"></span>Done
                </div>
                <div @click="filterBy({ filter: 'status', val: 'stuck' })">
                  <span class="icon-circle red" value="stuck"></span>Stuck
                </div>
                  <div @click="filterBy({ filter: 'status', val: 'hold' })">
                  <span class="icon-circle dark-blue" value="hold"></span>On hold
                </div>
                <div
                  @click="
                    filterBy({ filter: 'status', val: 'work' })
                  "
                >
                  <span class="icon-circle yellow" value="working on it"></span
                  >Working on it
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button @click="showSortModal">
        <span class="icon-sort-up-down"></span>Sort
      </button>
    </section>
    <section class="pop-up-modal">
      <div class="menu-modal sort-menu" v-if="isShown">
        <div class="sort-header">
          <div class="sort-heading">Sort by</div>
          <div><i class="fas fa-times" @click="closeModal"></i></div>
        </div>
        <div class="sort-content">
          <div>
            <el-select
              v-model="sortBy.val"
              sortBy.val-key="value"
              placeholder="Select"
              class="sortVal"
            >
              <el-option value="name" @click.native="sortVal('name')"
                ><i class="fas fa-text-height"></i>Name</el-option
              >
              <el-option value="status" @click.native="sortVal('status')"
                ><i class="fas fa-layer-group"></i>Status</el-option
              >
              <el-option value="person" @click.native="sortVal('person')"
                ><i class="far fa-user-circle"></i>Person</el-option
              >
              <el-option value="timeline" @click.native="sortVal('timeline')"
                ><i class="fas fa-stream"></i>Timeline</el-option
              >
              <el-option value="priority" @click.native="sortVal('priority')"
                ><i class="fas fa-exclamation"></i>Priority</el-option
              >
            </el-select>
          </div>
          <div>
            <el-select
              v-model="sortBy.order"
              sortBy.order-key="value"
              placeholder="Select"
            >
              <el-option
                value="ascending"
                @click.native="sortOrder('ascending')"
                ><i class="fas fa-sort-amount-down-alt"></i>Ascending</el-option
              >
              <el-option
                value="descending"
                @click.native="sortOrder('descending')"
                ><i class="fas fa-sort-amount-up"></i>Descending</el-option
              >
            </el-select>
          </div>
        </div>
      </div>
    </section>
    <!-- <section
      class="cover-screen"
      v-if="isFilterBy || isShown"
      @click="(isFilterBy = false), (isShown = false)"
    ></section> -->
  </section>
</template>



<script>
import Avatar from "vue-avatar";

export default {
  components: { Avatar },

  name: "task-actions",
  props: ["allUsers", "board"],
  data() {
    return {
      isSearch: false,
      searchKey: "",
      isShown: false,
      isActive: false,
      isFilterBy: false,
      exitModal: false,
      sortBy: {
        val: null,
        order: "ascending",
      },
    };
  },
  methods: {
    showSortModal() {
      this.isShown = !this.isShown;
    },
    showFilterModal() {
      this.isFilterBy = !this.isFilterBy;
    },

    addNewGroup() {
      this.$emit("addNewGroup", null);
    },

    sortVal(value) {
      const newSort = { ...this.sortBy };
      newSort.val = value;
      this.$emit("sortBy", newSort);
    },

    sortOrder(value) {
      const newSort = { ...this.sortBy };
      newSort.order = value;
      this.$emit("sortBy", newSort);
    },

    stopSearch() {
      console.log("stopSearch");
      this.searchKey = null;
      console.log(" this.searchKey", this.searchKey);
      this.isSearch = false;
      this.filterBy({ filter: "all", val: "all" });
    },

    closeModal() {
      this.isShown = !this.isShown;
    },

    isSearchMode() {
      this.isSearch = !this.isSearch;
    },
    filterBy(filter) {
      console.log(filter);
      if (typeof filter === "object") {
        this.$emit("filterBy", filter);
      } else {
        this.$emit("filterBy", { filter: filter, val: this.searchKey });
      }
    },
  },
};
</script>


<style>
.active {
  background-color: blue;
}
</style>

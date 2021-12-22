<template>
  <section class="cover-user" @click="closeList">
      <div class="user-list">
      <h2>
         <fieldset><legend>People</legend></fieldset> 
          </h2>
    <ul>
      <div class="list-item flex">
        <li
          v-for="(user, idx) in users"
          :key="idx"
          @click.prevent.stop="addMember(user)"
          class="flex">
         
            <section v-if="!user.imgUrl">
              <span class="icon-user"></span>
            </section>

            <avatar
              v-else
              :size="22"
              :username="user.fullname"
              :src="require(`@/pics/${user.imgUrl}`)"
              :key="user._id"
            />
            <div>{{ user.fullname }}</div>
          
         </li>
     </div>
    </ul>
    </div>
  </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  name: "user-list",
  props: ["users"],
  components: {
    Avatar,
  },
  methods: {
    addMember(member) {
      this.$emit("addMember", member);
    },
    closeList(){
        this.$emit('closeList')
    }
  },
};
</script>

import Vue from "vue";
import Vuex from "vuex";
import { boardStore } from "./modules/board.store";
import { userStore } from "./modules/user.store";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { boardStore, userStore },
});

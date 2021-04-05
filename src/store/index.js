import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: 0,
    userName: '',
    userAvatar: '',
    token: sessionStorage.getItem("Token")
  },
  mutations: {
    UPDATE_USER_ID(state, userId){
      state.userId = userId;
    },
    UPDATE_USER_NAME(state, userName){
      state.userName = userName;
    },
    UPDATE_USER_AVATAR(state, userAvatar){
      state.userAvatar = userAvatar;
    },
    UPDATE_TOKEN(state, token){
      state.token = token;
    }
  },
  actions: {
    updateUserId({ commit }, data){
      commit('UPDATE_USER_ID', data);
    },
    updateUserName({ commit }, data){
      commit('UPDATE_USER_NAME', data);
    },
    updateUserAvatar({ commit }, data){
      commit('UPDATE_USER_AVATAR', data);
    },
    updateToken({ commit }, data){
      commit('UPDATE_TOKEN', data);
    }
  },
  modules: {}
});

import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    // serverPath: 'https://coolclothes.bounceme.net',
    serverPath: 'http://localhost:3000',
    userToken: '',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [createPersistedState({ paths: ['userToken'] })],
});

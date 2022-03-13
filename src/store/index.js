import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    serverPath: 'https://shopping-cart-bn.herokuapp.com',
    // serverPath: 'http://localhost:5000',
    userToken: '',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [createPersistedState({ paths: ['userToken'] })],
});

import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

export default createStore({
  state: {
    // serverPath: 'https://shopping-cart-bn.herokuapp.com',
    serverPath: 'http://localhost:5000',
    userCart: [],
    isLogin: false,
    userName: '',
  },
  mutations: {
    addToCart(state, data) {
      const product = state.userCart.find(
        (product) => product.product_id === data[0]
      );
      if (product) product.amount += data[1];
      else {
        const newProduct = {
          product_id: data[0],
          amount: data[1],
        };
        state.userCart.push(newProduct);
      }
    },
    setLoginState(state, userName) {
      state.isLogin = true;
      state.userName = userName;
    },
    setLogoutState(state) {
      state.isLogin = false;
      state.userName = '';
    },
  },
  actions: {
    checkAuthentication({ state, commit }) {
      axios
        .get(`${state.serverPath}/auth`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data === 'authenticated') {
            commit('setLoginState', state.userName);
          } else {
            commit('setLogout');
          }
        });
    },
  },
  modules: {},
  plugins: [createPersistedState({ paths: ['userCart', 'userName'] })],
});

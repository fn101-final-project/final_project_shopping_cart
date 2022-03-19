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
      // console.log(state.userCart);
    },
    async isAuthenticated(state) {
      const response = await axios.get(`${state.serverPath}/auth`, {
        withCredentials: true,
      });
      if (response) state.isLogin = response.data === 'authenticated';
    },
    setUserName(state, data) {
      state.userName = data;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState({ paths: ['userCart', 'userName'] })],
});

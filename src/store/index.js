import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    serverPath: 'https://shopping-cart-bn.herokuapp.com',
    // serverPath: 'http://localhost:5000',
    userToken: '',
    userCart: [],
  },
  getters: {},
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
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState({ paths: ['userToken', 'userCart'] })],
});

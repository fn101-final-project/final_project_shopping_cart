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
    setLoginState(state, userName) {
      state.isLogin = true;
      state.userName = userName;
    },
    setLogoutState(state) {
      state.isLogin = false;
      state.userName = '';
    },
    clearCart(state) {
      state.userCart = [];
    },
    adjustUserCartAmount(state, newCart) {
      //符合庫存量
      state.userCart = newCart.filter((n) => n);
    },
    updateCart(state, data) {
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
  },
  actions: {
    addToCart({ state, dispatch, commit }, data) {
      commit('updateCart', data);
      if (state.isLogin) {
        dispatch('storeCartToDB');
      }
    },
    checkAuthentication({ state, commit }) {
      axios
        .get(`${state.serverPath}/auth`, { withCredentials: true })
        .then((response) => {
          if (response.data === 'authenticated') {
            commit('setLoginState', state.userName);
          } else {
            commit('setLogoutState');
          }
        });
    },
    async setLogin({ commit, dispatch }, userName) {
      commit('setLoginState', userName);
      //同步資料庫與vuex購物車
      await dispatch('pullCartFromDB');
      await dispatch('checkProductQuantity');
      await dispatch('storeCartToDB');
    },
    setLogout({ commit }) {
      commit('setLogoutState');
      commit('clearCart');
    },
    async storeCartToDB({ state }) {
      try {
        await axios.post(
          `${state.serverPath}/api/cart`,
          { cart: state.userCart },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async pullCartFromDB({ state, dispatch }) {
      try {
        const response = await axios.get(`${state.serverPath}/api/cart`, {
          withCredentials: true,
        });
        response.data.data.map(({ product_id, amount }) => {
          dispatch('addToCart', [product_id, amount]);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async checkProductQuantity({ state, commit }) {
      try {
        const response = await axios.get(`${state.serverPath}/api/products`);
        const newCart = state.userCart.map((productInCart) => {
          const target = response.data.find(
            (productInfo) => productInfo.id === productInCart.product_id
          );
          if (target) {
            if (target.quantity < productInCart.amount)
              productInCart.amount = target.quantity;
          } else {
            return null;
          }
          return productInCart;
        });
        commit('adjustUserCartAmount', newCart);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
  plugins: [createPersistedState({ paths: ['userCart', 'userName'] })],
});

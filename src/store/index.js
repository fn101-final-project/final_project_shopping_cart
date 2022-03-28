import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default (axios) =>
  createStore({
    state: {
      userCart: [],
      userName: '',
      isLogin: false,
    },
    mutations: {
      //登入狀態
      setLoginState(state, userName) {
        state.isLogin = true;
        state.userName = userName;
      },
      //登出狀態
      setLogoutState(state) {
        state.isLogin = false;
        state.userName = '';
      },
      //清空購物車
      clearCart(state) {
        state.userCart = [];
      },
      //調整購物車商品數量以符合庫存
      adjustCartAmount(state, newCart) {
        state.userCart = newCart.filter((n) => n);
      },
      //商品加入購物車
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
    },
    actions: {
      //商品加入購物車
      addToCart({ state, dispatch, commit }, data) {
        commit('addToCart', data);
        if (state.isLogin) {
          dispatch('storeCartToDB');
        }
      },
      //檢查目前登入狀態
      checkAuthentication({ state, commit }) {
        axios.get('/auth').then((response) => {
          if (response.data === 'authenticated') {
            commit('setLoginState', state.userName); //改寫後端丟回使用者全名
          } else {
            commit('setLogoutState');
          }
        });
      },
      //登入
      async setLogin({ commit, dispatch }, userName) {
        commit('setLoginState', userName);
        //同步資料庫與vuex購物車
        await dispatch('pullCartFromDB');
        await dispatch('checkProductQuantity');
        await dispatch('storeCartToDB');
      },
      //登出
      setLogout({ commit }) {
        commit('setLogoutState');
        commit('clearCart');
      },
      //將vuex購物車內容存入資料庫
      async storeCartToDB({ state }) {
        try {
          await axios.post('/api/cart', { cart: state.userCart });
        } catch (error) {
          console.log(error);
        }
      },
      //從資料庫中拉出購物車內容至vuex
      async pullCartFromDB({ dispatch }) {
        try {
          const response = await axios.get('/api/cart');
          response.data.data.map(({ product_id, amount }) => {
            dispatch('addToCart', [product_id, amount]);
          });
        } catch (error) {
          console.log(error);
        }
      },
      //比對商品庫存量與購物車商品數量
      async checkProductQuantity({ state, commit }) {
        try {
          const response = await axios.get('/api/products');
          const newCart = state.userCart.map((productInCart) => {
            const target = response.data.find(
              (productInfo) => productInfo.id === productInCart.product_id
            );
            //若庫存量小於選購數量，則降低選購數量至庫存量
            if (target) {
              if (target.quantity < productInCart.amount)
                productInCart.amount = target.quantity;
            } else {
              return null;
            }
            return productInCart;
          });
          commit('adjustCartAmount', newCart);
        } catch (error) {
          console.log(error);
        }
      },
    },
    modules: {},
    plugins: [createPersistedState({ paths: ['userCart', 'userName'] })],
  });

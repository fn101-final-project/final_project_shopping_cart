<template>
  <nav class="navbar sticky-top">
    <div class="container-fluid position-relative">
      <a class="nav-link" title="找商品" href="#"
        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
          /></svg
      ></a>
      <router-link
        class="navbar-brand m-0 position-absolute top-50 start-50 translate-middle"
        to="/products"
      >
        <img src="../assets/shop-logo.svg" alt="kohola-logo" />
      </router-link>
      <div class="navbar-nav flex-row">
        <router-link
          v-if="!isLogin"
          class="nav-link pe-4"
          title="會員登入"
          to="/login"
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
            /></svg
        ></router-link>
        <div v-else class="row">
          <div class="col text-nowrap greetings d-none d-md-block pe-3">
            Hi {{ userName }}
          </div>
          <router-link
            class="nav-link col pe-4"
            title="會員登出"
            to="/"
            @click.prevent="doLogout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z"
              />
            </svg>
          </router-link>
        </div>
        <a class="nav-link ps-4" title="購物袋" href="#"
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M112 112C112 50.14 162.1 0 224 0C285.9 0 336 50.14 336 112V160H400C426.5 160 448 181.5 448 208V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V208C0 181.5 21.49 160 48 160H112V112zM160 160H288V112C288 76.65 259.3 48 224 48C188.7 48 160 76.65 160 112V160zM136 256C149.3 256 160 245.3 160 232C160 218.7 149.3 208 136 208C122.7 208 112 218.7 112 232C112 245.3 122.7 256 136 256zM312 208C298.7 208 288 218.7 288 232C288 245.3 298.7 256 312 256C325.3 256 336 245.3 336 232C336 218.7 325.3 208 312 208z"
            /></svg
        ></a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: { ...mapState(['isLogin', 'userName']) },
  methods: {
    doLogout() {
      this.$axios.get('/api/users/logout').then(() => {
        this.$store.dispatch('setLogout');
        this.$router.push({ name: 'products' });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.navbar {
  color: rgb(98, 98, 98, 0.8);
  padding: 1rem;
  min-height: 2.5rem;
  border-bottom: 1px solid rgb(128, 128, 128, 0.4);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9113154193155126) 96%,
    rgba(255, 255, 255, 0.8394199944789114) 100%
  );

  @media (min-width: 768px) {
    padding: 1.4rem;
    min-height: 2.7rem;
  }
  @media (min-width: 992px) {
    padding: 1.6rem;
    min-height: 3rem;
  }

  img {
    width: 2.8rem;
    @media (min-width: 768px) {
      width: 3.2rem;
    }
    @media (min-width: 992px) {
      width: 3.6rem;
    }
  }

  svg {
    width: 1rem;
    fill: rgb(98, 98, 98, 0.8);
    @media (min-width: 768px) {
      width: 1.2rem;
    }
    @media (min-width: 992px) {
      width: 1.3rem;
    }
  }

  .greetings {
    font-size: 1em;
    padding-top: 0.6rem;
    @media (min-width: 992px) {
      font-size: 1.2em;
    }
  }
}
</style>

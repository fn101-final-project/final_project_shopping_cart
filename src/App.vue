<template>
  <Navbar v-if="pageExist" :key="isLogin" />
  <router-view />
</template>

<script>
import Navbar from '@/components/NavBar.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      pageExist: true,
      ...mapState(['isLogin']),
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.name === '404') this.pageExist = false;
      },
    },
  },
  mounted() {
    this.$store.dispatch('checkAuthentication');
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

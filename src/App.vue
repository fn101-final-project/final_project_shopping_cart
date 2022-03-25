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

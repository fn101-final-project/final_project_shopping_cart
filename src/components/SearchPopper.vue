<template>
  <Popper arrow :placement="placement">
    <slot />
    <template #content>
      <input
        class="form-control"
        type="text"
        placeholder="找商品"
        v-model="keywords"
      />
    </template>
  </Popper>
</template>

<script>
import Popper from 'vue3-popper';

export default {
  components: {
    Popper,
  },
  data() {
    return {
      placement: 'bottom',
      keywords: '',
    };
  },
  mounted() {
    window.onresize = () => {
      if (window.innerWidth < 768) this.placement = 'bottom';
      else this.placement = 'right';
    };
  },
};
</script>

<style>
:root {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #333333;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #eeeeee;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>

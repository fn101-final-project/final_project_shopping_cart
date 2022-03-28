<template>
  <div
    class="col-lg-3 col-md-4 col-sm-6 product d-flex justify-content-center pb-5"
  >
    <div
      class="d-flex flex-column text-start click-area"
      @click="goToProduct(id)"
    >
      <img :src="parseImgPath(pic)" alt="product image" />
      <h6 class="pt-2 m-0">{{ name }}</h6>
      <span>NT${{ price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    pic: String,
    quantity: Number,
    desc: String,
    name: String,
    price: Number,
  },
  methods: {
    parseImgPath(path) {
      return `${process.env.VUE_APP_API_BASE_URL}/img${path}`;
    },
    goToProduct(productId) {
      this.$router.push({ name: 'product', params: { productId } });
    },
  },
};
</script>

<style scoped lang="scss">
.click-area {
  cursor: pointer;

  img {
    width: 100%;
    object-fit: cover;
    @media (min-width: 576px) {
      width: 240px;
      height: 360px;
    }
    @media (min-width: 768px) {
      width: 200px;
      height: 300px;
    }
    @media (min-width: 992px) {
      width: 220px;
      height: 300px;
    }
  }

  h6 {
    font-weight: 700;
  }
}
</style>

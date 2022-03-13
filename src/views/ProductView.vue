<template>
  <div class="container">
    <div v-if="isLoaded" class="row py-5 g-5">
      <div class="col-md-6 product-img">
        <img class="img-fluid" :src="parseImgPath(product.pic)" alt="" />
      </div>
      <div class="col-md-6 product-text text-start px-5">
        <h1>{{ product.name }}</h1>
        <div>NT${{ product.price }}</div>
        <div class="select-form pt-5">
          <label>購買數量:</label>
          <div class="input-group my-3">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="decrease"
            >
              &#8722;
            </button>
            <input type="text" class="form-control" v-model="number" />
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="increase"
            >
              &#43;
            </button>
          </div>
        </div>
        <div class="select-button">
          <button
            class="btn btn-outline-dark"
            type="button"
            :disabled="isDisabled"
            @click="addToCart"
          >
            加入購物車
          </button>
          <span class="text-danger px-3">{{ warning }}</span>
        </div>
        <div class="py-5">{{ product.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      productId: this.$route.params.productId,
      product: {},
      number: 1,
      warning: '',
      isDisabled: false,
      isLoaded: false,
    };
  },
  mounted() {
    axios
      .get(`${this.$store.state.serverPath}/api/products/${this.productId}`)
      .then((response) => {
        this.product = response.data[0];
        this.isLoaded = true;
      })
      .catch(() => this.$router.push({ name: '404' }));
  },
  watch: {
    number: {
      handler(val) {
        if (Number(val) && this.number <= this.product.quantity) {
          this.isDisabled = false;
          this.warning = '';
        }
      },
    },
  },
  methods: {
    parseImgPath(path) {
      return `${this.$store.state.serverPath}/img${path}`;
    },
    increase() {
      this.cleanNumber();
      this.number++;
      if (this.number > this.product.quantity) {
        this.warning = '庫存不足，請調整數量';
        this.isDisabled = true;
      }
    },
    decrease() {
      this.cleanNumber();
      if (this.number > 1) this.number--;
    },
    cleanNumber() {
      if (typeof this.number === 'string')
        this.number = Number(this.number.replace(/\D/g, ''));
    },
    beforeAdd() {
      if (!Number(this.number)) {
        this.warning = '請輸入有效數字';
        this.isDisabled = true;
      }
      if (this.number > this.product.quantity) {
        this.warning = '庫存不足，請調整數量';
        this.isDisabled = true;
      }
    },
    addToCart() {
      this.beforeAdd();
    },
  },
};
</script>

<style scoped>
img {
  width: 400px;
  height: 600px;
  object-fit: cover;
}

@media (min-width: 768px) {
  .product-img {
    text-align: end;
  }
}
</style>

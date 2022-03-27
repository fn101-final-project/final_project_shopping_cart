<template>
  <div class="container pb-5">
    <div class="text-start py-5">Breadcrumb & Filter</div>
    <div class="row px-3">
      <template v-for="product in pageProducts" :key="product.id">
        <ProductBox v-bind="product" />
      </template>
    </div>
    <Paginate
      v-model="page"
      :page-count="pageCount"
      :prev-text="'&#xab;'"
      :next-text="'&#xbb;'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
    >
    </Paginate>
  </div>
</template>

<script>
import ProductBox from '@/components/ProductBox.vue';
import Paginate from 'vuejs-paginate-next';

export default {
  components: {
    ProductBox,
    Paginate,
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
      products: [],
      productCountPerPage: 2,
    };
  },
  mounted() {
    this.$axios.get('/api/products').then((response) => {
      this.sliceProducts(response.data);
      this.pageCount = this.products.length;
    });
  },
  watch: {
    page: {
      handler(val) {
        this.$router.push({ name: 'products', query: { page: val } });
      },
    },
  },
  computed: {
    pageProducts() {
      return this.products[this.$route.query.page - 1 || 0];
    },
  },
  methods: {
    sliceProducts(allProducts) {
      for (let i = 0; i < allProducts.length; i += this.productCountPerPage) {
        const chunk = allProducts.slice(i, i + this.productCountPerPage);
        this.products.push(chunk);
      }
    },
  },
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
}

.page-link,
.page-link:hover,
.page-link:focus {
  color: black;
  cursor: pointer;
}

.page-link:focus {
  box-shadow: none;
}

.page-item.active .page-link {
  background: gray;
  border-color: gray;
}
</style>

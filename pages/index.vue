<template>
  <main>
    <div v-if="products.length > 0" class="grid">
      <article v-for="(product, index) in products" :key="index" class="card product-item">
        <header class="card__header">
          <h1 class="product__title">
            {{ product.title }}
          </h1>
        </header>
        <div class="card__image">
          <img :src="`${baseUrl}/images/` + product.imageUrl" :alt="product.title">
        </div>
        <div class="card__content">
          <h2 class="product__price">{{ product.price }}</h2>
          <p class="product__description">
            {{ product.description }}
          </p>
        </div>
        <div class="card__actions">
          <nuxt-link :to="`/products/${product.id}`" class="btn">Detail</nuxt-link>
        </div>
      </article>
      <pagenation :pageData="pageData"></pagenation>
    </div>

    <h1 v-else>No Products Found!</h1>
  </main>
</template>

<script>
import Pagination from '~/components/Pagenation.vue';
export default {
  layout: 'default',
  components: {
    Pagination
  },
  data() {
    return {
      products: [],
      baseUrl: '',
      pageData: {
        currentPage: '',
        hasPreviosPage: false,
        previosPage: '',
        hasNextPage: false,
        nextPage: ''
      }
    }
  },
  async fetch() {
    try {
      let response = await this.$axios.$get('/api/?page=' + this.$route.query.page);
      this.products = response.products;
      this.baseUrl = process.env.BASE_URL;
      this.pageData.currentPage = response.currentPage;
      this.pageData.hasPreviosPage = response.previosPage;
      this.pageData.previosPage = response.previosPage;
      this.pageData.hasNextPage = response.hasNextPage;
      this.pageData.nextPage = response.nextPage;
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<template>
  <main class="centered">
    <h1>
      {{ product.title }}
    </h1>
    <hr>
    <div class="image">
      <img :src="product.imageUrl" :alt="product.title">
    </div>
    <h2>
      {{ product.price }}
    </h2>
    <p>
      {{ product.description }}
    </p>
    <div @click="addToCart(product.id)">
      <span class="btn">Add to Cart</span>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'default',
  async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(`/api/products/${params.id}`);
      return {
        product: response.product
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async addToCart(productId) {
      let response = await this.$axios.$post('http://localhost:3000/api/cart', { productId });
      this.$router.push('/cart');
    }
  }
}
</script>

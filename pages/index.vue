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
          <img :src="product.imageUrl" :alt="product.title">
        </div>
        <div class="card__content">
          <h2 class="product__price">{{ product.price }}</h2>
          <p class="product__description">
            {{ product.description }}
          </p>
        </div>
        <div class="card__actions">
          <a href="/products/${product.id}" class="btn">Detail</a>
        </div>
      </article>
    </div>

    <h1 v-else>No Products Found!</h1>
  </main>
</template>

<script>
export default {
  layout: 'default',
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get('/api/products');
      console.log(response);
      return {
        products: response.products
      }
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

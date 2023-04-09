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
          <p class="product__description">{{ product.description }}</p>
        </div>
        <div class="card__actions">
          <a :href="'/admin/edit-product/' + product.id" class="btn">Edit</a>
          <button type="submit" class="btn" @click.prevent="deleteProduct(product.id)">Delete</button>
        </div>
      </article>
    </div>
    <div v-else>
      <h1>商品がありません</h1>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get('http://localhost:3000/api/admin/products');
      console.log('response =>', response);
      return {
        products: response.products
      }
    } catch (err) {
      console.log(err);
      return {
        products: []
      }
    }
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    async deleteProduct(productId) {
      try {
        const response = await this.$axios.$delete('/api/admin/products/' + productId);
        this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

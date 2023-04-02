<template>
  <main>
    <div v-if="products.length > 0">
      <ul class="cart__item-list">
        <li v-for="(product, index) in products" :key="index" class="cart__item">
          <h1>{{ product.title }}</h1>
          <h2>数量:{{ product.cartItem.quantity }}</h2>
          <div @click="deleteCartProduct(product.id)">
            <span class="btn danger">Delete</span>
          </div>
        </li>
      </ul>
      <hr>
      <div class="centered">
        <a href="/checkout" class="btn">Order Now!</a>
      </div>
    </div>
    <h1 v-else>No Products in Cart!</h1>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get('/api/cart');
      return {
        products: response.products
      };
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async deleteCartProduct(productId) {
      console.log(productId)
      try {
        await this.$axios.$delete('http://localhost:3000/api/cart', { data: { productId } });
        this.$router.push('/cart');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

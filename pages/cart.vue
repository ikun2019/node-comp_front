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
        <!-- <a href="/checkout" class="btn">Order Now!</a> -->
        <!-- <button class="btn" @click.prevent="onAddOrder">Order Now!</button> -->
        <a class="btn" href="/checkout">Order Now!</a>
      </div>
    </div>
    <h1 v-else>No Products in Cart!</h1>
  </main>
</template>

<script>
export default {
  data() {
    return {
      products: []
    }
  },
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
      try {
        await this.$axios.$delete('/api/cart', { data: { productId } });
        let response = await this.$axios.$get('/api/cart');
        this.products = response.products;
        this.$router.push('/cart');
      } catch (err) {
        console.log(err);
      }
    },
    async onAddOrder() {
      try {
        const response = await this.$axios.$post('/api/create-order');
        console.log('onAddOrder =>', response);
        this.$router.push('/orders');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

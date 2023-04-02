<template>
  <main>
    <ul class="cart__item-list">
      <li v-for="(product, index) in products" :key="index" class="cart__item">
        <h1>{{ product.title }}</h1>
        <h2>Quantity: {{ product.cartItem.quantity }}</h2>
      </li>
    </ul>
    <div class="centered">
      <button id="order-btn" class="btn">ORDER</button>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'default',
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get('/api/orders');
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

<template>
  <main>
    <ul class="cart__item-list">
      <li v-for="(product, index) in products" :key="index" class="cart__item">
        <h1>{{ product.title }}</h1>
        <h2>Quantity: {{ product.cartItem.quantity }}</h2>
      </li>
    </ul>
    <div class="centered">
      <h2>Total: {{ totalSum }}</h2>
    </div>
    <div class="centered">
      <button id="order-btn" class="btn" @click.prevent="onCheckout">ORDER</button>
    </div>
  </main>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';

export default {
  layout: 'default',
  data () {
    return {
      products: [],
      totalSum: 0
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.$get('/api/checkout');
      this.products = response.products;
      this.totalSum = response.totalSum;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async onCheckout() {
      try {
        console.log('check out!');
        const stripe = await loadStripe(process.env.STRIPE_PUBLIC);
        const response = await this.$axios.$get('/api/checkout');
        const session = response.sessionId;
        await this.$axios.$post('/api/clear-cart');
        const result = await stripe.redirectToCheckout({
          sessionId: session
        });
        if (result.error) {
          console.log(result.error);
        } else if (result.complete) {
          this.$router.push('/orders');
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

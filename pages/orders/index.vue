<template>
  <main>
    <h1 v-if="orders.length <= 0">Nothing there!</h1>
    <ul class="orders" v-else>
      <li v-for="(order, index) in orders" :key="index" class="orders__item">
        <h1>
          Order - # {{ order.id }} - <nuxt-link :to="'/orders/' + order.id">Invoice</nuxt-link>
        </h1>
        <ul class="orders__products">
          <li v-for="(product, index) in order.products" :key="index" class="orders__products-item">
            {{ product.title }}({{ product.orderItem.quantity }}) - 
            <nuxt-link :to="'/orders/' + order.id">Invoice</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  layout: 'default',
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get('/api/orders');
      return {
        orders: response.orders
      }
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

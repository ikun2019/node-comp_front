<template>
  <main>
    <iframe :src="`${baseUrl}/api/orders/` + orderId" style="width: 100%; height: 100%;"></iframe>
  </main>
</template>

<script>
export default {
  layout: 'default',
  async asyncData({ params }) {
    try {
      const orderId = params.id;
      return {
        orderId,
        baseUrl: process.env.BASE_URL,
      };
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

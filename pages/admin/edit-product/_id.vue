<template>
  <main>
    <div class="product-form">
      <div class="form-control">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" v-model="title">
      </div>
      <div class="form-control">
        <label for="imageUrl">Image URL</label>
        <input type="text" name="imageUrl" id="imageUrl" v-model="imageUrl">
      </div>
      <div class="form-control">
        <label for="price">Price</label>
        <input type="number" name="price" id="price" step="0.01" v-model="price">
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea name="description" id="description" rows="5" v-model="description"></textarea>
      </div>
      <button class="btn" @click="onUpdateProduct">Update Product</button>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      const productId = params.id;
      const response = await $axios.$get('/api/admin/products/' + productId);
      return {
        title: response.product.title,
        imageUrl: response.product.imageUrl,
        price: response.product.price,
        description: response.product.description
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async onUpdateProduct() {
      try {
        const productId = this.$route.params.id;
        console.log(productId)
        const data = {
          title: this.title,
          imageUrl: this.imageUrl,
          price: this.price,
          description: this.description
        }
        const response = await this.$axios.$put(`/api/admin/products/${productId}`, data);
        this.$router.push('/admin/products');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

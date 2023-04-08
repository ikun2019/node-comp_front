<template>
  <main>
    <form class="product-form">
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

      <button class="btn" @click.prevent="onAddProduct">Add Product</button>
    </form>
  </main>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      title: '',
      imageUrl: '',
      price: 0,
      description: ''
    }
  },
  methods: {
    async onAddProduct() {
      try {
        const data = {
          title: this.title,
          imageUrl: this.imageUrl,
          price: this.price,
          description: this.description
        }
        console.log(data);
        let response = this.$axios.$post(process.env.BASE_URL + '/api/admin/add-product', data);
        this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

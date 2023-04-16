<template>
  <main>
    <form class="product-form">
      <div class="form-control">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" v-model="title">
      </div>
      <div class="form-control">
        <label for="image">Image</label>
        <input type="file" name="image" id="image" ref="fileInput">
      </div>
      <div class="form-control">
        <label for="price">Price</label>
        <input type="number" name="price" id="price" step="0.01" v-model="price">
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea name="description" id="description" rows="5" v-model="description"></textarea>
      </div>

      <button type="submit" class="btn" @click.prevent="onAddProduct">Add Product</button>
    </form>
  </main>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      title: '',
      image: '',
      price: 0,
      description: ''
    }
  },
  methods: {
    async onAddProduct() {
      try {
        const data = new FormData();
        data.append('title', this.title);
        data.append('image', this.$refs.fileInput.files[0]);
        data.append('price', this.price);
        data.append('description', this.description);
        console.log(this.$refs.fileInput.files[0]);
        let response = await this.$axios.$post(
          process.env.BASE_URL + '/api/admin/add-product',
          data,
          { 'Content-Type': 'multipart/form-data' }
        );
        this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

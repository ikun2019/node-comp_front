<template>
  <form>
    <div>
      <label for="title">Title</label><br>
      <input type="text" name="title" id="title" v-model="title">
    </div>
    <div>
      <label for="content">Content</label><br>
      <textarea name="content" id="content" cols="30" rows="10" v-model="content"></textarea>
    </div>
    <div>
      <label for="image">Image URL</label><br>
      <input type="file" name="image" id="image" @change="onFileChange">
    </div>
    <button type="submit" @click.prevent="onSubmit">Create</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      image: null,
    }
  },
  methods: {
    async onSubmit() {
      const formData = new FormData();
      formData.append('image', this.image);
      console.log('form data =>', formData);
      try {
        const headers = {
          Authorization: this.$auth.getToken('local'),
          'Content-Type': 'multipart/form-data',
        }
        // 画像のアップロード
        const response = await this.$axios.post('/upload', formData, { headers });
        const imageUrl = response.data.url;

        const mutation = `
          mutation($input: PostInputData!) {
            createPost(postInput: $input) {
              title
              content
              imageUrl
            }
          }
        `
        const variables = {
          input: {
            title: this.title,
            content: this.content,
            imageUrl: imageUrl,
          }
        }
        const graphqlResponse = await this.$axios.$post('/graphql', {
          query: mutation,
          variables: variables,
        });

        console.log('GraphQL Response =>', graphqlResponse);

        this.$router.push('/');
      } catch (err) {
        console.error(err);
      }
    },
    onFileChange(e) {
      this.image = e.target.files[0];
      console.log('this image =>', this.image);
    },
  },
}
</script>
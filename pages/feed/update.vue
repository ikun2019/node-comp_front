<template>
  <div>
    <h1>Update Post</h1>
    <form @submit.prevent="onSubmit">
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
        <br>
        {{ imageUrl }}
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postId: '',
      title: '',
      content: '',
      image: null,
      imageUrl: '',
    }
  },
  async asyncData({ $axios, query, app }) {
    const postId = query.id;
    try {
      const headers = {
        Authorization: app.$auth.getToken('local'),
        'Content-Type': 'application/json',
      }
      const query = `
        query($id: ID!) {
          getPost(id: $id) {
            id
            title
            content
            imageUrl
          }
        }
      `;
      const variables = {
        id: postId,
      };
      const response = await $axios.$post('/graphql', {
        query: query,
        variables: variables,
      }, { headers });
      return {
        title: response.data.getPost.title,
        content: response.data.getPost.content,
        imageUrl: response.data.getPost.imageUrl,
        postId: response.data.getPost.id,
      }
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    onFileChange(e) {
      this.image = e.target.files[0];
    },
    async onSubmit() {
      try {
        const formData = new FormData();
        formData.append('image', this.image);
        const headers = {
          Authorization: this.$auth.getToken('local'),
          'Content-Type': 'multipart/form-data',
        };
        let updatedImageUrl = '';
        if (this.image) {
          const imageResponse = await this.$axios.$post('/upload', formData, { headers });
          updatedImageUrl = imageResponse.data.url;
        } else {
          updatedImageUrl = this.imageUrl;
        }

        const mutation = `
          mutation($id: ID!, $input: PostInputData!) {
            updatePost(id: $id, postInput: $input) {
              title
              content
              imageUrl
            }
          }
        `;
        const variables = {
          id: this.postId,
          input: {
            title: this.title,
            content: this.content,
            imageUrl: updatedImageUrl,
          }
        }
        const graphqlResponse = await this.$axios.$post('/graphql', {
          query: mutation,
          variables: variables,
        });
        console.log(graphqlResponse);
        this.$router.push('/');
      } catch (err) {
        console.error(err);
        console.log(err.response.data);
      }
    }
  }
}
</script>
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
    <div>
      <img :src="imageUrl" alt="">
    </div>
    <nuxt-link :to="{ path: '/feed/update', query: { id: postId } }">Update</nuxt-link>
    <a href="#" @click.prevent="onDelete">Delete</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      imageUrl: '',
    }
  },
  async asyncData({ $axios, params, app }) {
    const postId = parseInt(params.id);
    const token = app.$auth.getToken('local');
    const headers = {
      Authorization: token,
      'Content-Type': 'application/json',
    }
    const query = `
      query {
        getPost(id: ${postId}){
          id
          title
          content
          imageUrl
        }
      }
    `
    const response = await $axios.$post('/graphql', {
      query: query,
    }, { headers });
    return {
      postId: response.data.getPost.id,
      title: response.data.getPost.title,
      content: response.data.getPost.content,
      imageUrl: response.data.getPost.imageUrl,
    }
  },
  methods: {
    async onDelete() {
      try {
        const headers = {
          Authorization: this.$auth.getToken('local'),
          'Content-Type': 'application/json',
        }
        const mutation = `
          mutation($id: ID!) {
            deletePost(id: $id)
          }
        `;
        const variables = {
          id: this.$route.params.id,
        };
        const response = await this.$axios.$post('/graphql', {
          query: mutation,
          variables: variables,
        }, { headers });
        console.log(response);
        this.$router.push('/feed/posts');
      } catch (err) {
        console.error(err);
      }
    }
  }
}

</script>

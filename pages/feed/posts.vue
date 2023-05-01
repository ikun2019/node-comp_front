<template>
  <div>
    <h1>Posts</h1>
    <div v-for="(post, index) in posts" :key="index">
      {{ post.title }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: []
    }
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$post('/graphql', {
        query: `
          query {
            getPosts {
              posts {
                id
                title
                content
              }
            }
          }
        `
      });
      return {
        posts: response.data.getPosts.posts,
      }
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

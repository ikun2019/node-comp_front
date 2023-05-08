<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
    <div>
      <img :src="imageUrl" alt="">
    </div>
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
          title
          content
          imageUrl
        }
      }
    `
    const response = await $axios.$post('/graphql', {
      query: query,
    }, { headers });
    console.log(response);
    return {
      title: response.data.getPost.title,
      content: response.data.getPost.content,
      imageUrl: response.data.getPost.imageUrl,
    }
  },
}

</script>

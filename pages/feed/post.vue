<template>
  <div>
    <div>
      <label for="title">Title</label>
      <input type="text" name="title" id="title" v-model="title">
    </div>
    <div>
      <label for="content">Content</label>
      <textarea name="content" id="content" cols="30" rows="10" v-model="content"></textarea>
    </div>
    <div>
      <label for="imageUrl">Image URL</label>
      <input type="text" name="imageUrl" id="imageUrl" v-model="imageUrl">
    </div>
    <button type="submit" @click="onSubmit">Create</button>
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
  methods: {
    async onSubmit() {
      try {
        const headers = {
          Authorization: this.$auth.getToken('local')
        }
        console.log(headers);
        const response = await this.$axios.$post('/graphql', {
          query: `
            mutation {
              createPost(postInput: { title: "${this.title}", content: "${this.content}", imageUrl: "${this.imageUrl}" }) {
                id
                title
                content
                imageUrl
                creator {
                  name
                }
                createdAt
              }
            }
          `
        }, { headers });
        window.console.log('response.data =>', response.data);
        this.$router.push('/');
      } catch (err) {
        console.error(err);
      }
    }
  },
}
</script>
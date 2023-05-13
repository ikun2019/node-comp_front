<template>
  <div>
    <h1>User Page</h1>
    <ul>
      <li>{{ name }}</li>
      <li>{{ email }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  async asyncData({ $axios, app }) {
    try {
      const headers = {
        Authorization: app.$auth.getToken('local'),
        'Content-Type': 'application/json',
      }
      const query = `
      query {
        user {
          id
          name
          email
        }
      }
      `;
      const response = await $axios.$post('/graphql', {
        query: query,
      }, { headers });
      return {
        name: response.data.user.name,
        email: response.data.user.email,
      }
    } catch (err) {

    }
  },
}
</script>

<template>
  <div>
    <h1>Posts</h1>
    <div v-for="(post, index) in posts" :key="index">
      {{ post.title }}
    </div>
    <pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="onPageChanged" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagenation.vue';
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      posts: [],
      currentPage: 1,
      totalPosts: 0,
    }
  },
  async asyncData({ $axios, query }) {
    try {
      const page = parseInt(query.page) || 1;
      const response = await $axios.$post('/graphql', {
        query: `
          query {
            getPosts(page: ${page}) {
              posts {
                id
                title
                content
              }
              totalPosts
              totalPages
            }
          }
        `
      });
      return {
        posts: response.data.getPosts.posts,
        totalPosts: response.data.getPosts.totalPosts,
        currentPage: page,
        totalPages: response.data.getPosts.totalPages,
      }
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    async onPageChanged(page) {
      this.currentPage = page;
      const response = await this.$axios.$post('/graphql', {
        query: `
          query {
              getPosts(page: ${page}) {
                posts {
                  id
                  title
                  content
                }
                totalPosts
              }
            }
        `
      });
      this.posts = response.data.getPosts.posts;
      this.$router.push(`/feed/posts?page=${page}`);
    }
  }
}
</script>

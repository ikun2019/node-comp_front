<template>
  <section class="pagination">
    <ul class="d-flex">
      <li v-for="(page, index) in pages" :key="index" class="d-block">
        <a @click.prevent="changePage(page)" href="#">{{ page }}</a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.pagination {
  margin-top: 2rem;
  text-align: center;
}

.d-flex {
  display: flex;
}

.d-block {
  display: block;
}

.pagination a {
  text-decoration: none;
  color: #00695c;
  padding: 0.5rem;
  border: 1px solid #00695c;
  margin: 0 1rem;
}

.pagination a:hover,
.pagination a:active,
.pagination a.active {
  background: #00695c;
  color: white;
}
</style>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    }
  },
  computed: {
    pages() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    changePage(page) {
      this.$emit('page-changed', page);
    }
  }
}
</script>

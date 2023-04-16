<template>
  <section class="pagination">
    <a v-if="pageData.currentPage !== 1 && pageData.previosPage !== 1" href="/?page=1">1</a>
    <template v-for="pageNumber in pageNumbers">
      <a v-if="pageNumber !== pageData.currentPage && pageNumber !== pageData.previosPage && pageNumber !== pageData.nextPage" :key="pageNumber" :href="'/?page=' + pageNumber">{{ pageNumber }}</a>
      <a v-else :key="pageNumber" :href="'/?page=' + pageNumber" class="active">{{ pageNumber }}</a>
    </template>
    <a v-if="pageData.hasNextPage" :href="'/?page=' + pageData.nextPage">{{ pageData.nextPage }}</a>
  </section>
</template>

<style scoped>
  .pagination {
    margin-top: 2rem;
    text-align: center;
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
  props: ['pageData'],
  computed: {
    pageNumbers() {
      let numbers = []
      for (let i = 1; i <= this.pageData.pageCount; i++) {
        numbers.push(i)
      }
      return numbers
    }
  }
}
</script>

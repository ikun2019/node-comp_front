<template>
  <header class="main-header">
    <nav class="main-header__nav">
      <ul class="main-header__item-list">
        <li class="main-header__item"><a href="/" :class="{ 'active': $route.path === '/'  }">Shop</a></li>
        <li class="main-header__item"><a href="/products" :class="{ 'active': $route.path === '/products' }">Products</a></li>
        <li v-if="$auth.state.loggedIn" class="main-header__item"><a href="/cart" class="{ 'active': $route.path === '/cart' }">Cart</a></li>
        <li v-if="$auth.state.loggedIn" class="main-header__item"><a href="/orders" class="{ 'active': $route.path === '/orders' }">Orders</a></li>
        <li v-if="$auth.state.loggedIn" class="main-header__item"><a href="/admin/add-product" :class="{ 'active': $route.path === '/admin/add-product' }">Add Product</a></li>
        <li v-if="$auth.state.loggedIn" class="main-header__item"><a href="/admin/products" class="{ 'active': $route.path === '/admin/products' }">Admin Products</a></li>
      </ul>
      <ul v-if="$auth.state.loggedIn" class="main-header__item-list">
        <li class="main-header__item">
          <a href="/logout" @click.prevent="onLogout">Logout</a>
        </li>
      </ul>
      <ul v-else class="main-header__item-list">
        <li class="main-header__item">
          <a href="/login" class="<%= path === '/login' ? 'active' : '' %>">Login</a>
        </li>
        <li class="main-header__item">
          <a href="/signup" class="<%= path === '/signup' ? 'active' : '' %>">Signup</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    async onLogout() {
      try {
        await this.$axios.$post('/api/auth/logout');
        await this.$auth.logout();
        this.$router.push('/login')
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

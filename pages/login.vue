<template>
  <main>
    <form class="login-form">
      <div class="form-control">
        <label for="email">E-mail</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password">
      </div>
      <button type="submit" class="btn">Login</button>
    </form>
    <div class="centered">
      <a href="/reset">Forgot your password?</a>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
    }
  }
}
</script>

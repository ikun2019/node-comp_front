<template>
  <main>
    <div v-if="errorMessage" class="user-message user-message--error">
      {{ errorMessage }}
    </div>
    <div class="login-form">
      <div class="form-control">
        <label for="email">E-mail</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password">
      </div>
      <span class="btn" @click="onLogin">Login</span>
    </div>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <div class="centered">
      <a href="/auth/reset">Forgot your password?</a>
    </div>
  </main>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data () {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async onLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$router.push('/');
      } catch (err) {
        this.errorMessage = "IDもしくはパスワードが間違っています。"
        this.$auth.logout();
      }
    }
  }
}
</script>

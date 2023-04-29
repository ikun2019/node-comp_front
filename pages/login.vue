<template>
  <main>
    <div v-if="errorMessage.length > 0" class="user-message user-message--error">
      {{ errorMessage }}
    </div>
    <div class="login-form">
      <div class="form-control">
        <label for="email">E-mail</label>
        <input type="email" name="email" v-model="email"
          :class="errorMessage.find(e => e.params === 'email') ? 'invalid' : ''">
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password">
      </div>
      <span class="btn" @click="onLogin">Login</span>
    </div>
    <p v-if="errorMessage.length > 0" style="color: red;">{{ errorMessage }}</p>
    <div class="centered">
      <a href="/auth/reset">Forgot your password?</a>
    </div>
  </main>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: []
    }
  },
  methods: {
    async onLogin() {
      try {
        const response = await this.$axios.$post('/graphql', {
          query: `
            mutation login($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                token
                user {
                  id
                  name
                  email
                }
              }
            }
          `,
          variables: {
            email: this.email,
            password: this.password,
          }
        });
        const token = response.data.login.token;
        const user = response.data.login.user;
        await this.$auth.setUser(user);
        await this.$auth.setToken('local', 'Bearer ' + token);
        this.$router.push('/');
      } catch (err) {
        this.errorMessage = err.response.data.errorMessage;
        this.$router.go(0);
      }
    }
  }
}
</script>

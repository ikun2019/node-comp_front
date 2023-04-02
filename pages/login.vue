<template>
  <main>
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
    <div class="centered">
      <a href="/reset">Forgot your password?</a>
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
    }
  },
  methods: {
    async onLogin() {
      try {
        let data = {
          email: this.email,
          password: this.password
        }
        let response = await this.$axios.$post('/api/login', data);
        console.log(response);
        // if (response.success) {
        //   this.$auth.loginWith('local', {
        //     data: {
        //       email: this.email,
        //       password: this.password
        //     }
        //   })
        // };
        this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<template>
  <main>
    <div class="login-form">
      <div class="form-control">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" v-model="name">
      </div>
      <div class="form-control">
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" v-model="email">
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password">
      </div>
      <div class="form-control">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword">
      </div>
      <span class="btn" @click="onSignup">Signup</span>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async onSignup() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        let response = await this.$axios.$post('/api/auth/signup', data);
        console.log(response);
        if (response.success) {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })
        };
        this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<template>
  <main>
    <div v-if="errorMessage" class="user-message user-message--error">
      {{ errorMessage }}
    </div>
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
        <input type="password" name="confirmPassword" id="confirmPassword" v-model="confirmPassword">
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
      password: '',
      errorMessage: '',
      confirmPassword: ''
    }
  },
  methods: {
    async onSignup() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        };
        let response = await this.$axios.$post('/graphql', {
          query: `
            mutation createUser(userInput: { email: "${this.email}", password: "${this.password}", name: "${this.name}"}){}
          `
        });
        if (response.success) {
          const loginResponse = await this.$axios.$post('/graphql', {
            query: `
              mutation login(email: "${this.email}", password: #${this.password}) {
                token
                user {
                  id
                  name
                  email
                }
              }
            `
          });
          const token = loginResponse.data.login.token;
          const user = loginResponse.data.login.user;
          await this.$auth.setUser(user);
          await this.$auth.setToken('local', 'Bearer ' + token);
        };
        this.$router.push('/');
      } catch (err) {
        this.errorMessage = err.response.data.errorMessage;
        this.$router.go(0);
      }
    }
  }
}
</script>

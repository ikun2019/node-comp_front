<template>
  <div class="login-form">
    <div class="form-control">
      <label for="password">Password</label>
      <input type="text" name="password" id="password" v-model="password">
    </div>
    <input type="hidden" name="resetToken" :value="resetToken"><br>
    <input type="hidden" name="userId" :value="userId">
    <button type="submit" class="btn" @click.prevent="onUpdatePassword">Update Password</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      resetToken: '',
      userId: ''
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const response = await $axios.$get(`/api/auth/new-password/${params.token}`);
      return {
        resetToken: response.resetToken,
        userId: response.userId
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async onUpdatePassword() {
      try {
        const data = {
          password: this.password,
          resetToken: this.resetToken,
          userId: this.userId
        }
        const response = await this.$axios.$post('/api/auth/new-password', data);
        this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

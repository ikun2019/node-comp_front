<template>
  <div class="login-form">
    <div class="form-control">
      <label for="password">Password</label>
      <input type="text" name="password" id="password">
    </div>
    <input type="hidden" name="resetToken" :value="resetToken"><br>
    <input type="hidden" name="userId" :value="userId">
    <button type="submit" class="btn">Update Password</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  }
}
</script>

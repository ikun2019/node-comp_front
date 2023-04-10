<template>
  <main>
    <div class="login-form">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" v-model="email">
      </div>
      <button type="submit" class="btn" @click="onResetMail">Reset</button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
      return {
        email: ''
      }
  },
  methods: {
    async onResetMail() {
      try {
        let data = {
          email: this.email
        }
        const response = await this.$axios.$post('/api/auth/reset', data);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

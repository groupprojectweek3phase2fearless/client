<template>
  <div class="home">
    <form @submit.prevent="register">
      <input 
        v-model="username"
        class="create-username-input"
        type="text" 
        placeholder="username">
      <!-- <input 
        class="create-username-input"
        type="submit"> -->
    </form>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      username: ''
    }
  },
  methods: {
    register() {
      localStorage.setItem('username', this.username)
      this.$store.commit('register', this.username)
      this.$store.dispatch('getAllRooms')
      this.username = ''
      this.$router.push('/lobby')
    }
  }
}
</script>

<style scoped>
  .create-room {
    display: flex;
    flex-direction: column;
    align-items: center
  }

  .create-room-input {
    width: 200px;
    margin: 5px
  }
</style>

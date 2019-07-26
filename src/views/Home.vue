<template>
  <div class="home">
    <!-- <form @submit.prevent="register">
      <input 
        v-model="username"
        class="create-username-input"
        type="text" 
        placeholder="username"> -->

      <!-- <input 
        class="create-username-input"
        type="submit"> -->

    <!-- </form> -->


    <!-- HENDRIX -->
    <div style="padding: 10%">
        <div class="title-container">
            <span style="font-size: 20pt;">Welcome to</span>
            <br>
            <span class="landing-title">¿ Yes or No ?</span>
            <br>
            <span style="font-size: 20pt;">Battleground</span>
        </div>

        <div>
            <b-form @submit.prevent="register">
                <b-form-group>
                    <b-form-input
                    id="inputName"
                    v-model="username"
                    type="text"
                    placeholder= "Input your name to play . . . 😜"
                    required
                    >
                    </b-form-input>
                </b-form-group>

                <b-button id="btn-submit" type="submit" variant="primary">Enter the Game</b-button>
            </b-form>
        </div>


        <div class="character" id="char-1">
            <img style="width: 100%;" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/b9cc6d42094811.57c019c3d3cab.gif" alt="">
        </div>
        
    </div>
    <!-- HENDRIX -->
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

  #inputName{
        width: 80%;
        margin: 0px auto 0px auto;
        text-align: center;
        height: 100px;
        font-size: 25pt;
    }

    .landing-title{
        font-size: 40pt;
    }

    .title-container{
        margin-bottom: 50px;
    }

    .character{
        position: fixed;
        bottom: 0;
        right: 0;
        width: 20%;
        z-index: -1;
    }

    #btn-submit{
        width: 200px;
        height: 50px;
        border-radius: 20px;
    }
</style>

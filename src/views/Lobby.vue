<template>
  <div style="padding: 5%; height: 100%;">
    <!-- Create Room
    <form @submit.prevent="createRoom">
      <input 
        class="create-room-input"
        v-model="roomName"
        type="text" 
        placeholder="Room Name">
      <input 
        class="create-room-input"
        type="submit">
    </form>
    <br><br>
    Available Room:
    <div style="display: flex; flex-direction: column; align-items: center">
      <RoomCard v-for='lobby in rooms' :key='lobby.id' :lobby='lobby'>
        <button v-if='lobby.players.length < 5' @click.prevent='joinRoom(lobby.id)'>Join!</button>
        <p v-if='lobby.players.length == 5'>Full</p>
      </RoomCard>
    </div> -->


    <!-- HENDRIX -->
        <div class="title-container">
            <span style="font-size: 20pt;">Hi, {{ playerName }} </span>
            <br>
            <span class="landing-title">¿ Are you ready to play ?</span>
        </div>

        <div style="height: 50%;">
            <span style="font-size: 20pt;">Select your room or create one</span>
            <br>

            <b-button v-b-modal.modal-add-room variant="success">&#10010; Add Room</b-button>
            
            <div id="room-container">
                <div v-for="(room, index) in rooms" :key="index" class="room">
                    <div style="padding:10px;">
                        <h3>{{ room.roomName }}</h3>
                        Player: {{ room.players.length }} / 50
                        <br>
                        <b-button :disabled="room.players.length == 50" variant="success" @click="joinRoom(room.id)">Join</b-button>
                    </div>
                </div>
            </div>
        </div>

        <add-room @addRoom="createRoom"></add-room>


        <div class="character" id="char-1">
            <img style="width: 100%;" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/d85d3942094811.57c019c5360b1.gif" alt="">
        </div>
    <!-- HENDRIX -->
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard'
import { mapState, mapMutations, mapActions } from 'vuex'
import AddRoom from "../components/AddRoom";

export default {
  data() {
    return {
      roomName: '',
      playerName: ''
    }
  },
  components: {
    RoomCard, AddRoom
  },
  methods: {
    createRoom(name) {
      this.$store.dispatch('createRoom', name)
      localStorage.setItem('room', name)
      // this.roomName = ''
    },

    joinRoom (roomId) {
      console.log(roomId);
      this.$store.dispatch('joinRoom', roomId);
    }
  },
  computed: {
    ...mapState(['rooms'])
  },
  created() {
    this.$store.dispatch('getAllRooms')
    this.playerName = localStorage.getItem('username');
  },
}
</script>

<style scoped>
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
  }

  .character:hover{
      display: none;
  }

  #btn-submit{
      width: 200px;
      height: 50px;
      border-radius: 20px;
  }

  #room-container{
      height: 50vh;
      border-top-left-radius: 50px;
      background-color: #36677c;
      text-align: center;
      max-width: 80%;
      margin: 50px auto 0px auto;
      overflow: auto;
  }

  .room{
      margin: 5% 10%;
      border-radius: 10px;
      background-color: antiquewhite;
  }
</style>

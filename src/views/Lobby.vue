<template>
  <div class="create-room">
    Create Room
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
    </div>
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      roomName: ''
    }
  },
  components: {
    RoomCard
  },
  methods: {
    createRoom() {
      this.$store.dispatch('createRoom', this.roomName)
      localStorage.setItem('room', this.roomName)
      this.roomName = ''
    },

    joinRoom (roomId) {
      this.$store.dispatch('joinRoom', roomId);
    }
  },
  computed: {
    ...mapState(['rooms'])
  },
  created() {
    this.$store.dispatch('getAllRooms')
  },
}
</script>

<style>

</style>

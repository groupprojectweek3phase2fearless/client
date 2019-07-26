import Vue from 'vue'
import Vuex from 'vuex'
import db from './firebase/config'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
    currentRoomId: '',
    currentPlayer: '',
    myRoom: {}
  },
  mutations: {
    register (state, playerName) {
      console.log('register kepanggil')
      console.log(playerName)
      state.currentPlayer = playerName
    },
    getRooms (state, data) {
      state.rooms = data
      if (localStorage.getItem('idRoom')) {
        let room = state.rooms.find(room => room.id === localStorage.getItem('idRoom'))
        state.myRoom = room
      }
    },
    myRoom (state, data) {
      state.myRoom = data
    }
  },
  actions: {
    createRoom ({ commit, state, dispatch }, roomName) {
      db.collection('rooms').add({
        roomName,
        players: [localStorage.getItem('username')],
        createdAt: new Date()
      })
        .then((docs) => {
          localStorage.setItem('idRoom', docs._key.path.segments[1])
          router.push(`/room/${docs._key.path.segments[1]}`)
          dispatch('getAllRooms')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getAllRooms ({ commit }) {
      db
        .collection('rooms')
        .orderBy('createdAt')
        .onSnapshot((docs) => {
          const data = []
          docs.forEach(e => {
            const info = e.data()
            info.id = e.id
            data.push(info)
          })
          commit('getRooms', data)
        }, (err) => {
          console.log(err)
        })
    },
    joinRoom ({ commit, state, dispatch }, roomId) {
      let newPlayers = state.rooms.find(room => room.id === roomId)
      // console.log(state.currentPlayer)
      // console.log(newPlayers)
      // newPlayers.players.push(state.currentPlayer)
      newPlayers.players.push(localStorage.username)
      localStorage.setItem('idRoom', roomId)

      db
        .collection('rooms')
        .doc(roomId)
        .update({
          players: newPlayers.players
        })
        .then(() => {
          dispatch('getAllRooms')
          router.push(`/room/${roomId}`)
          console.log(state.myRoom)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    currentRoom ({ commit, state }, roomId) {
      db.collection('rooms').get()
        .then((querySnapshot) => {
          console.log(querySnapshot)
          querySnapshot.forEach(doc => {
            if (doc.id === roomId) {
              commit('myRoom', doc.data())
            }
          })
        })
    }
  }
})

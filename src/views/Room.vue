<template>
  <div>
    You are in room: {{myRoom.roomName}}
    <ul>
      Players:
      <li
        v-for="(player, index) in myRoom.players"
        :key="index">
        {{ player }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['myRoom'])
  },
  created() {
    this.$store.dispatch('currentRoom', this.$route.params.id)
  }
}
</script>

<style>

</style>

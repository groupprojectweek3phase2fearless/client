<template>
  <div v-if='lobby.players.length' style="border: 1px solid black" class="card">
    <div>
      <h2>Room:  {{lobby.roomName}}</h2>
    </div>
    <div>
      <h6>Players:  {{lobby.players.length}}/5</h6>
    </div>
    <div>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['lobby']
}
</script>

<style scoped>
  .card {
    width: 200px;
  }
</style>

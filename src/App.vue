<script setup lang="ts">
import GameField from './components/GameField.vue'

const stageSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}
</script>

<template>
  <main>
    <v-stage :config="stageSize">
      <v-layer>
        <GameField />
      </v-layer>
    </v-stage>
  </main>
</template>

<style scoped></style>

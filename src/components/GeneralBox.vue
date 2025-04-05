<script setup lang="ts">
const config = {
  x: 1,
  y: 1,
  width: 20,
  height: 20,
  fill: '#c6c6c6',
  stroke: '#808080',
  strokeWidth: 2,
}

function tap() {
  console.log('tap')
}
</script>

<template>
  <v-rect :config="config" @mousedown="tap"></v-rect>
</template>

<script setup lang="ts">
defineProps<{
  id: number;
}>();

defineEmits<{
  "click:moveUp": [id: number];
  "click:moveDown": [id: number];
}>();
</script>

<template>
  <div class="post">
    <h2>Post {{ id }}</h2>
    <button @click="$emit('click:moveUp', id)" :hidden="id === 0">Up</button>
    <button @click="$emit('click:moveDown', id)">Down</button>
  </div>
</template>

<style scoped>
.post {
  border: 1px solid #ccc;
  padding: 1em;
  margin: 1em 0;
}
</style>

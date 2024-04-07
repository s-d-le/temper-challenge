<script setup lang="ts">
import Card from "./Card.vue";

defineProps<{
  id: number;
  hideUpButton?: boolean;
  hideDownButton?: boolean;
}>();

defineEmits<{
  "click:moveUp": [id: number];
  "click:moveDown": [id: number];
}>();
</script>

<template>
  <Card class="flex justify-between p-6">
    <h2>Post {{ id }}</h2>
    <div class="flex flex-col gap-y-3 justify-center">
      <button
        data-testid="button-up"
        @click="$emit('click:moveUp', id)"
        v-if="!hideUpButton"
      >
        <div class="triangle"></div>
      </button>
      <button
        data-testid="button-down"
        @click="$emit('click:moveDown', id)"
        v-if="!hideDownButton"
      >
        <div class="triangle down"></div>
      </button>
    </div>
  </Card>
</template>

<style scoped>
.triangle {
  border-right: 2px solid;
  border-bottom: 2px solid;
  height: 10px;
  width: 10px;
  transform: rotate(-135deg);
  border-color: blueviolet;

  &.down {
    transform: rotate(45deg);
  }
}
</style>

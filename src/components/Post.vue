<script setup lang="ts">
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
  <div
    class="flex justify-between text-neutral-500 bg-white border border-slate-100 rounded-md p-6 m-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.07)]"
  >
    <h2>Post {{ id }}</h2>
    <div class="flex flex-col gap-y-3 justify-center">
      <button @click="$emit('click:moveUp', id)" v-if="!hideUpButton">
        <div class="triangle"></div>
      </button>
      <button @click="$emit('click:moveDown', id)" v-if="!hideDownButton">
        <div class="triangle down"></div>
      </button>
    </div>
  </div>
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

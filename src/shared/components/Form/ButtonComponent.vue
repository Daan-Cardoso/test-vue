<template>
  <button class="
    bg-indigo-600
    border-transparent
    cursor-pointer
    font-medium
    hover:bg-indigo-700
    inline-block
    px-4
    py-2
    rounded-md
    text-white
  "
  :class="customClass"
  >
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<script setup lang="ts">
  defineProps<{
    text: string;
    customClass?: string;
  }>();
</script>

<style scoped>

</style>
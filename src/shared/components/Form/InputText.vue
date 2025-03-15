<template>
  <label class="block relative">
    <!-- Todo - Add label -->
    <input type="text" class="
      block
      border-gray-300
      focus:border-indigo-500
      focus:outline-none
      focus:ring-2
      focus:ring-indigo-500
      h-full
      px-4
      py-2
      rounded-md
      shadow-sm 
      text-gray-700
      text-s
      w-full
    "
    :placeholder
    :maxlength
    :class="customClass"
    />

    <!-- Todo - Add error message -->
  </label>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  label?: string;
  errorMessage?: string;
  customClass?: string;
  placeholder?: string;
  maxlength?: string | number;
}>();
</script>

<style scoped>

</style>
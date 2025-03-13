<template>
  <thead>
    <tr>
      <th
        v-for="({ text, alignment, width }, i) in columns" 
        :key="i"
        :class="`border-b-2 border-gray-300 p-4 text-${alignment || 'left'} w-[${width || 'auto'}]`"
      >
        {{ text }}
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">

defineProps<{
  columns: {
    text: string;
    alignment?: 'left' | 'right' | 'center';
    width?: string;
  }[];
}>()
</script>
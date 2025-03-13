<template>
  <thead>
    <tr>
      <th
        v-for="({ text, alignment }, i) in columns" 
        :key="i"
        :class="`border-b-2 border-gray-300 p-4 text-${alignment || 'left'}`"
      >
        {{ text }}
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">

const getAlignmentClass = (alignment: 'left' | 'right' | 'center') => {
  switch (alignment) {
    case 'left':
      return 'text-left';
    case 'right':
      return 'text-right';
    case 'center':
      return 'text-center';
  }
}

defineProps<{
  columns: {
    text: string;
    alignment?: 'left' | 'right' | 'center';
  }[];
}>()

</script>
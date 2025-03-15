<template>
  <thead>
    <tr>
      <th
        v-for="({ text, alignment, colspan, sortable, sortKey }, i) in columns"
        :key="i"
        :class="[
          'border-b-2 border-gray-300 p-2 md:p-4',
          alignmentClass(alignment)
        ]"
        :style="{ width: colspan,  }"
      >
        {{ text }}

        <Icon
          v-if="sortable"
          :name="sortIcon(order)"
          :custom-class="`
            block
            cursor-pointer
            hover:text-gray-400
            md:size-4
            mr-2
            size-4
            text-gray-600
            ${order === 'desc' ? 'transform rotate-180' : ''}
          `"
          icon-class="w-full"
          @click="onSort(sortKey)"
        />
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import Icon from '@/shared/components/Icon';
import { defineEmits } from 'vue';
import type { tItem } from './types';

defineProps<{
  order?: 'asc' | 'desc';
  columns: {
    text: string;
    alignment?: 'left' | 'right' | 'center';
    colspan?: string;
    sortable?: boolean;
    sortKey?: keyof tItem;
  }[];
}>();

const emit = defineEmits<{
  (event: 'sort', sortKey?: keyof tItem): void;
}>();

const alignmentClass = (alignment: 'left' | 'right' | 'center' | undefined) => {
  return {
    'text-left': alignment === 'left' || !alignment,
    'text-right': alignment === 'right',
    'text-center': alignment === 'center',
  };
};

const sortIcon = (order: 'asc' | 'desc' | undefined) => {
  const icons = {
    'asc': 'arrow-up',
    'desc': 'arrow-up',
  }

  if (!order || !icons[order]) return 'arrow-up-down';

  return icons[order];
};

const onSort = (sortKey?: keyof tItem) => {
  emit('sort', sortKey);
};
</script>
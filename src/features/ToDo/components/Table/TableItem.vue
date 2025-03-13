<template>
  <tr class="h-full" :class="[checked ? 'bg-green-200' : 'bg-gray-200']">
    <td class="p-4 rounded-tl-lg rounded-bl-lg">
      <input type="checkbox" @change="$emit('check', id)" :checked="checked" />
    </td>

    <td class="p-4">
      <span classw-xs="w-xs md:w-lg inline-block" :class="{ 'line-through ' : checked }">{{ text }}</span>
    </td>

    <td class="py-4 px-2 rounded-tr-lg rounded-br-lg">
      <Icon
        name="pencil-square"
        :size="22"
        custom-class="text-gray-600 hover:text-gray-400 cursor-pointer block mr-2"
        @click="$emit('edit', id)"
      />

      <Icon
        name="trash"
        :size="22"
        custom-class="text-red-600 hover:text-red-400 cursor-pointer block"
        @click="$emit('delete', id)"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Icon from "@/shared/components/Icon/IconComponent.vue";

defineEmits<{
  (event: 'edit', id: number): void;
  (event: 'delete', id: number): void;
  (event: 'check', id: number): void;
}>()

defineProps<{
  id: number;
  text: string;
  checked: boolean;
}>()

</script>

<style scoped>
</style>

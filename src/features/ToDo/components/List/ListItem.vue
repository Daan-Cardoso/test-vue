<template>
  <tr>
    <td>
      <input type="checkbox" @change="$emit('check', id)" :checked="checked" />
    </td>
    <td>
      <span :class="{ checked }">
        {{ text }}
      </span>
    </td>
    <td>
      <button @click="$emit('edit', id)">edit</button>
      <button @click="$emit('delete', id)">delete</button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineEmits<{
  (event: 'edit', id: number): void;
  (event: 'delete', id: number): void;
  (event: 'check', id: number): void;
}>()

const props = defineProps<{
  id: number;
  text: string;
  checked: boolean;
}>()

</script>

<style scoped>
.checked {
  text-decoration: line-through;
}
</style>

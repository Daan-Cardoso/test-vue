<template>
  <tr
    class="h-full text-gray-700 text-sm md:text-base"
    :class="[checked ? 'bg-green-200' : 'bg-gray-200']"
  >
    <td class="
      md:p-4
      p-2
      rounded-bl-lg
      rounded-tl-lg
    ">
      <Form.Checkbox @change="$emit('check', id)" :checked="checked" />
    </td>

    <td class="p-2 md:p-4">
      <span class="inline-block w-full" :class="{ 'line-through' : checked }">
        {{ text }}
      </span>
    </td>

    <td class="p-2 md:p-4">
      <span class="inline-block w-full">
        <!-- {{ formatDate(finished_at) }} -->
        {{ finished_at }}
      </span>
    </td>

    <td class="p-2 md:py-4 px-2 rounded-tr-lg rounded-br-lg">
      <Icon
        name="pencil-square"
        custom-class="
          block
          cursor-pointer
          hover:text-gray-400
          md:size-6
          mr-2
          size-4
          text-gray-600
        "
        icon-class="w-full"
        @click="$emit('edit', id)"
      />

      <Icon
        name="trash"
        custom-class="
          block
          cursor-pointer
          hover:text-red-400
          md:size-6
          size-4
          text-red-600
        "
        icon-class="w-full"
        @click="$emit('delete', id)"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import Icon from "@/shared/components/Icon";
import Form from '@/shared/components/Form';
import moment from 'moment';

defineEmits<{
  (event: 'edit', id: number): void;
  (event: 'delete', id: number): void;
  (event: 'check', id: number): void;
}>()

defineProps<{
  id: number;
  text: string;
  finished_at: string;
  checked: boolean;
}>()

const formatDate = (date: string) => {
  return moment(date, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");
}

</script>

<style scoped>
</style>

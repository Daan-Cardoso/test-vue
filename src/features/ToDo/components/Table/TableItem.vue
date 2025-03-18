<template>
  <tr
    class="h-full text-gray-700 text-xs md:text-base"
    :class="[checked ? 'bg-green-200' : 'bg-gray-200']"
  >
    <td class="
      md:p-4
      p-2
      rounded-bl-lg
      rounded-tl-lg
    ">
      <Form.Checkbox @change.prevent.stop="$emit('check', id)" :checked="checked" />
    </td>

    <td class="p-2 md:p-4">
      <span class="inline-block w-full" :class="{ 'line-through' : checked }">
        {{ text }}
      </span>
    </td>

    <td class="p-2 md:p-4">
      <span class="inline-block w-full">
        {{ formatDate(finished_at) }}
      </span>
    </td>

    <td class="py-2 md:py-4 px-1 rounded-tr-lg rounded-br-lg">
      <Icon
        name="pencil-square"
        custom-class="
          inline-block
          cursor-pointer
          hover:text-gray-400
          md:mr-2
          md:size-6
          mr-1
          size-4
          text-gray-600
        "
        icon-class="w-full"
        @click.prevent.stop="$emit('edit', id)"
      />

      <Icon
        name="trash"
        custom-class="
          inline-block
          cursor-pointer
          hover:text-red-400
          md:size-6
          size-4
          text-red-600
        "
        icon-class="w-full"
        @click.prevent.stop="$emit('delete', id)"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
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
  if (!date) return '';
  return moment(date, "DD/MM/YYYY HH:mm:ss").format("DD/MM/YYYY");
}

</script>

<style scoped>
</style>

<template>
  <label>
    <span class="block text-sm font-medium text-gray-700 mb-2">{{ placeholder }}</span>

    <select
      :placeholder
      :value="modelValue" 
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="
        bg-white
        block
        border
        border-gray-300
        focus:border-indigo-500
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-500
        leading-6
        md:w-sm
        px-4
        py-2
        rounded-lg
        text-base
        text-gray-700
        w-full
      "
    >
      <option 
        v-for="({ text, value, disabled }) in options" 
        :key="value" 
        :value
        :disabled
        class="bg-gray-100 text-gray-700"
      >
        {{ text }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue']);

defineProps<{
  modelValue: string;
  placeholder?: string;
  options: { text: string; value: string; disabled?: boolean }[];
}>();
</script>

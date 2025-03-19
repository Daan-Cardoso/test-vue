<template>
  <label class="flex flex-col gap-1 w-full">
    <span
      class="
        block
        font-bold
        md:text-base
        pb-1
        text-gray-700
        text-xs
      "
      v-if="label"
    >
      {{ label }} <span class="text-red-400" v-if="required">*</span>
    </span>

    <input
      :type
      class="
        bg-white
        block
        border-2
        border-gray-200
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
        w-full
      "
      :name
      :placeholder
      :maxlength
      :disabled
      :required
      :readonly
      :class="[customClass, errorClass]"
      @input="onInput"
      :value="modelValue"
    />

    <span class="text-xs md:text-base text-red-400 block p-1" v-if="errorMessage">
      {{ errorMessage }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label?: string;
  errorMessage?: string;
  customClass?: string;
  placeholder?: string;
  maxlength?: string | number;
  modelValue: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  name?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const errorClass = computed(() => {
  if (props.errorMessage) {
    return {
      'border-red-400': true,
      'focus:ring-red-500': true,
      'focus:border-red-500': true,
      'text-red-500': true,
    };
  }
});
</script>

<style scoped>

</style>
<template>
  <label class="flex flex-col gap-1">
    <span class="text-xs md:text-base text-gray-700 font-bold pb-1 block" v-if="label">
      {{ label }} <span class="text-red-400" v-if="required">*</span>
    </span>

    <input type="text" class="
      block
      border-gray-200
      border-2
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
    :placeholder
    :maxlength
    :required
    :disabled
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
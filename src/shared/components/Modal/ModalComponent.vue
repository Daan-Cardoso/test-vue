<template>
  <div class="w-screen h-screen absolute top-0 left-0 bg-black/40 flex justify-center items-center gap-10">
    <div class="w-full md:w-1/2 bg-white p-4 rounded-lg" v-if="open">
      <header class="flex justify-between items-center border-b border-gray-300 border-b-2 pb-4 mb-4">
        <h2 class="text-lg font-bold">{{ title }}</h2>
        <Icon
          name="x-mark"
          custom-class="w-6 h-6 cursor-pointer"
          @click="$emit('close')"
        />
      </header>
      
      <slot name="body">
        <div>
          <slot />
        </div>
      </slot>

      <footer class="flex justify-end mt-4 gap-4">
        <Form.Button
          custom-class="w-full md:w-auto md:h-full bg-red-600 hover:bg-red-700"
          text="Cancelar"
          @click="$emit('close')"
        />

        <Form.Button
          custom-class="w-full md:w-auto md:h-full"
          text="Confirmar"
          @click="$emit('confirm')"
        />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import Form from '@/shared/components/Form';
import Icon from '@/shared/components/Icon';

defineProps<{
  open: boolean;
  title?: string;
}>();

defineEmits(['close', 'confirm']);
</script>
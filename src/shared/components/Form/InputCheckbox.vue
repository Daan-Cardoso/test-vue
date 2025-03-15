<template>
  <label class="flex items-center justify-center cursor-pointer">
    <input
      type="checkbox"
      class="hidden"
      :checked="checked"
    />

    <span
      class="
        bg-white
        block
        border
        border-gray-300
        flex
        items-center
        justify-center
        md:size-8
        rounded-full
        size-6
      "
      @click="$emit('update:checked', !checked)"
    >
      <Transition name="fade">
        <Icon name="check" class="text-green-500 size-5" v-if="checked" />
      </Transition>
    </span>

    <slot></slot>
  </label>
</template>

<script setup lang="ts">
import Icon from '@/shared/components/Icon';

defineProps<{ checked: boolean }>();

defineEmits(["update:checked"]);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
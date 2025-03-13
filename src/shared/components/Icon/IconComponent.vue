<template>
  <span
    v-if="iconContent"
    v-html="iconContent"
    class="icon"
    :class="customClass"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      display: 'inline-block',
    }"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const icons = import.meta.glob("../../assets/icons/*.svg", { eager: true, as: "raw" });

const props = withDefaults(
  defineProps<{
    customClass?: string;
    name: string;
    size?: number | string;
  }>(),
  {
    size: 24,
  }
);

const iconContent = computed(() => {
  return icons[`../../assets/icons/${props.name}.svg`] || "";
});
</script>

<style scoped>

</style>

<template>
  <span
    v-if="iconContent"
    v-html="iconContent"
    class="icon inline-flex items-center justify-center"
    :class="customClass"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const icons = import.meta.glob("../../assets/icons/*.svg", { eager: true, as: "raw" });

const props = 
  defineProps<{
    customClass?: string;
    iconClass?: string;
    name: string;
  }>();

const iconContent = computed(() => {
  let rawSvg = icons[`../../assets/icons/${props.name}.svg`] || "";

  if (rawSvg)
    rawSvg = rawSvg.replace(/<svg([^>]+)>/, `<svg$1 class="block mx-auto ${props.iconClass || ""}">`);

  return rawSvg;
});
</script>

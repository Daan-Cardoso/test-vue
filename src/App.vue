<template>
  <div>
    <h1 class="text-xl font-medium text-black">Vue 3 + Vite + TypeScript</h1>

    <input type="text" class="
      block
      border-gray-300

      focus:border-indigo-300
      focus:ring
      focus:ring-indigo-200
      focus:ring-opacity-50

      mt-1 
      p-2
      rounded-md
      shadow-sm 
      sm:text-sm
      text-gray-700

      w-full
    "
      v-model="input"
    />

    <button class="
      bg-indigo-600
      border-transparent
      font-medium
      hover:bg-indigo-700
      inline-block
      mt-4
      px-4
      py-2
      rounded-md
      text-white
    "
      @click="add"
    >
      Adicionar
    </button>

    <div class="mt-4">
      <ul>
        <li v-for="item in filteredItems" :key="item.id">
          {{ item.name }} - {{ item.created_at }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import moment from 'moment'

const input = ref<string>('')
const items = ref<{ id: number, name: string, created_at: string }[]>([])
let id = 0

const add = () => {
  if (!input.value) return window.alert('Campo obrigatório')

  items.value.push({ id: id++, name: input.value, created_at: moment().format('DD/MM/YYYY HH:mm:ss') })
  input.value = ''
}

const filteredItems = computed(() => {
  return items.value
    .sort((a, b) => moment(b.created_at, 'DD/MM/YYYY HH:mm:ss').diff(moment(a.created_at, 'DD/MM/YYYY HH:mm:ss')))
})
</script>

<style scoped>  
</style>

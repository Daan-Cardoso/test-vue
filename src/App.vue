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
      <table class="w-full">
        <thead>
          <tr>
            <th class="text-left">Tarefa</th>
            <th class="text-left">Data de criação</th>
          </tr>
        </thead>
        <tbody>
          <ListItem
            v-for="({ id, text, checked }) in filteredItems"
            :key="id"
            :id="id"
            :text="text"
            :checked="checked"
            @edit="logItems"
            @delete="onDelete"
            @check="onCheck"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import moment from 'moment'
import ListItem from '@/features/ToDo/components/List/ListItem.vue'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'

const input = ref<string>('')

type tItem = {
  id: number;
  text: string;
  created_at: string;
  checked: boolean;
}
const { data } = useLocalStorage('todo', [])

const items = ref<tItem[]>(data.value)

let id = 1

const add = () => {
  if (!input.value) return window.alert('Campo obrigatório')

  items.value.push({
    id: id++, 
    text: input.value, 
    created_at: moment().format('DD/MM/YYYY HH:mm:ss'), 
    checked: false
  })

  input.value = ''
}

const filteredItems = computed(() => {
  return items.value
    .sort((a: tItem, b: tItem) => moment(b.created_at, 'DD/MM/YYYY HH:mm:ss').diff(moment(a.created_at, 'DD/MM/YYYY HH:mm:ss')))
})

const logItems = () => console.log(items.value)

const onCheck = (id: number) => {
  const item = items.value.find((item: tItem) => item.id === id)

  if (!item) return

  item.checked = !item.checked
}

const onDelete = (id: number) => {
  const index = items.value.findIndex((item: tItem) => item.id === id)

  if (index === -1) return

  items.value.splice(index, 1)


}
</script>

<style scoped>
</style>

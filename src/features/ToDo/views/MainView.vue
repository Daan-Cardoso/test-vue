<template>
  <div class="@container p-4 md:p-10">
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
      placeholder="O que você precisa fazer?"
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
      w-full

      md:w-auto
    "
      @click="add"
    >
      Adicionar
    </button>

    <label>
      filtrar por: concluído
      
      <input type="checkbox" v-model="filterDone" />
    </label>

    <div class="mt-4">
      <Table.Root>
        <Table.Header :columns="(
          [
            { text: 'Status' },
            { text: 'Tarefa', width: '95%' },
            { text: 'Ações', alignment: 'right' }
          ])"
        />
        <Table.Body>
          <TransitionGroup name="fade-slide" :duration="300">
            <Table.Item
              v-for="({ id, text, checked }) in filteredItems"
              :key="id"
              :id
              :text
              :checked
              @delete="onDelete"
              @check="onCheck"
            />
          </TransitionGroup>
        </Table.Body>
      </Table.Root>
    </div>
  </div>
</template>

<script setup lang="ts">
import Table from '../components/Table'
import moment from 'moment'
import { computed, ref } from 'vue'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'

const input = ref<string>('')
const filterDone = ref<boolean>(false)

type tItem = {
  id: number;
  text: string;
  created_at: string;
  checked: boolean;
}

const todo = useLocalStorage('todo', [])

const items = ref<tItem[]>(todo.data.value)

const filteredItems = computed(() => {
  return items.value
    .filter((item) => filterDone.value ? item.checked : true)
    .sort((a, b) => moment(b.created_at, 'DD/MM/YYYY HH:mm:ss').diff(moment(a.created_at, 'DD/MM/YYYY HH:mm:ss')))
})

const add = () => {
  if (!input.value) return window.alert('Campo obrigatório')

  items.value.push({
    id: moment().valueOf(), 
    text: input.value, 
    created_at: moment().format('DD/MM/YYYY HH:mm:ss'), 
    checked: false
  })

  input.value = ''
}

const onCheck = (id: number) => {
  const item = items.value.find((item) => item.id === id)

  if (!item) return

  item.checked = !item.checked
}

const onDelete = (id: number) => {
  const index = items.value.findIndex((item) => item.id === id)

  if (index === -1) return

  items.value.splice(index, 1)
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>

<template>
  <div class="@container p-4 md:p-10">

    <header class="flex flex-col md:flex-row align-center gap-4 md:h-12">
      <Form.Input
        v-model="input"
        placeholder="Descrição da tarefa"
        maxlength="256"
        class="w-full md:h-full"
      />
      
      <Form.Button
        custom-class="w-full md:w-auto md:h-full"
        text="Adicionar"
        @click="add"
      />
    </header>

    <Form.Select
      v-model="filterByStatus"
      placeholder="Filtrar por"
      class="block mt-2"
      :options="[
        { text: 'Selecione uma opção', value: '', disabled: true },
        { text: 'Todos', value: 'Todos' },
        { text: 'Concluído', value: 'Concluído' },
        { text: 'Pendente', value: 'Pendente' }
      ]"
    />

    <div class="mt-4">
      <Table.Root>

        <Table.Header
          class="sticky top-0 bg-white"
          @sort="onSort"
          :columns="(
          [
            { text: 'Status', colspan: '5%' },
            { text: 'Tarefa', colspan: '70%', alignment: 'left' },
            { text: 'Finalizado em', colspan: '25%', alignment: 'left', sortable: true, sortKey: 'finished_at' },
            { text: 'Ações', alignment: 'right' }
          ])"
          :order
        />

        <Table.Body>
          <TransitionGroup name="fade-slide" :duration="200">
            <Table.Item
              v-for="({ id, text, checked, finished_at }) in filteredItems"
              v-if="filteredItems.length"
              :key="id"
              :id
              :text
              :checked
              :finished_at
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
import Form from '@/shared/components/Form'
import type { tItem } from '../components/Table/types'
import moment from 'moment'
import { computed, ref } from 'vue'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'

const input = ref<string>('')
const filterByStatus = ref<string>('')
const order = ref<'asc' | 'desc' | undefined>()
const orderBy = ref<keyof tItem>()

const todo = useLocalStorage('todo', [])

const items = ref<tItem[]>(todo.data.value)

const filteredItems = computed(() => {
  return items.value
    .filter((item) => {
      const status = item.checked ? 'Concluído' : 'Pendente'

      return status === filterByStatus.value || filterByStatus.value === 'Todos' || !filterByStatus.value
    })
    .sort((a, b) => {
      if (orderBy.value && orderBy.value === 'finished_at') {
        if (b.finished_at === '') return -1
        if (a.finished_at === '') return 1
        if (order.value === 'asc') return moment(b.finished_at, 'DD/MM/YYYY HH:mm:ss').diff(moment(a.finished_at, 'DD/MM/YYYY HH:mm:ss'))
        if (order.value === 'desc') return moment(a.finished_at, 'DD/MM/YYYY HH:mm:ss').diff(moment(b.finished_at, 'DD/MM/YYYY HH:mm:ss'))

        return moment(b.finished_at, 'DD/MM/YYYY HH:mm:ss').diff(moment(a.finished_at, 'DD/MM/YYYY HH:mm:ss'))
      }
      return moment(b.created_at, 'DD/MM/YYYY HH:mm:ss').diff(moment(a.created_at, 'DD/MM/YYYY HH:mm:ss'))
    })
})

const add = () => {
  if (!input.value) return window.alert('Campo obrigatório')

  items.value.push({
    id: moment().valueOf(), 
    text: input.value, 
    created_at: moment().format('DD/MM/YYYY HH:mm:ss'), 
    checked: false,
    finished_at: '',
  })

  input.value = ''
}

const onCheck = (id: number) => {
  const item = items.value.find((item) => item.id === id)

  if (!item) return

  item.checked = !item.checked
  item.finished_at = item.checked ? moment().format('DD/MM/YYYY HH:mm:ss') : ''
}

const onDelete = (id: number) => {
  const index = items.value.findIndex((item) => item.id === id)

  if (index === -1) return

  items.value.splice(index, 1)
}

const onSort = (sortKey?: keyof tItem) => {
  orderBy.value = sortKey

  switch(order.value) {
    case 'asc':
      order.value = 'desc'
      break
    case 'desc':
      order.value = undefined
      orderBy.value = undefined
      break
    default:
      order.value = 'asc'
  }
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

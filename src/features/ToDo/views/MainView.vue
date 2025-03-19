<template>
  <div class="@container p-4 md:p-10 relative">
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
        @click="onAdd"
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
            { text: 'Tarefa', colspan: '50%', alignment: 'left' },
            { text: 'Finalizado em', colspan: '45%', alignment: 'left', sortable: true, sortKey: 'finished_at' },
            { text: 'Ações', alignment: 'right' }
          ])"
          :order
        />

        <Table.Body>
          <TransitionGroup name="fade-slide" :duration="300">
            <Table.Item
              v-for="({ id, text, checked, finished_at }) in filteredItems"
              v-if="![].length"
              :key="id"
              :id
              :text
              :checked
              :finished_at
              @edit="handleEdit"
              @delete="onDelete"
              @check="onCheck"
            />
          </TransitionGroup>
        </Table.Body>

      </Table.Root>
    </div>

    <Modal
      :open="isEditModalOpen"
      @close="isEditModalOpen = false"
      title="Editar tarefa"
      v-if="isEditModalOpen"
      @confirm="onEdit"
    >
      <div class="flex flex-col md:flex-row align-center gap-4">
        <Form.Input
          v-model="itemToEdit.text"
          required
          placeholder="Descrição da tarefa"
          maxlength="256"
          class="w-full md:h-full"
        />
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Form from '@/shared/components/Form'
import Modal from '@/shared/components/Modal'
import Table from '../components/Table'
import moment from 'moment'
import type { tItem } from '@/features/ToDo/types'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { useWebSocket } from '@/features/ToDo/hooks/useWebsocket'
import services from '@/features/ToDo/services'

const input = ref<string>('')
const filterByStatus = ref<string>('')
const order = ref<'asc' | 'desc' | undefined>()
const orderBy = ref<keyof tItem>()
const isEditModalOpen = ref(false)
const itemToEdit = ref<tItem>({ id: 0, text: '', checked: false, created_at: '', finished_at: '' })

const { isConnected, messages, sendMessage, connect } = useWebSocket("ws://localhost:3000");

const { data: todo, setItem: updateTasks } = useLocalStorage('todo', [])
const items = ref<tItem[]>(todo.value)

onMounted(() => {
  connect();
});

watch(isConnected, (connected) => {
  if (connected) {
    sendMessage({ type: "fetchTasks" });
  }
});

watch(messages.value, (newMessages) => {
  if (newMessages.length > 0) {
    const lastMessage = newMessages[newMessages.length - 1];

    if (lastMessage.type === "tasks") {
      items.value = lastMessage.data;
      updateTasks(lastMessage.data)
    }
  }
});

const filteredItems = computed(() => {
  return items?.value?.filter((item) => {
      const status = item.checked ? 'Concluído' : 'Pendente'

      return status === filterByStatus.value || filterByStatus.value === 'Todos' || !filterByStatus.value
    })?.sort((a, b) => {
      if (orderBy.value && orderBy.value === 'finished_at') {
        if (b.finished_at === '') return -1
        if (a.finished_at === '') return 1
        if (order.value === 'asc') return moment(a.finished_at, 'DD/MM/YYYY HH:mm:ss').diff(moment(b.finished_at, 'DD/MM/YYYY HH:mm:ss'))
        if (order.value === 'desc') return moment(b.finished_at, 'DD/MM/YYYY HH:mm:ss').diff(moment(a.finished_at, 'DD/MM/YYYY HH:mm:ss'))

        return moment(b.finished_at, 'DD/MM/YYYY HH:mm:ss').diff(moment(a.finished_at, 'DD/MM/YYYY HH:mm:ss'))
      }
      return moment(b.created_at, 'DD/MM/YYYY HH:mm:ss').diff(moment(a.created_at, 'DD/MM/YYYY HH:mm:ss'))
    })
})

const onAdd = async () => {
  if (!input.value) return window.alert('Campo obrigatório')

  const item = {
    id: moment().valueOf(),
    text: input.value,
    created_at: moment().format('DD/MM/YYYY HH:mm:ss'),
    checked: false,
    finished_at: '',
  }

  input.value = ''

  await services.addTask(item)
    .catch(error => console.error(error))
}

const onCheck = async (id: number) => {

  const item = items.value.find((item) => item.id === id)

  if (!item) return

  item.checked = !item.checked
  item.finished_at = item.checked ? moment().format('DD/MM/YYYY HH:mm:ss') : ''

  await services.updateStatus(id, item.checked)
    .catch(error => console.error(error))
}

const onDelete = async (id: number) => {
  const index = items.value.findIndex((item) => item.id === id)

  if (index === -1) return

  await services.deleteTask(id)
    .catch(error => console.error(error))
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

const handleEdit = (id: number) => {
  const item = items.value.find((item) => item.id === id)

  if (!item) return

  itemToEdit.value = item
  isEditModalOpen.value = true
}

const onEdit = async () => {
  const item = itemToEdit.value

  if (!item) return

  await services.editTask(item).then(() => {
    isEditModalOpen.value = false
    itemToEdit.value = { id: 0, text: '', checked: false, created_at: '', finished_at: '' }
  }).catch(error => console.error(error))

  isEditModalOpen.value = false
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

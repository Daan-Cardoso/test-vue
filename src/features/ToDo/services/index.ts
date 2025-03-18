import axios from "axios"
import type { tItem } from "../types"

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

const fetchAllTasks = async () => {
  const response = await api.get('/tasks')

  return response
}

const fetchTaskById = async (id: number) => {
  const response = await api.get(`/tasks/${id}`)

  return response
}

const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`)

  return response
}

const addTask = async (payload: tItem) => {
  const response = await api.post('/tasks', payload)

  return response
}

const editTask = async (payload: tItem) => {
  const response = await api.post(`/tasks/${payload.id}` , payload)

  return response
}

const updateStatus = (id: number, status: boolean) => {
  return api.patch(`/tasks/statusUpdate/${id}`, { status })
}

export default {
  fetchAllTasks,
  fetchTaskById,
  deleteTask,
  addTask,
  editTask,
  updateStatus
}

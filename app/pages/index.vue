<script setup lang="ts">
import { ref } from 'vue'
import useTodo from '~/composables/useTodo'

definePageMeta({
  middleware: 'auth'
})

const input = ref('')
const isLoading = ref(false)

const { todos, addTodo, updateTodo, deleteTodo } = useTodo()

const handleAdd = async () => {
  if (!input.value.trim() || isLoading.value) return
  isLoading.value = true
  await addTodo(input.value.trim())
  input.value = ''
  isLoading.value = false
}

const handleToggle = async (id: string) => {
  const todo = todos.value.find(t => t.id === id)
  if (!todo || isLoading.value) return
  isLoading.value = true
  await updateTodo(id, todo.completed)
  isLoading.value = false
}

const handleDelete = async (id: string) => {
  if (isLoading.value) return
  isLoading.value = true
  await deleteTodo(id)
  isLoading.value = false
}
</script>

<template>
  <div class="container">
    <UCard class="cards bg-violet-500">
      <h1 class="title">My Todos</h1>

      <div class="add-todo">
        <input
          v-model="input"
          placeholder="Add a new todo..."
          class="todo-input"
          :disabled="isLoading"
        />
        <UButton
          variant="soft"
          color="primary"
          :disabled="isLoading"
          @click="handleAdd"
        >
          Add
        </UButton>
      </div>

      <UCard
        v-for="todo in todos"
        :key="todo.id"
        class="todo-card bg-violet-400"
      >
        <div class="todo-content">
          <h4
            :class="{ complete: todo.completed }"
            class="cursor-pointer"
            @click="handleToggle(todo.id)"
          >
            {{ todo.item }}
          </h4>

          <button
            class="delete"
            :disabled="isLoading"
            @click.stop="handleDelete(todo.id)"
          >
            ×
          </button>
        </div>
      </UCard>
    </UCard>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  margin: 0 auto;
  max-width: 600px;
}
.cards {
  padding: 2rem;
}
.title {
  margin-bottom: 1rem;
}
.add-todo {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.todo-input {
  flex: 1;
  padding: 0.5rem;
  outline: none;
}
.todo-card {
  margin-top: 1rem;
}
.todo-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.complete {
  text-decoration: line-through;
  opacity: 0.7;
}
.delete {
  font-size: 1.25rem;
  cursor: pointer;
}
</style>

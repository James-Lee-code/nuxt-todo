<script setup lang="ts">
import { ref } from "vue";
import useTodo from "../composables/useTodo";

definePageMeta({
  middleware: 'auth'
})

const input = ref("");
const { todos, addTodo, updateTodo, deleteTodo } = useTodo();

const handleClick = () => {
  if (!input.value) return;
  addTodo(input.value);
  input.value = "";
};
</script>

<template>
  <div class="container">
    <UCard class="cards bg-violet-500">
      <h1 class="title">My Todos</h1>

      <!-- 新增 -->
      <div class="add-todo">
        <input
          v-model="input"
          placeholder="Add a new todo..."
          class="todo-input"
        />
        <UButton
          variant="soft"
          color="primary"
          class="cursor-pointer"
          @click="handleClick"
        >
          Add
        </UButton>
      </div>

      <!-- 列表 -->
      <UCard
        v-for="todo in todos"
        :key="todo.id"
        class="todo-card bg-violet-400"
        @click="updateTodo(todo.id)"
      >
        <div class="todo-content">
          <h4 :class="{ complete: todo.completed }">
            {{ todo.item }}
          </h4>

          <button class="delete" @click.stop="deleteTodo(todo.id)">×</button>
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

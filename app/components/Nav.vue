<template>
  <nav class="bg-indigo-900 rounded-b-sm">
    <ul>
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li v-if="isLoggedIn()">
        <UButton class="logout cursor-pointer px-4" @click="signOut">登出</UButton>
      </li>
      <li v-else>
        <NuxtLink to="/auth">登入</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import useAuth from '../composables/useAuth'
const { signOut, isLoggedIn } = useAuth();

</script>

<style scoped>
nav {
  height: 15vh;
}

ul {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

li {
  color: oklch(76.9% 0.188 70.08);
  margin-right: 1rem;
}
</style>

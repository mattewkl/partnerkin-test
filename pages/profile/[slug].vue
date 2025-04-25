<template>
  <CommonBreadcrumbs :breadcrumbs="currentBreadcrumbs" />
  <div v-if="error" class="error">{{ error }}</div>
  <div v-else-if="user" class="profile-grid">
    <ProfileCard :userData="user" />
    <div class="tasks-list-container">
      <h1 class="base-text tasks-list-container__title">Все задания</h1>
      <TasksList v-if="tasks" :tasks="tasks" />
    </div>
  </div>
  <div v-else class="loading">Загрузка...</div>
</template>

<script setup lang="ts">
import type { TaskType } from '@/types/taskTypes'
import type { UserDataType } from '@/types/authTypes'
import { useUserStore } from '@/stores/user'
import { ref, onBeforeMount } from 'vue'

const route = useRoute()
const userStore = useUserStore()

const user = ref<UserDataType | null>(null)
const error = ref<string | null>(null)

const { data: tasks } = await useFetch<TaskType[]>('/api/tasks.json', {
  default: () => []
})

onBeforeMount(async () => {
  const userId = Number(route.params.slug)

  // Сначала проверяем store
  if (userStore.currentUser?.id === userId) {
    user.value = userStore.currentUser
    return
  }

  try {
    const { data } = await useFetch<UserDataType[]>('/api/users.json')
    if (data.value) {
      const foundUser = data.value.find(u => u.id === userId)
      if (foundUser) {
        user.value = foundUser
        userStore.setCurrentUser(foundUser)
      } else {
        error.value = 'Пользователь не найден'
      }
    }
  } catch (e) {
    error.value = 'Ошибка при загрузке данных пользователя'
  }
})

const currentBreadcrumbs = computed(() => {
  return [
    { name: 'Все задания', path: '/' },
    { name: `Профиль ${user.value?.username || ''}`, path: `/profile/${route.params.slug}` }
  ]
})
</script>

<style lang="scss">
.profile-grid {
  margin-inline: 2rem;
  display: grid;
  grid-template-columns: 32rem 1fr;
  gap: 3.2rem;
}

@media (max-width: 1400px) {
  .profile-grid {
    grid-template-columns: calc(24rem + (32 - 24) * ((100vw - 1024px) / (1400 - 1024))) 1fr;
  }
}

.tasks-list-container {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.tasks-list-container__title {
  font-size: 3.2rem;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .profile-grid {
    grid-template-columns: 1fr;
    margin-inline: 4.2rem;
    gap: 4.8rem;
  }
}

@media (max-width: 460px) {
  .profile-grid {
    margin-inline: 1.5rem;
    gap: 4rem;
  }

  .tasks-list-container__title {
    font-size: 2.4rem;
  }
}
</style>

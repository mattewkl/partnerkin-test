<template>
  <CommonBreadcrumbs :breadcrumbs="currentBreadcrumbs" />
  <div class="profile-grid">
    <template v-if="error">
      <p class="base-text status-message status-message--error">{{ error }}</p>
    </template>
    <template v-else-if="user">
      <ProfileCard :userData="user" />
      <div class="tasks-list-container">
        <h1 class="base-text tasks-list-container__title">Все задания</h1>
        <TasksList v-if="tasks" :tasks="tasks" />
      </div>
    </template>
    <template v-else>
      <p class="base-text status-message">Загрузка профиля...</p>
    </template>
  </div>
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

<style lang="scss" scoped>
.profile-grid {
  margin-inline: 2rem;
  display: grid;
  grid-template-columns: 32rem 1fr;
  gap: 2.4rem;
  margin-top: 2.4rem;
}

.status-message {
  grid-column: 1 / -1;
  text-align: center;
  font-size: 1.8rem;
  color: $text-secondary;
  padding: 4rem 0;

  &--error {
    color: $text-error;
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

@media (max-width: 1400px) {
  .profile-grid {
    grid-template-columns: calc(24rem + (32 - 24) * ((100vw - 1024px) / (1400 - 1024))) 1fr;
  }
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

<template>
  <div class="home">
    <h1 class="base-text home__title">Тестовое задание</h1>
    <div class="home__links">
      <NuxtLink 
        v-for="user in users" 
        :key="user.id"
        :to="`/profile/${user.id}`" 
        class="home__link"
      >
        <img :src="user.image" alt="avatar" class="home__avatar" />
        <div class="home__user-info">
          <p class="base-text home__name">{{ user.name }}</p>
          <p class="base-text home__username">@{{ user.username }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserDataType } from '@/types/authTypes'

const { data: users } = await useFetch<UserDataType[]>('/api/users.json')
</script>

<style lang="scss" scoped>
.home {
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
}

.home__title {
  font-size: 3.2rem;
  font-weight: 700;
  color: $text-primary;
}

.home__links {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  max-width: 48rem;
}

.home__link {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem;
  background: $bg-primary;
  border-radius: $border-radius-standart;
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(0.8rem);
  }
}

.home__avatar {
  width: 6.4rem;
  height: 6.4rem;
  border-radius: $border-radius-standart;
  object-fit: cover;
}

.home__user-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.home__name {
  font-size: 1.8rem;
  font-weight: 600;
  color: $text-primary;
}

.home__username {
  font-size: 1.4rem;
  color: $text-secondary;
}

@media (max-width: 460px) {
  .home {
    padding: 2.4rem 1.6rem;
  }

  .home__title {
    font-size: 2.4rem;
  }
}
</style>



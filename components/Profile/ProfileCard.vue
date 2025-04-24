<template>
  <div class="profile-card">
    <NuxtImg class="profile-card__avatar" :src="userData.image" alt="avatar"/>
    <div class="profile-card__info">
      <div class="profile-card__text-info">
        <p class="base-text profile-card__name">{{ userData.name }}</p>
        <span class="profile-card__username-container">
          <span class="profile-card__username-icon"></span>
          <p class="base-text profile-card__username">{{ userData.username }}</p>
        </span>
        <span class="divider"></span>
        <div class="profile-card__social-links">
          <template v-for="(link, index) in userData.socialLinks" :key="`social-link-${index}`">
            <a :href="link.url" class="profile-card__social-link">
              <img :src="`/svg/socials/${link.icon}.svg`" :alt="link.name" />
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserDataType } from '@/types/authTypes';

const props = defineProps<{
  userData: UserDataType;
}>();
</script>

<style lang="scss" scoped>
.profile-card {
  height: fit-content;
  display: flex;
  max-width: 32rem;
  gap: 2.4rem;
  flex-direction: column;
  box-sizing: border-box;
  padding: 2rem;
  padding-bottom: 2.4rem;
  border-radius: $border-radius-standart;
  background-color: $bg-primary;
}

.profile-card__avatar {
  width: 28rem;
  aspect-ratio: 1/1;
  border-radius: $border-radius-standart;
  object-fit: cover;
}

.profile-card__info {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.profile-card__text-info {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.profile-card__username-icon {
    width: 2.4rem;
    display: flex;
    aspect-ratio: 1/1;
    background-image: url('/svg/profile-icon.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.profile-card__username-container {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.profile-card__name {
  color: $text-secondary;
  font-size: 1.8rem;
  line-height: 1.4;
  font-weight: 600; // из-за бага смотрится 500 ужасно
  font-family: 'GothamPro', sans-serif;
}

.profile-card__username {
  color: $text-secondary;
  font-size: 1.6rem;
  line-height: 1.4;
  font-weight: 600; // из-за бага смотрится 500 ужасно
  font-family: 'GothamPro', sans-serif;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: $text-secondary;
  opacity: 12%;
}

.profile-card__social-link {
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  gap: 0.8rem;
  aspect-ratio: 1/1;
  opacity: 30%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
}

.profile-card__social-links {
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
}

@media (max-width: 1400px) {
  .profile-card {
    max-width: calc(24rem + (32 - 24) * ((100vw - 1024px) / (1400 - 1024)));
  }

  .profile-card__avatar {
    width: calc(21rem + (28 - 21) * ((100vw - 1024px) / (1400 - 1024)));
  }
}

@media (max-width: 1024px) {
  .profile-card {
    width: 100%;
    max-width: 100%;
    flex-direction: row;
    gap: 3.2rem;
    align-items: flex-start;
  }

  .profile-card__avatar {
    width: 10.4rem;
  }
}

@media (max-width: 460px) {
  .profile-card {
    flex-direction: column;
    padding: 1.6rem;
    padding-bottom: 2rem;
  }

  .profile-card__avatar {
    width: 11.2rem;
  }
  
  
}
</style> 
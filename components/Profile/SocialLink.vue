<template>
  <a :href="link.url" target="_blank" class="social-link">
    <span class="social-icon" :class="`social-icon--${link.icon}`"></span>
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  link: {
    url: string
    icon: string
  }
}>()
</script>

<style lang="scss" scoped>
.social-link {
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  opacity: 0.3;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.5;
  }
}

.social-icon {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  &--vk {
    background-image: url('/svg/socials/vk.svg');
  }
  &--facebook {
    background-image: url('/svg/socials/facebook.svg');
  }
  &--twitter {
    background-image: url('/svg/socials/twitter.svg');
  }
  &--instagram {
    background-image: url('/svg/socials/instagram.svg');
  }
}
</style>

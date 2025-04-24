<template>
  <div>
    <CommonBreadcrumbs :breadcrumbs="currentBreadcrumbs" />
    <ProfileCard v-if="user" :user="user" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: user } = await useFetch(`/api/users/${route.params.slug}`, {
  server: false
})

const currentBreadcrumbs = computed(() => {
  return [
    { name: 'Все задания', path: '/' },
    { name: `Профиль ${user.value?.username || ''}`, path: `/profile/${route.params.slug}` }
  ]
})
</script>



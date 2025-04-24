<template>
  <div class="base-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const currentBreadcrumbs = computed(() => {
  const baseCrumb = { name: 'Все задания', path: '/' }
  
  // Если мы на странице профиля
  if (route.path.includes('/profile/')) {
    const { data: user } = useFetch(`/api/users/${route.params.slug}`, {
      server: false
    })
    
    return [
      baseCrumb,
      {
        name: `Профиль ${user.value?.username || ''}`,
        path: route.path
      }
    ]
  }
  
  // Для главной страницы
  return [baseCrumb]
})
</script>

<style lang="scss">
</style> 
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ModalBaseModal />
</template>

<script setup lang="ts">
const { data: users } = await useFetch('/api/users', {
  server: false
})
const { data: tasks } = await useFetch('/api/tasks', {
  server: false
})
</script>

<style lang="scss">

</style>

<template>
  <img 
    :src="`${config.app.baseURL}icons/${name}.svg`" 
    :alt="name"
    class="icon"
  />
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

defineProps<{
  name: string
}>()
</script>

<style scoped>
.icon {
  width: 2.4rem;
  height: 2.4rem;
  object-fit: contain;
}
</style> 
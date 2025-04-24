<template>
  <nav class="breadcrumbs">
    <ul class="breadcrumbs-list">
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
            <li class="base-text breadcrumbs-item">
              <NuxtLink 
                v-if="index < breadcrumbs.length - 1" 
                :to="crumb.path"
                class="breadcrumbs-link">
                {{ crumb.name }}
              </NuxtLink>
              <span v-else>
                {{ crumb.name }}
              </span>
            </li>
        </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface Breadcrumb {
  name: string;
  path: string;
}

const props = defineProps<{
  breadcrumbs: Breadcrumb[]
}>()
</script>

<style lang="scss" scoped>
.breadcrumbs {
  margin-bottom: 3.2rem;
  margin-top: 4.2rem;
  margin-left: 2rem;

  @media (max-width: 1024px) {
    margin-left: 4.2rem;
    margin-top: 6rem;
    margin-bottom: 2.4rem;
  }

  @media (max-width: 768px) {
    margin-left: 1.5rem;
    margin-bottom: 1.6rem;
  }
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  
}

.breadcrumbs-item {
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  color: $text-secondary;
  position: relative;
  
  &:not(:last-child) {
    margin-right: 1.966rem; // 0.983rem * 2 для отступов с обеих сторон точки
    
    &::after {
      content: '';
      position: absolute;
      right: -0.983rem; 
      top: 50%;
      transform: translateY(-50%);
      width: 0.223rem;
      height: 0.223rem;
      background-color: $text-secondary;
      border-radius: 50%;
    }
  }
}

.breadcrumbs-link {
  color: $text-secondary;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: $text-primary;
  }
}
</style> 
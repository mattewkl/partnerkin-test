<template>
  <ul class="tasks-list">
    <template v-for="task in tasks" :key="task.id">
      <TasksTaskCard :task="task" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import type { TaskType } from '@/types/taskTypes';

const props = defineProps<{
  tasks: TaskType[]
}>()

</script>

<style lang="scss">
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
  padding-bottom: 2.4rem;
}
</style>

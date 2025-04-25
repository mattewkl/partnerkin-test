<template>
  <div class="task-card">
    <p class="base-text task-card__type">{{ task.typeTitle }}</p>
    <h3 class="base-text task-card__title">{{ task.title }}</h3>
    <div class="task-card__description" v-html="task.description"></div>
    <div class="task-card__price-n-btn-wrapper">
      <div class="task-card__price-info-container">
        <p class="base-text task-card__price">{{ task.price }} ₽.</p>
        <p class="base-text task-card__price">{{ task.timeToComplete }} {{ getDayWord(task.timeToComplete) }}</p>
      </div>
      <button class="task-card__btn" @click="openTaskModal">
        <span class="base-text task-card__btn-text">Взять задачу</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskType } from '@/types/taskTypes';
import { useModalStore } from '@/stores/modal'

const props = defineProps<{
  task: TaskType
}>()

const modalStore = useModalStore()

//супертупо+супербыстро+суперработает
const getDayWord = (days: number) => {
  if (days === 1) return 'день'
  if (days >= 2 && days <= 4) return 'дня'
  if (days > 9 && days < 20) return 'дней'
  if (String(days).endsWith('1')) return 'день'
  if (String(days).endsWith('2') || String(days).endsWith('3') || String(days).endsWith('4')) return 'дня'
  return 'дней'
}

const openTaskModal = () => {
  modalStore.openModal('task', props.task)
}
</script>

<style lang="scss" scoped>
.task-card {
  // Базовые стили
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border-radius: 0.8rem;
  background-color: $bg-primary;
}

.task-card__price-n-btn-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.task-card__title {
  font-weight: 700;
  font-size: 2.4rem;
}

.task-card__description {
  margin-bottom: 1.2rem;
  line-height: 1.4;
  font-size: 1.6rem;
  font-weight: 400;
}

.task-card__price-info-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
}

.task-card__type {
  color: $text-accent-green;
}

.task-card__price {
  font-weight: 700;
  font-size: 2rem;
}

.task-card__btn {
  background-color: $button-primary;
  border-radius: $border-radius-small;
  padding: 1.3rem 2.4rem;
  border: none;
  cursor: pointer;
}

.task-card__btn-text {
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.4;
}

@media (max-width: 460px) {
  .task-card {
    padding: 2rem;
  }

  .task-card__title {
    font-size: 2rem;
  }

  .task-card__description {
    font-size: 1.4rem;
  }
  .task-card__price {
    font-size: 1.8rem;
  }

  .task-card__price-info-container {
    flex-direction: column;
    gap: 0.4rem;
  }

  
  
}




</style> 
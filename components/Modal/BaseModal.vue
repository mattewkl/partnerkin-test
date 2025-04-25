<template>
    <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2 class="base-text modal-title">Информация по отклику</h2>
          <button class="modal-close" @click="modalStore.closeModal">×</button>
        </div>
        <div class="modal-content">
          <TaskModal v-if="type === 'task'" :data="data" />
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modal'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted } from 'vue'
import TaskModal from './content/TaskModal.vue'

const modalStore = useModalStore()
const { isOpen, type, data } = storeToRefs(modalStore)

const handleOverlayClick = () => {
  modalStore.closeModal()
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    modalStore.closeModal()
  }
}

// Обработка кнопки назад на Android, но она отправляет на предыдущую, можно тоже сделать рабочим, но не знаю  хорошая ил это идея
// const handlePopState = () => {
//   if (isOpen.value) {
//     modalStore.closeModal()
//     history.pushState(null, '', window.location.href)
//   }
// }

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
//   window.addEventListener('popstate', handlePopState)
  if (isOpen.value) {
    history.pushState(null, '', window.location.href)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
//   window.removeEventListener('popstate', handlePopState)
})
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: $bg-secondary;
  padding-inline: 2.8rem;
  padding-block: 3.6rem;
  border-radius: $border-radius-standart;
  position: relative;
  max-width: 49rem;
  width: 100%;
  margin: 1.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
}

.modal-title {
  font-size: 2.4rem;
  font-weight: 700;
  color: $text-primary;
}

.modal-close {
  width: 3.2rem;
  height: 3.2rem;
  background: $bg-primary;
  border: none;
  border-radius: 50%;
  font-size: 2rem;
  cursor: pointer;
  color: $text-secondary;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: darken($bg-primary, 5%);
  }
}

.modal-content {
  margin-top: 0;
}

@media (max-width: 460px) {
    .modal {
        padding-inline: 1.6rem;
        padding-block: 2.8rem;
    }

    .modal-title {
        font-size: 2rem;
    }
}
</style> 
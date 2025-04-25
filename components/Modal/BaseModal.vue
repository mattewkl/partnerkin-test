<template>
    <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal" @click.stop>
        <button class="modal-close" @click="modalStore.closeModal">×</button>
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

// Обработка кнопки назад на Android
const handlePopState = () => {
  if (isOpen.value) {
    modalStore.closeModal()
    history.pushState(null, '', window.location.href)
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  window.addEventListener('popstate', handlePopState)
  // Добавляем запись в историю при открытии модалки
  if (isOpen.value) {
    history.pushState(null, '', window.location.href)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  window.removeEventListener('popstate', handlePopState)
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
  padding: 2rem;
  border-radius: $border-radius-standart;
  position: relative;
  max-width: 50rem;
  width: 100%;
  margin: 2rem;
}

.modal-close {
  position: absolute;
  right: 2rem;
  top: 2rem;
  background: none;
  border: none;
  font-size: 2.4rem;
  cursor: pointer;
  color: $text-secondary;
}

.modal-content {
  margin-top: 2rem;
}
</style> 
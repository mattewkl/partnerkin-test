<template>
  <div class="task-modal">
    <form @submit.prevent="handleSubmit" class="task-modal__form">
      <div class="input-wrapper">
        <textarea 
          v-model="formData.comment"
          placeholder="Ваш комментарий"
          class="base-input task-modal__textarea"
        />
      </div>
      
      <div class="smol-inputs">
        <div class="input-wrapper">
          <input 
            v-model="formData.phone"
          type="tel"
          placeholder="Телефон"
          class="base-input"
        />
        </div>
        
        <div class="input-wrapper">
          <input 
            v-model="formData.email"
            type="email"
            placeholder="Email *"
            class="base-input"
            :class="{ 'input-error': validationErrors.email }"
          />
          <span v-if="validationErrors.email" class="error-text">
            {{ validationErrors.email }}
          </span>
        </div>
        
        <div class="input-wrapper">
          <input 
            v-model="formData.telegram"
            type="text"
            placeholder="Telegram"
            class="base-input"
          />
        </div>
      </div>
      
      <FormCheckbox
        v-model="formData.doNotCall"
        label="Прошу не звонить и написать мне в мессенджер"
      />
      
      <div v-if="error" class="task-modal__error">
        {{ error }}
      </div>
      
      <button 
        type="submit" 
        class="task-modal__submit-btn"
        :disabled="isLoading"
      >
        <span class="base-text task-modal__btn-text">
          {{ buttonText }}
        </span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { TaskType, TaskAppliedPostType } from '@/types/taskTypes'
import { useUserStore } from '@/stores/user'
import { useModalStore } from '@/stores/modal'
import { ref, computed } from 'vue'

const props = defineProps<{
  data: TaskType
}>()

const userStore = useUserStore()
const modalStore = useModalStore()

const formData = ref({
  comment: '',
  phone: userStore.currentUser?.phone || '',
  email: userStore.currentUser?.email || '',
  telegram: '',
  doNotCall: false
})

const isLoading = ref(false)
const isSuccess = ref(false)
const error = ref<string | null>(null)
const validationErrors = ref<Record<string, string>>({})

const buttonText = computed(() => {
  if (isSuccess.value) return 'Успешно отправлено!'
  if (isLoading.value) return 'Отправка...'
  return 'Отправить'
})

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateForm = (): boolean => {
  validationErrors.value = {}
  
  if (!formData.value.email) {
    validationErrors.value.email = 'Email обязателен'
    return false
  }
  
  if (!validateEmail(formData.value.email)) {
    validationErrors.value.email = 'Некорректный email'
    return false
  }
  
  return true
}

const handleSubmit = async () => {
  if (!userStore.currentUser) {
    error.value = 'Необходимо авторизоваться'
    return
  }

  if (!validateForm()) {
    return
  }

  try {
    isLoading.value = true
    error.value = null

    const response = await $fetch<{ success: boolean }>('/api/tasks/response', {
      method: 'POST',
      body: {
        taskId: props.data.id,
        executorId: userStore.currentUser.id,
        ...formData.value
      } as TaskAppliedPostType
    })

    if (response.success) {
      isSuccess.value = true
      setTimeout(() => {
        modalStore.closeModal()
      }, 2000)
    }
  } catch (e) {
    error.value = 'Ошибка при отправке отклика'
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.task-modal {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.task-modal__textarea {
    min-height: 8.4rem;
}

.task-modal__form {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1.6rem;
}

.smol-inputs {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.task-modal__title {
  font-size: 2.4rem;
  font-weight: 700;
  color: $text-primary;
}

.task-modal__type-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-modal__type {
  color: $text-accent-green;
  font-size: 1.6rem;
}

.task-modal__price-info {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.task-modal__price {
  font-size: 2rem;
  font-weight: 700;
}

.task-modal__time {
  font-size: 1.6rem;
  color: $text-secondary;
}

.task-modal__description {
  font-size: 1.6rem;
  line-height: 1.4;
  color: $text-primary;
}

.task-modal__error {
  color: $text-error;
  font-size: 1.4rem;
  margin-top: -0.8rem;
}

.task-modal__submit-btn {
  background-color: $button-primary;
  border-radius: $border-radius-small;
  padding: 1.3rem 2.4rem;
  border: none;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 0.8rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.task-modal__btn-text {
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.4;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
}

.input-error {
  border: 1px solid $text-error;
  
  &:focus {
    border-color: $text-error;
  }
}

.error-text {
  color: $text-error;
  font-size: 1.2rem;
  line-height: 1.4;
}

@media (max-width: 460px) {
  .task-modal__title {
    font-size: 2rem;
  }

  .task-modal__price {
    font-size: 1.8rem;
  }

  .task-modal__description,
  .task-modal__time,
  .task-modal__type {
    font-size: 1.4rem;
  }
}
</style> 
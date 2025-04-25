import { defineStore } from 'pinia'

interface ModalState {
  isOpen: boolean;
  type: string | null;
  data: any;
}

export const useModalStore = defineStore('modal', {
  state: (): ModalState => ({
    isOpen: false,
    type: null,
    data: null
  }),

  actions: {
    openModal(type: string, data?: any) {
      this.isOpen = true
      this.type = type
      this.data = data
    },
    closeModal() {
      this.isOpen = false
      this.type = null
      this.data = null
    }
  }
}) 
import { defineStore } from 'pinia'
import type { UserDataType } from '@/types/authTypes'

interface UserState {
  currentUser: UserDataType | null;
  isLoading: boolean;
  error: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    currentUser: null,
    isLoading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state): boolean => !!state.currentUser,
    getUserData: (state): UserDataType | null => state.currentUser
  },
  
  actions: {
    setCurrentUser(user: UserDataType): void {
      this.currentUser = user
      this.error = null
    },

    clearError(): void {
      this.error = null
    },
    
    async fetchUser(id: number): Promise<UserDataType | null> {
      if (this.currentUser?.id === id) {
        return this.currentUser
      }
      
      try {
        this.isLoading = true
        this.error = null
        
        const response = await $fetch<UserDataType>(`/api/users/${id}`)
        
        if (!response) {
          throw new Error('User not found')
        }
        
        this.currentUser = response
        this.error = null
        return response
        
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch user'
        return null
        
      } finally {
        this.isLoading = false
      }
    },

    clearUserData(): void {
      this.currentUser = null
      this.error = null
    }
  },
  
  persist: true
}) 
import { expect, describe, it, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/AuthStore'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'

// Mock Firebase functions
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  createUserWithEmailAndPassword: vi.fn().mockResolvedValue({ user: {} }),
  signInWithEmailAndPassword: vi.fn().mockResolvedValue({ user: {} }),
  updateProfile: vi.fn(),
  signOut: vi.fn().mockResolvedValueOnce({})
}))

describe('useAuthStore', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('should log in a user', async () => {
    const authStore = useAuthStore()

    await authStore.login('test@example.com', 'password')

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      'test@example.com',
      'password'
    )
  })

  it('should register and log in a user', async () => {
    const authStore = useAuthStore()

    await authStore.register('test@example.com', 'password', 'username')

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      'test@example.com',
      'password'
    )
    expect(updateProfile).toHaveBeenCalledWith(expect.anything(), {
      displayName: 'username'
    })
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      'test@example.com',
      'password'
    )
  })

  it('should log out a user', async () => {
    const authStore = useAuthStore()

    await authStore.logout()

    expect(signOut).toHaveBeenCalled()
    expect(authStore.isLoggedIn).toBe(false)
  })
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  type User,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<null | User>(null)
  const isLoggedIn = ref(false)

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(getAuth(), email, password)
  }

  async function register(email: string, password: string, username: string) {
    const res = await createUserWithEmailAndPassword(getAuth(), email, password)

    await updateProfile(res.user, {
      displayName: username
    })

    await signInWithEmailAndPassword(getAuth(), email, password)
  }

  async function logout() {
    return signOut(getAuth()).then(() => {
      user.value = null
      isLoggedIn.value = false
    })
  }

  function validateLogin() {
    return new Promise((resolve, reject) => {
      const unSubscribe = onAuthStateChanged(
        getAuth(),
        (currentUser) => {
          unSubscribe()
          _updateUserState(currentUser)
          resolve(currentUser)
        },
        reject
      )
    })
  }

  function _updateUserState(currentUser: User | null) {
    user.value = currentUser

    isLoggedIn.value = currentUser !== null
  }

  onAuthStateChanged(getAuth(), _updateUserState)

  return { user, login, register, isLoggedIn, logout, validateLogin }
})

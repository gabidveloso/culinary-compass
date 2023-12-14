<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/AuthStore'
import { ref } from 'vue'

import { THE_BUTTON_VARIANTS } from './components/TheButton/TheButton.type'
import TheHeader from './components/TheHeader/TheHeader.vue'
import TheModal from './components/TheModal/TheModal.vue'
import TheButton from './components/TheButton/TheButton.vue'
import { useFoodStore } from './stores/FoodStore/FoodStore'

const authStore = useAuthStore()
const reposStore = useFoodStore()
const router = useRouter()

const showModal = ref(false)

const onShowModal = () => {
  showModal.value = true
}

async function onLogout() {
  showModal.value = false
  await authStore.logout()

  reposStore.reset()

  router.push('/login')
}
</script>

<template>
  <TheHeader
    :isLoggedIn="authStore.isLoggedIn"
    @logout="onShowModal"
    :userName="authStore.user?.displayName"
    :menuItems="[
      {
        path: '/discovery',
        name: $t('header.discovery')
      }
    ]"
  />

  <TheModal v-model:show="showModal">
    <template #header>
      <h2>{{ $t('header.modalTitle') }}</h2>
    </template>
    <template #body>
      <p>{{ $t('header.modalDescription') }}</p></template
    >
    <template #footer>
      <div class="modal-footer">
        <TheButton
          id="save-button"
          :variant="THE_BUTTON_VARIANTS.TEXT"
          type="submit"
          @click="showModal = false"
        >
          {{ $t('header.modalCancel') }}
        </TheButton>
        <TheButton
          id="save-button"
          :variant="THE_BUTTON_VARIANTS.PRIMARY"
          type="submit"
          @click="onLogout"
        >
          {{ $t('header.modalConfirm') }}
        </TheButton>
      </div>
    </template>
  </TheModal>

  <RouterView />
</template>

<style scoped lang="scss">
h2 {
  font-size: var(--xlarge_font);
  font-weight: var(--font_w_regular);
  color: var(--vt-c-cyan);
}

p {
  font-size: var(--medium_font);
  margin-top: 0.8rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 2rem;
  gap: 1rem;
}
</style>

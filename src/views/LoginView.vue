<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'

import TheInput from '@/components/TheInput/TheInput.vue'
import TheButton from '@/components/TheButton/TheButton.vue'
import TheMessage from '@/components/TheMessage/TheMessage.vue'
import { LoginSchema } from '@/schemas/LoginSchema'
import { THE_BUTTON_VARIANTS } from '@/components/TheButton/TheButton.type'
import { useAuthStore } from '@/stores/AuthStore'
import { THE_MESSAGE_VARIANTS } from '@/components/TheMessage/TheMessage.type'

const authStore = useAuthStore()
const router = useRouter()

const { handleSubmit, errorBag, meta } = useForm({
  initialValues: {
    email: '',
    password: ''
  },
  validationSchema: LoginSchema
})

const message = ref({
  show: false,
  variant: THE_MESSAGE_VARIANTS.ERROR,
  message: ''
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values.email, values.password)

    router.push('/')
  } catch (error) {
    message.value = {
      show: true,
      variant: THE_MESSAGE_VARIANTS.ERROR,
      message: 'login.loginFailed'
    }
  }
})
</script>

<template>
  <main class="align-center">
    <form @submit="onSubmit">
      <div class="wrapper">
        <h2 class="header-form">{{ $t('login.title') }}</h2>
        <TheMessage
          v-model:show="message.show"
          :variant="message.variant"
          :message="message.message"
        />
        <TheInput
          label="login.email"
          :placeholder="$t('login.placeholderEmail')"
          id="email"
          v-model:value="email"
          :error-messages="errorBag.email"
        />
        <TheInput
          label="login.password"
          :placeholder="$t('login.placeholderPassword')"
          type="password"
          id="password"
          v-model:value="password"
          :error-messages="errorBag.password"
        />
      </div>

      <TheButton
        id="login-button"
        :variant="THE_BUTTON_VARIANTS.PRIMARY"
        type="submit"
        :disabled="!meta.valid"
      >
        {{ $t('login.submit') }}
      </TheButton>
    </form>

    <div class="create-account">
      <span>{{ $t('login.dontHaveAccount') }}</span>
      <router-link to="/register">{{ $t('login.register') }}</router-link>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  height: calc(100vh - 16rem);

  .create-account {
    flex-wrap: wrap;
    display: flex;
    gap: 0.6rem;
    padding: 1rem 0.5rem;
    font-size: var(--medium_font);
  }
}
</style>

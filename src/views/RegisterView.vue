<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

import TheInput from '@/components/TheInput/TheInput.vue'
import TheButton from '@/components/TheButton/TheButton.vue'
import TheMessage from '@/components/TheMessage/TheMessage.vue'
import { RegisterSchema } from '@/schemas/RegisterSchema'
import { useForm, useField } from 'vee-validate'
import { THE_BUTTON_VARIANTS } from '@/components/TheButton/TheButton.type'
import {
  THE_MESSAGE_VARIANTS,
  type ITheMessageProps
} from '@/components/TheMessage/TheMessage.type'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const router = useRouter()

const { handleSubmit, errorBag } = useForm({
  initialValues: {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  validationSchema: RegisterSchema
})

const message = ref<ITheMessageProps>({
  show: false,
  variant: THE_MESSAGE_VARIANTS.ERROR,
  message: ''
})

const { value: username } = useField<string>('username')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.register(values.email, values.password, values.username)
    router.push('/')
  } catch (error) {
    message.value = {
      show: true,
      variant: THE_MESSAGE_VARIANTS.ERROR,
      message: 'register.errorCreatingAccount'
    }
  }
})
</script>

<template>
  <main class="align-center">
    <form @submit="onSubmit">
      <div class="wrapper">
        <h2 class="header-form">{{ $t('register.title') }}</h2>
        <TheMessage
          v-model:show="message.show"
          :variant="message.variant"
          :message="message.message"
        />
        <TheInput
          label="register.username"
          :placeholder="$t('register.placeholderUsername')"
          id="username"
          v-model:value="username"
          :error-messages="errorBag.username"
        />
        <TheInput
          label="register.email"
          :placeholder="$t('register.placeholderEmail')"
          id="email"
          v-model:value="email"
          :error-messages="errorBag.email"
        />
        <TheInput
          label="register.password"
          :placeholder="$t('register.placeholderPassword')"
          type="password"
          id="password"
          v-model:value="password"
          :error-messages="errorBag.password"
        />
        <TheInput
          label="register.confirmPassword"
          :placeholder="$t('register.placeholderConfirmPassword')"
          type="password"
          id="confirm-password"
          v-model:value="confirmPassword"
          :error-messages="errorBag.confirmPassword"
        />
      </div>

      <TheButton
        id="login-button"
        :variant="THE_BUTTON_VARIANTS.PRIMARY"
        type="submit"
        :area-label="$t('register.submit')"
        :disabled="errorBag.username || errorBag.password || !username || !password"
        >{{ $t('register.submit') }}</TheButton
      >
    </form>

    <div class="create-account">
      <span>{{ $t('register.alreadyHaveAccount') }}</span>
      <router-link to="/login">{{ $t('register.login') }}</router-link>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  height: calc(100vh - 10rem);
  .create-account {
    display: flex;
    gap: 0.6rem;
    padding: 1rem 0.5rem;
    font-size: var(--medium_font);
  }
}
</style>

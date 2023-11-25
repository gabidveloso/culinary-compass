<script setup lang="ts">
import TheInput from '@/components/TheInput/TheInput.vue'
import TheButton from '@/components/TheButton/TheButton.vue'
import TheMessage from '@/components/TheMessage/TheMessage.vue'
import { LoginSchema } from '@/schemas/LoginSchema'
import { useForm, useField } from 'vee-validate'
import { THE_BUTTON_VARIANTS } from '@/components/TheButton/TheButton.type'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router'
import { THE_MESSAGE_VARIANTS } from '@/components/TheMessage/TheMessage.type'
import { ref } from 'vue'

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
  <main>
    <form @submit="onSubmit">
      <div class="wrapper">
        <h2>{{ $t('login.title') }}</h2>
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 16rem);

  h2 {
    color: var(--vt-c-purple);
    font-size: var(--header_font);
    font-weight: var(--font_w_bold);
  }

  .create-account {
    flex-wrap: wrap;
    display: flex;
    gap: 0.6rem;
    padding: 1rem 0.5rem;
    font-size: var(--medium_font);
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-between;
  background-color: var(--vt-c-divider-light-2);
  border-radius: 0.5rem;
  padding: 2rem;
  width: clamp(20rem, 60vw, 25rem);
  height: auto;

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>

<script setup lang="ts">
import { updateProfile, type User, getAuth, verifyBeforeUpdateEmail } from 'firebase/auth'
import { computed, ref } from 'vue'

import TheInput from '@/components/TheInput/TheInput.vue'
import TheButton from '@/components/TheButton/TheButton.vue'
import IconWarning from '@/components/icons/IconWarning.vue'
import TheMessage from '@/components/TheMessage/TheMessage.vue'
import TheModal from '@/components/TheModal/TheModal.vue'
import { EditUserSchema } from '@/schemas/EditUserSchema'
import { useForm, useField } from 'vee-validate'
import { THE_BUTTON_VARIANTS } from '@/components/TheButton/TheButton.type'
import { THE_MESSAGE_VARIANTS } from '@/components/TheMessage/TheMessage.type'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()

const { handleSubmit, errorBag, meta, values, resetForm } = useForm({
  initialValues: {
    email: authStore.user?.email || '',
    username: authStore.user?.displayName || ''
  },
  validationSchema: EditUserSchema
})

const password = ref('')

const message = ref({
  show: false,
  variant: THE_MESSAGE_VARIANTS.SUCCESS,
  message: ''
})

const showModal = ref(false)

const emailSent = ref(false)

const modalMessage = ref({
  show: false,
  variant: THE_MESSAGE_VARIANTS.ERROR,
  message: ''
})

const formChanged = computed(() => {
  return JSON.stringify(values) !== JSON.stringify(meta.value.initialValues)
})

const { value: email } = useField<string>('email')
const { value: username } = useField<string>('username')

const onSubmit = handleSubmit(async (values) => {
  if (values.username !== authStore.user?.displayName) {
    try {
      await updateProfile(authStore.user as User, {
        displayName: values.username
      })

      message.value = {
        show: true,
        variant: THE_MESSAGE_VARIANTS.SUCCESS,
        message: 'myAccount.usernameUpdated'
      }

      resetForm({
        values: {
          email: values.email,
          username: values.username
        }
      })
    } catch (error) {
      message.value = {
        show: true,
        variant: THE_MESSAGE_VARIANTS.ERROR,
        message: 'myAccount.usernameUpdatedError'
      }
    }
  }

  if (values.email !== authStore.user?.email) {
    showModal.value = true

    return
  }
})

const onChangeEmail = handleSubmit(async () => {
  try {
    await authStore.login(authStore.user?.email as string, password.value)

    const user = getAuth().currentUser

    await verifyBeforeUpdateEmail(user as User, values.email)

    emailSent.value = true
  } catch (error) {
    modalMessage.value = {
      show: true,
      variant: THE_MESSAGE_VARIANTS.ERROR,
      message: 'myAccount.loginError'
    }
  }
})
</script>

<template>
  <TheModal v-model:show="showModal" @update:show="emailSent = false">
    <template #header>
      <div class="modal-title">
        <h2>{{ $t('myAccount.titleModal') }}</h2>
        <p v-if="!emailSent">{{ $t('myAccount.descriptionModal') }}</p>
      </div>
      <TheMessage
        class="mb-1"
        v-model:show="modalMessage.show"
        :variant="modalMessage.variant"
        :message="modalMessage.message"
      />
    </template>
    <template #body>
      <div class="modal-body" v-if="emailSent">
        <p>{{ $t('myAccount.emailSent') }}</p>
      </div>
      <TheInput
        v-if="!emailSent"
        type="password"
        label="myAccount.password"
        :placeholder="$t('myAccount.placeholderPassword')"
        id="password"
        v-model:value="password"
      />
    </template>
    <template #footer>
      <div class="modal-footer">
        <TheButton
          id="save-button"
          :variant="THE_BUTTON_VARIANTS.TEXT"
          type="submit"
          @click="showModal = false"
          :area-label="$t('myAccount.cancel')"
        >
          {{ $t('myAccount.cancel') }}
        </TheButton>
        <TheButton
          v-if="!emailSent"
          id="save-button"
          :variant="THE_BUTTON_VARIANTS.PRIMARY"
          type="submit"
          :disabled="!password"
          @click="onChangeEmail"
          :area-label="$t('myAccount.changeEmail')"
        >
          {{ $t('myAccount.changeEmail') }}
        </TheButton>
        <TheButton
          v-if="emailSent"
          id="save-button"
          :variant="THE_BUTTON_VARIANTS.PRIMARY"
          type="submit"
          @click="showModal = false"
          :area-label="$t('myAccount.okay')"
        >
          {{ $t('myAccount.okay') }}
        </TheButton>
      </div>
    </template>
  </TheModal>
  <main>
    <form @submit="onSubmit">
      <div class="wrapper">
        <div class="title">
          <h2 class="header-form">{{ $t('myAccount.title') }}</h2>
          <span>{{ $t('myAccount.description') }}</span>
        </div>
        <TheMessage
          v-model:show="message.show"
          :variant="message.variant"
          :message="message.message"
        />
        <TheInput
          label="myAccount.username"
          :placeholder="$t('myAccount.placeholderUsername')"
          id="username"
          v-model:value="username"
          :error-messages="errorBag.username"
        />
        <TheInput
          label="myAccount.email"
          :placeholder="$t('myAccount.placeholderEmail')"
          id="email"
          v-model:value="email"
          :error-messages="errorBag.email"
        />

        <div class="warning-message">
          <IconWarning />
          <span>{{ $t('myAccount.warning') }}</span>
        </div>
      </div>

      <TheButton
        id="save-button"
        :variant="THE_BUTTON_VARIANTS.PRIMARY"
        type="submit"
        :disabled="!meta.valid || !formChanged"
        :area-label="$t('myAccount.submit')"
      >
        {{ $t('myAccount.submit') }}</TheButton
      >
    </form>
  </main>
</template>

<style scoped lang="scss">
.mb-1 {
  margin-bottom: 1rem;
}
.modal {
  &-title {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding-bottom: 1rem;

    p {
      font-size: var(--medium_font);
    }
  }
  &-footer {
    padding-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
}

main {
  display: flex;
  padding-top: 2rem;
  flex-direction: column;
  height: calc(100vh - 16rem);

  h2 {
    color: var(--vt-c-cyan);
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
  .warning-message {
    display: flex;
    gap: 0.6rem;
    svg {
      width: 2rem;
      fill: var(--vt-c-warning);
    }
    span {
      font-size: var(--small_font);
      font-weight: var(--font_w_regular);
    }
  }
}
</style>

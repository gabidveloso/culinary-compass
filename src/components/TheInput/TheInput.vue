<script setup lang="ts">
import { ref } from 'vue'
import type { ITheInputProps, ITheInputEmits } from './TheInput.type'

defineProps<ITheInputProps>()

defineEmits<ITheInputEmits>()

const showPassword = ref(false)

function getType(attrs: Record<string, any>) {
  return attrs.type !== 'password' ? attrs.type : showPassword.value ? 'text' : 'password'
}
</script>

<template>
  <div class="input-wrapper">
    <div class="input" :class="{ error: errorMessages }">
      <label :for="id">{{ $t(label) }}</label>
      <div class="wrapper-hide-button">
        <input
          :id="id"
          v-bind="$attrs"
          :type="getType($attrs)"
          :value="value"
          :disabled="disabled"
          :required="required"
          @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
        />
        <button
          v-if="$attrs.type === 'password'"
          class="show-password"
          type="button"
          :area-label="showPassword ? $t('input.hidePassword') : $t('input.showPassword')"
          @click="showPassword = !showPassword"
        >
          <span>{{ showPassword ? $t('input.hidePassword') : $t('input.showPassword') }}</span>
        </button>
      </div>
    </div>
    <p class="error-message" v-for="errorMessage in errorMessages" :key="errorMessage">
      {{ $t(errorMessage) }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;

  .input {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0.4rem 1rem;
    border-radius: 0.25rem;
    background-color: var(--vt-c-black-mute);
    overflow: hidden;

    .wrapper-hide-button {
      display: flex;
      justify-content: space-between;

      .show-password {
        text-transform: uppercase;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    label {
      color: var(--vt-c-text-1);
      font-weight: var(--font_w_bold);
      font-size: var(--small_font);
    }

    input {
      width: 100%;
      &::placeholder {
        color: var(--vt-c-text-light-2);
      }
    }

    &::before {
      content: '';
      width: 0;
      left: 0;
      bottom: 0;
      position: absolute;
      height: 0.1rem;
      background-color: var(--vt-c-green);
      transition: all 0.2s ease-in-out;
    }

    &.error {
      &::before {
        width: 100%;
        background-color: var(--vt-c-error) !important;
      }
    }
    &:active,
    &:focus,
    &:focus-within,
    &:visited {
      &::before {
        width: 100%;
        background-color: var(--vt-c-cyan);
      }
    }

    &:hover {
      cursor: pointer;
      &::before {
        width: 100%;
      }
    }
  }

  .error-message {
    color: var(--vt-c-error);
    font-size: var(--small_font);
    margin-top: 0.2rem;
  }
}
</style>

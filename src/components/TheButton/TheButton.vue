<script setup lang="ts">
import type { ITheButtonProps } from './TheButton.type'

defineProps<ITheButtonProps>()
</script>

<template>
  <button v-bind="$attrs" :class="variant">
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
button {
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  min-height: 2.6rem;
  border-radius: 0.25rem;
  font-weight: var(--font_w_regular);
  cursor: pointer;
  transition: ease-in-out 0.2s all;
  overflow: hidden;

  span {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    box-shadow: inset 0 0 0 60px var(--vt-c-orange);
    transition: ease-in-out 0.2s all;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;

    &:hover {
      &::before {
        width: 0 !important;
      }
      color: var(--color-text) !important;
    }
  }

  &.primary {
    background-color: var(--vt-c-purple);

    &:hover {
      &::before {
        width: 100%;
      }
      color: var(--color-background-mute);
    }
  }

  &.text {
    &:hover {
      color: var(--vt-c-purple);
    }
  }
}
</style>

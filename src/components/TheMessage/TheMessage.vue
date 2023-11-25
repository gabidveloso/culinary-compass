<script setup lang="ts">
import type { ITheMessageEmits, ITheMessageProps } from './TheMessage.type'
import IconClose from '@/components/icons/IconClose.vue'

defineProps<ITheMessageProps>()

defineEmits<ITheMessageEmits>()
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="$props.show" class="message" :class="variant">
      <span>{{ $t(message) }}</span>
      <button type="button" @click="$emit('update:show')">
        <IconClose />
      </button>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.message {
  position: relative;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  min-height: 2.6rem;
  border-radius: 0.25rem;
  font-weight: var(--font_w_regular);
  transition: ease-in-out 0.2s all;
  overflow: hidden;

  span {
    position: relative;
    font-weight: var(--font_w_regular);
    color: var(--vt-c-text-dark-1);
    z-index: 1;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    width: 2rem;

    svg {
      width: 0.8rem;
      fill: var(--vt-c-text-dark-2);
    }

    &:hover {
      opacity: 0.8;
    }
  }

  &.warning {
    background-color: var(--vt-c-warning);
  }

  &.error {
    background-color: var(--vt-c-error);
  }

  &.success {
    background-color: var(--vt-c-success);
  }
}
</style>

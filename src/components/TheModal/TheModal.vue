<script setup lang="ts">
import type { ITheModalEmits, ITheModalProps } from './TheModal.type'

withDefaults(defineProps<ITheModalProps>(), {
  clickOutsideToClose: true,
  show: false
})

defineEmits<ITheModalEmits>()
</script>

<template>
  <div v-if="$props.show" class="modal">
    <div class="backdrop" @click="$emit('update:show', false)" />
    <div v-if="$props.show" class="content" role="dialog" aria-modal="true">
      <header>
        <slot name="header" />
      </header>
      <main>
        <slot name="body" />
      </main>
      <footer>
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .backdrop {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba($color: #191919c2, $alpha: 0.75);
  }

  .content {
    z-index: 10;
    margin-left: auto;
    margin-right: auto;
    max-width: 36rem;
    border-radius: 0.75rem;
    background-color: var(--vt-c-grey);
    padding: 1rem;
  }
}
</style>

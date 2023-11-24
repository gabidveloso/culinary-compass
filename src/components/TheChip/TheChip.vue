<script setup lang="ts">
import type { ITheChipEmits, ITheChipProps } from './TheChip.type'

const props = defineProps<ITheChipProps>()

const emit = defineEmits<ITheChipEmits>()

function handleClick(chipId: string) {
  const updatedChips = props.chips.map((chip) => {
    if (chip.id === chipId) {
      chip.active = !chip.active
    }
    return chip
  })

  emit('update:chips', updatedChips)
}
</script>

<template>
  <div class="chips">
    <button
      v-for="chip in $props.chips"
      :key="chip.id"
      class="chip"
      :class="{ active: chip.active }"
      @click="handleClick(chip.id)"
    >
      <span>{{ chip.label }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .chip {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 0.5rem 2rem;
    border: solid 2px var(--vt-c-purple);
    border-radius: 1.6rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    span {
      z-index: 3;
      font-weight: 600;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      border-radius: 1.6rem;
      background-color: var(--vt-c-purple);
      transition: width 0.2s ease-in-out;
    }

    &.active {
      border-color: var(--vt-c-orange);
      background-color: var(--vt-c-orange);
      &::before {
        width: 100%;
        background-color: var(--vt-c-orange);
      }
    }

    &:hover {
      &::before {
        width: 100%;
      }
    }
  }
}
</style>

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
      <img v-if="chip.icon" :src="chip.icon" :alt="chip.label" />
      <span>{{ chip.label }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;

  .chip {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    gap: 0.4rem;
    padding: 0.2rem 0.8rem;
    border: solid 1.2px var(--vt-c-cyan);
    border-radius: 1.6rem;
    font-weight: var(--font_w_regular);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    img {
      z-index: 1;
      width: 2rem;
      height: auto;
      max-height: 1.4rem;
      object-fit: contain;
      filter: opacity(0.5) drop-shadow(0 0 0 grey);
    }

    span {
      z-index: 3;
      font-weight: var(--font_w_bold);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      border-radius: 1.6rem;
      background-color: var(--vt-c-cyan);
      transition: width 0.2s ease-in-out;
    }

    &.active {
      border-color: var(--vt-c-green);
      background-color: var(--vt-c-green);
      color: var(--vt-c-white-mute);

      &::before {
        width: 100%;
        background-color: var(--vt-c-green);
      }
      img {
        filter: unset;
      }
    }

    &:hover {
      color: var(--vt-c-white-mute);

      &::before {
        width: 100%;
      }

      img {
        filter: unset;
      }
    }
  }
}
</style>

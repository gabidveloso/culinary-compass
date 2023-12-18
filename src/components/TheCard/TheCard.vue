<script setup lang="ts">
import { ref } from 'vue'
import type { ITheCardEmits, ITheCardProps } from './TheCard.type'
import IconBookmark from '@/components/icons/IconBookmark.vue'

defineProps<ITheCardProps>()

defineEmits<ITheCardEmits>()

const showImage = ref(false)
</script>

<template>
  <div class="card" v-show="showImage">
    <div class="card-header">
      <button
        v-show="showImage"
        type="button"
        :class="$props.bookmarked ? 'active' : ''"
        @click="$emit('update:bookmarked', !$props.bookmarked)"
        class="bookmark"
      >
        <IconBookmark />
      </button>
    </div>
    <RouterLink :to="$props.link ? $props.link : '/'" class="card-image">
      <img :src="$props.image" @load="showImage = true" alt="card image" />
      <span>{{ $props.title }}</span>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.card {
  z-index: 10;
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: var(--color-background-mute);
  transform: scale(1, 1) translateZ(0px);
  transition-duration: 300ms;
  transition-property: transform, box-shadow;
  transition-timing-function: ease-out;
  -webkit-font-smoothing: subpixel-antialiased;
  border: 1px solid var(--vt-c-divider-light-3);

  &:hover {
    box-shadow:
      rgba(54, 54, 54, 0.8) 0px 40px 58px -16px,
      rgba(54, 54, 54, 0.72) 0px 30px 22px -10px;
    transform: scale(1.05, 1.05) translateZ(0px) translate3d(0px, 0px, 0px);
    border-radius: 6px;
  }

  &-image {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    min-height: fit-content;
    flex-direction: column;

    span {
      position: absolute;
      padding: 0.2rem 0.4rem;
      width: 100%;
      background-image: linear-gradient(to bottom, rgb(255 255 255 / 2%), rgba(255, 255, 255, 1));
      // background-color: #ffffff87;
      // background: rgba(255, 255, 255, 0.2);
      // border-radius: 8px;
      // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      // backdrop-filter: blur(5px);
      // -webkit-backdrop-filter: blur(5px);
      // border: 1px solid rgba(255, 255, 255, 0.3);
      color: var(--vt-c-grey);
      bottom: 0;
      font-weight: var(--font_w_regular);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-header {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0.6rem;

    .bookmark {
      max-width: 2.4rem;
      max-height: 2.4rem;
      min-width: 2rem;
      min-height: 2rem;
      width: 10%;
      height: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-background);
      border-radius: 50%;
      transition: ease-in-out 0.2s all;
      cursor: pointer;
      opacity: 0.8;
      z-index: 2;

      svg {
        max-height: 1.8rem;
        height: fit-content;
        padding: 0.4rem;

        :deep(path) {
          stroke: var(--vt-c-white);
        }
      }

      &:hover {
        opacity: 1;
      }

      &.active {
        opacity: 1;
        svg {
          :deep(path) {
            stroke: var(--vt-c-green);
            fill: var(--vt-c-green);
          }
        }
      }
    }
  }
}
</style>

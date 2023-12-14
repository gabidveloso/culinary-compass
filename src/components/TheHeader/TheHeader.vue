<script setup lang="ts">
import type { ITheHeaderEmits, ITheHeaderProps } from './TheHeader.types'

defineProps<ITheHeaderProps>()

defineEmits<ITheHeaderEmits>()
</script>

<template>
  <nav class="header">
    <div class="left-side">
      <router-link to="/" class="logo-wrapper">
        <img
          alt="Culinary Compass logo"
          class="logo"
          src="@/assets/images/culinary_compass_logo.png"
        />
        <span>{{ $t('header.appName') }}</span>
      </router-link>

      <ul v-if="$props.isLoggedIn" class="menu">
        <li v-for="item in $props.menuItems" :key="item.path">
          <router-link :to="item.path" active-class="active">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>

    <div v-if="$props.isLoggedIn" class="right-side">
      <router-link class="btn-nav" active-class="active" to="/edit-user">{{
        $props.userName
      }}</router-link>
      <button class="btn-nav logout" @click="$emit('logout')">{{ $t('header.logout') }}</button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;

  .menu {
    a {
      color: var(--vt-c-green);
      font-weight: var(--font_w_regular);
      transition: ease-in-out 0.2s all;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -0.4rem;
        left: calc(50% - 0.15rem);
        background-color: var(--vt-c-green);
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        opacity: 0;
        transition: ease-in-out 0.2s all;
      }

      &:hover {
        background-color: unset;
        opacity: 0.8;

        &::after {
          opacity: 1;
        }
      }

      &.active {
        &::after {
          opacity: 1;
        }
      }
    }
  }

  .btn-nav {
    cursor: pointer;
    font-weight: var(--font_w_regular);
    transition: ease-in-out 0.2s all;
    color: var(--vt-c-cyan);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: -0.4rem;
      left: calc(50% - 0.15rem);
      background-color: var(--vt-c-green);
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      opacity: 0;
      transition: ease-in-out 0.2s all;
    }

    &.active {
      &::before {
        opacity: 1;
      }
    }

    &:hover {
      background-color: unset;
      &::before {
        opacity: 1;
      }
    }
  }

  .left-side,
  .right-side {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    gap: 1.4rem;

    &:hover {
      background-color: unset;
    }

    .logo {
      width: 4rem;
    }

    span {
      color: var(--vt-c-cyan);
      font-weight: var(--font_w_bold);
      font-size: var(--large_font);
    }
  }

  @media screen and (max-width: 768px) {
    .left-side,
    .right-side {
      gap: 1rem;
    }

    .logo-wrapper {
      img {
        min-width: 3rem;
      }

      span {
        display: none;
      }
    }
  }
}
</style>

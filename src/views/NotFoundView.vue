<template>
  <div class="not-found">
    <div class="not-found--image">
      <img src="@/assets/images/not-found.png" alt="404" />
    </div>
    <div class="not-found--text">
      <h1>{{ $t('notFound.title') }}</h1>
      <p>{{ $t('notFound.description') }}</p>
    </div>
    <router-link class="btn" to="/">{{ $t('notFound.goHome') }}</router-link>
  </div>
</template>
<style scoped lang="scss">
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  &--image {
    width: 25%;
    min-width: 10rem;
    max-width: 40rem;
    padding-top: 2rem;
    img {
      width: 100%;
      object-fit: cover;
    }
  }

  &--text {
    text-align: center;
    gap: 0.8rem;

    h1 {
      font-size: var(--not_found);
      font-weight: var(--font_w_bold);
      color: var(--vt-c-cyan);
    }

    p {
      max-width: 20rem;
    }
  }
  .btn {
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
    background-color: var(--vt-c-cyan);
    color: var(--color-background-mute);

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>

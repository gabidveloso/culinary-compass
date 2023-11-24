<script setup lang="ts">
import TheCard from '@/components/TheCard/TheCard.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import TheChip from '@/components/TheChip/TheChip.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import { ref } from 'vue'
import { useReposStore } from '@/stores/ReposStore/ReposStore'
import { REPOS_SORT_BY, type IRepoList } from '@/stores/ReposStore/ReposStore.type'
import { computed } from 'vue'
import { onMounted } from 'vue'

const repoStore = useReposStore()

repoStore.getRepos()

const intersectionRef = ref<Element | null>(null)
const chipsRef = ref<Element | null>(null)
const options = ref([
  { text: 'Stars', value: REPOS_SORT_BY.STARS },
  { text: 'Forks', value: REPOS_SORT_BY.FORKS },
  { text: 'Help wanted issues', value: REPOS_SORT_BY.ISSUES },
  { text: 'Updated', value: REPOS_SORT_BY.UPDATED }
])

const filteredCategories = computed(() => {
  return repoStore.categories.filter((category) => {
    return Object.keys(repoStore.repoList).find((key) => {
      return category.value === key && category.active
    })
  })
})

const carouselSettings = {
  itemsToShow: 3.95,
  snapAlign: 'center',
  transition: 500
}

const carouselBreakpoints = {
  // 650px and up
  650: {
    itemsToShow: 2,
    snapAlign: 'start'
  },
  // 700px and up
  700: {
    itemsToShow: 3,
    snapAlign: 'start'
  },
  // 900px and up
  900: {
    itemsToShow: 3,
    snapAlign: 'start'
  },
  // 1024 and up
  1024: {
    itemsToShow: 4,
    snapAlign: 'start'
  }
}

onMounted(() => {
  const handler = (entries: IntersectionObserverEntry[]) => {
    if (!entries[0].isIntersecting) {
      chipsRef.value?.classList.add('fixed')
    } else {
      chipsRef.value?.classList.remove('fixed')
    }
  }

  const observer = new window.IntersectionObserver(handler)

  observer.observe(intersectionRef.value!)
})
</script>
<template>
  <div class="bookmarked-wrapper">
    <div class="title-wrapper">
      <h1>{{ $t('discovery.bookmarkedTitle') }}</h1>
    </div>

    <carousel
      v-if="repoStore.bookmarkedRepos.length > 0"
      :settings="carouselSettings"
      :breakpoints="carouselBreakpoints"
    >
      <slide v-for="repo in repoStore.bookmarkedRepos" :key="repo.id">
        <div class="carousel__item">
          <TheCard
            :key="repo.id"
            :image="`https://opengraph.githubassets.com/123abc/${repo.full_name}`"
            :link="repo.url"
            :bookmarked="repoStore.checkedIfBookmarked(repo)"
            @update:bookmarked="repoStore.setBookmarkedRepo(repo)"
          />
        </div>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
  <div v-if="repoStore.bookmarkedRepos.length === 0" class="no-bookmarks">
    <div class="no-bookmarks--text">
      <h2>{{ $t('discovery.noBookmarks') }}</h2>
      <p>{{ $t('discovery.noBookmarksDescription') }}</p>
    </div>
  </div>
  <div ref="intersectionRef"></div>
  <div class="chips-wrapper">
    <h3>{{ $t('discovery.categoriesDescription') }}</h3>
    <div ref="chipsRef" class="chips">
      <TheChip :chips="repoStore.categories" />
    </div>
  </div>
  <Transition name="fade" mode="out-in">
    <div
      class="no-selected-chips"
      v-if="repoStore.categories.filter((category) => category.active).length === 0"
    >
      <div class="no-selected-chips--image">
        <img src="@/assets/images/empty-list.png" alt="empty list" />
      </div>
      <div class="no-selected-chips--text">
        <h2>{{ $t('discovery.emptyListTitle') }}</h2>
        <p>{{ $t('discovery.emptyList') }}</p>
      </div>
    </div>
  </Transition>

  <TransitionGroup name="list" tag="ul" class="repo-list" mode="out-in">
    <li :key="category.id" v-for="category in filteredCategories" :class="category.value">
      <div class="title-wrapper">
        <h1>{{ $t(`discovery.title${category.value}`) }}</h1>
      </div>
      <div class="select">
        <span>{{ $t('discovery.sortBy') }}</span>
        <select
          v-model="category.sortBy"
          @change="repoStore.repoSortBy(category.sortBy, category.value)"
        >
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :selected="option.value === category.sortBy"
          >
            {{ option.text }}
          </option>
        </select>
        <IconArrow class="arrow" />
      </div>

      <div style="position: relative">
        <carousel
          v-if="repoStore.repoList[category.value as keyof IRepoList].length > 0"
          :settings="carouselSettings"
          :breakpoints="carouselBreakpoints"
        >
          <slide
            v-for="repo in repoStore.repoList[category.value as keyof IRepoList]"
            :key="repo.id"
          >
            <div class="carousel__item">
              <TheCard
                :key="repo.id"
                :image="`https://opengraph.githubassets.com/123abc/${repo.full_name}`"
                :link="repo.html_url"
                :bookmarked="repoStore.checkedIfBookmarked(repo)"
                @update:bookmarked="repoStore.setBookmarkedRepo(repo)"
              />
            </div>
          </slide>

          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
    </li>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.bookmarked-wrapper {
  :deep(.carousel) {
    padding-top: 1.4rem;
  }
}
.chips-wrapper {
  display: flex;
  flex-direction: column;
  padding: 2rem 0 1rem;

  .chips {
    position: relative;

    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: var(--vt-c-black-mute);
      z-index: 100;
      padding: 0.8rem 2rem;
    }
  }
}

.no-selected-chips,
.no-bookmarks {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding: 4rem;

  &--image {
    width: 20%;
    max-width: 5rem;
    max-width: 10rem;
  }

  &--text {
    display: flex;
    gap: 0.6rem;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h2 {
      font-weight: 600;
      font-size: 16px;
      color: var(--vt-c-purple);
    }
  }
}
.title-wrapper {
  border-bottom: solid 0.16rem var(--vt-c-purple);
  h1 {
    font-weight: 600;
    font-size: 20px;
    padding: 0.6rem 0;
    color: var(--vt-c-purple);
    width: fit-content;

    position: relative;
    &::before {
      content: '';
      height: 0.2rem;
      width: 100%;
      background-color: var(--vt-c-purple);
      position: absolute;
      bottom: 0;
    }
  }
}

.repo-list {
  position: relative;
  display: block;
}

.select {
  position: relative;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 0;
  transition: opacity 0.2s ease-in-out;

  span {
    font-weight: 600;
    font-size: 12px;
  }

  select {
    border: 1px solid var(--vt-c-black-mute);
    border-radius: 5px;
    background: var(--vt-c-black-mute);
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    padding: 0.4rem;
    transition: all 150ms ease;
    min-width: 10.5rem;
  }

  .arrow {
    position: absolute;
    right: 0.6rem;
    width: 0.8rem;

    :deep(path) {
      fill: var(--color-text);
    }
  }

  &:hover {
    opacity: 0.8;
  }
}

h3 {
  font-weight: 500;
  padding: 0.6rem 0;
}
:deep(.carousel__track) {
  gap: 1rem;
  min-height: calc(100% + 20px);
}

:deep(.carousel__item) {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.carousel__viewport) {
  overflow: initial;
}
</style>

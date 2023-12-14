<script setup lang="ts">
import { computed } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

import TheCard from '@/components/TheCard/TheCard.vue'
import TheChip from '@/components/TheChip/TheChip.vue'
import { useFoodStore } from '@/stores/FoodStore/FoodStore'
import { type IFoodList } from '@/stores/FoodStore/FoodStore.type'

const foodStore = useFoodStore()

foodStore.getData()

const intersectionRef = ref<Element | null>(null)
const chipsRef = ref<Element | null>(null)

const filteredCategories = computed(() => {
  return foodStore.categoriesNames.filter((category) => {
    return Object.keys(foodStore.foodList).find((key) => {
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
    itemsToShow: 3,
    snapAlign: 'start'
  },
  // 700px and up
  700: {
    itemsToShow: 4,
    snapAlign: 'start'
  },
  // 900px and up
  900: {
    itemsToShow: 4,
    snapAlign: 'start'
  },
  // 1024 and up
  1024: {
    itemsToShow: 6,
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
      v-if="foodStore.bookmarkedFoods.length > 0"
      :settings="carouselSettings"
      :breakpoints="carouselBreakpoints"
    >
      <slide v-for="food in foodStore.bookmarkedFoods" :key="food.idMeal">
        <div class="carousel__item">
          <TheCard
            :key="food.idMeal"
            :image="food.strMealThumb"
            :title="food.strMeal"
            :link="`details/${food.idMeal}`"
            :bookmarked="foodStore.checkedIfBookmarked(food)"
            @update:bookmarked="foodStore.setBookmarkedFood(food)"
          />
        </div>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
  <div v-if="foodStore.bookmarkedFoods.length === 0" class="no-bookmarks">
    <div class="no-bookmarks--text">
      <h2>{{ $t('discovery.noBookmarks') }}</h2>
      <p>{{ $t('discovery.noBookmarksDescription') }}</p>
    </div>
  </div>
  <div ref="intersectionRef"></div>
  <div class="chips-wrapper">
    <h3>{{ $t('discovery.categoriesDescription') }}</h3>
    <div ref="chipsRef" class="chips">
      <TheChip :chips="foodStore.categoriesNames" />
    </div>
  </div>
  <Transition name="fade" mode="out-in">
    <div
      class="no-selected-chips"
      v-if="foodStore.categoriesNames.filter((category) => category.active).length === 0"
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

      <div style="position: relative">
        <carousel
          v-if="foodStore.foodList[category.value as keyof IFoodList].length > 0"
          :settings="carouselSettings"
          :breakpoints="carouselBreakpoints"
        >
          <slide
            v-for="food in foodStore.foodList[category.value as keyof IFoodList]"
            :key="food.idMeal"
          >
            <div class="carousel__item">
              <TheCard
                :key="food.idMeal"
                :image="food.strMealThumb"
                :title="food.strMeal"
                :link="`details/${food.idMeal}`"
                :bookmarked="foodStore.checkedIfBookmarked(food)"
                @update:bookmarked="foodStore.setBookmarkedFood(food)"
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
      font-weight: var(--font_w_bold);
      font-size: var(--large_font);
      color: var(--vt-c-cyan);
    }
  }
}
.title-wrapper {
  border-bottom: solid 0.1rem var(--vt-c-cyan);
  margin-bottom: 1.2rem;
  h1 {
    font-weight: var(--font_w_bold);
    font-size: var(--header_font_small);
    padding: 0.6rem 0;
    color: var(--vt-c-cyan);
    width: fit-content;

    position: relative;
    &::before {
      content: '';
      height: 0.14rem;
      width: 100%;
      background-color: var(--vt-c-cyan);
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
  font-size: var(--small_font);

  span {
    font-weight: var(--font_w_bold);
    font-size: var(--small_font);
  }

  select {
    border: 1px solid var(--vt-c-black-mute);
    border-radius: 5px;
    background: var(--vt-c-black-mute);
    cursor: pointer;
    font-family: inherit;
    font-size: var(--medium_font);
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
  font-weight: var(--font_w_regular);
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

:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: #13aac987;
  border-radius: 0.4rem;
}

:deep(.carousel__viewport) {
  overflow: initial;
}
</style>

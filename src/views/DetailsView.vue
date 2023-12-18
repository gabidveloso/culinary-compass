<script setup lang="ts">
import { useFoodStore } from '@/stores/FoodStore/FoodStore'
import { computed } from 'vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

interface IRecipe {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strIngredient1: string
  strIngredient2: string
  strIngredient3: string
  strIngredient4: string
  strIngredient5: string
  strIngredient6: string
  strIngredient7: string
  strIngredient8: string
  strIngredient9: string
  strIngredient10: string
  strIngredient11: string
  strIngredient12: string
  strIngredient13: string
  strIngredient14: string
  strIngredient15: string
  strIngredient16: string
  strIngredient17: string
  strIngredient18: string
  strIngredient19: string
  strIngredient20: string
  strMeasure1: string
  strMeasure2: string
  strMeasure3: string
  strMeasure4: string
  strMeasure5: string
  strMeasure6: string
  strMeasure7: string
  strMeasure8: string
  strMeasure9: string
  strMeasure10: string
  strMeasure11: string
  strMeasure12: string
  strMeasure13: string
  strMeasure14: string
  strMeasure15: string
  strMeasure16: string
  strMeasure17: string
  strMeasure18: string
  strMeasure19: string
  strMeasure20: string
  strTags: string
  strYoutube: string
}

const route = useRoute()

const foodStore = useFoodStore()

const details = ref<IRecipe>()

const ingredients = computed(() => {
  const activeIngredients: string[] = []

  if (!details.value) return []

  Object.keys(details.value).forEach((key) => {
    if (typeof details.value === 'undefined') return

    const ingredient = details.value[key as keyof IRecipe]

    if (key.includes('strIngredient') && ingredient.length > 0) {
      activeIngredients.push(
        `${
          details.value[key.replace('strIngredient', 'strMeasure') as keyof IRecipe]
        } ${ingredient}`
      )
    }
  })

  return activeIngredients
})

onMounted(async () => {
  const res = await foodStore.getDetails(route.params.id as string)

  details.value = (res as any).meals[0]
})
</script>
<template>
  <article>
    <hgroup>
      <div class="title">
        <h1>{{ details?.strMeal }}</h1>

        <div class="title--categories">
          <span v-if="details?.strCategory">{{ details?.strCategory }}</span>
          <span v-if="details?.strArea">{{ details?.strArea }}</span>
        </div>
      </div>
      <div class="image">
        <a v-if="details?.strYoutube" :href="details?.strYoutube" target="_blank" rel="Contents">{{
          $t('detail.youtube')
        }}</a>
        <img :src="details?.strMealThumb" :alt="details?.strTags" />
      </div>
    </hgroup>

    <section class="content">
      <div v-if="details?.strIngredient1" class="content--ingredients">
        <h2>{{ $t('detail.ingredients') }}</h2>
        <ul class="content--ingredients__list">
          <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
      </div>
      <div v-if="details?.strInstructions" class="content--instructions">
        <h2>{{ $t('detail.preparation') }}</h2>
        <span>{{ details?.strInstructions }}</span>
      </div>
    </section>
  </article>
</template>

<style scoped lang="scss">
hgroup {
  display: flex;
  flex-wrap: wrap;
  height: clamp(30rem, 30vw, 40rem);
  background-color: var(--vt-c-grey);
  border-radius: 0.8rem;
  overflow: hidden;

  .title {
    width: 40%;
    min-width: 15rem;
    justify-content: center;
    display: flex;
    gap: 2rem;
    flex-direction: column;

    h1 {
      color: var(--vt-c-cyan);
      font-weight: var(--font_w_bold);
      font-size: var(--header_font);
      padding: 0 2rem;
    }

    &--categories {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 0 2rem;

      span {
        color: var(--vt-c-white);
        background-color: var(--vt-c-green);
        padding: 0.2rem 0.8rem;
        border-radius: 0.4rem;
      }
    }
  }

  .image {
    position: relative;
    width: 60%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;

    a {
      position: absolute;
      background-color: var(--vt-c-cyan);
      color: var(--vt-c-white);
      padding: 0.2rem 1rem;
      border-radius: 1rem;
      opacity: 0.8;
      transition: ease-out 0.2s opacity;
      bottom: 1rem;

      &:hover {
        opacity: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.content {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  h2 {
    font-size: var(--xlarge_font);
    font-weight: var(--font_w_bold);
    padding-bottom: 1rem;
  }

  &--ingredients {
    width: calc(40% - 1rem);
    min-width: 20rem;
  }

  &--instructions {
    width: calc(60% - 1rem);
    span {
      text-indent: 1rem;
      line-height: 2;
    }
  }
}

@media screen and (max-width: 663px) {
  hgroup {
    gap: 0.4rem;

    .title,
    .image {
      width: 100%;
    }

    .title {
      height: 30%;
    }

    .image {
      height: 70%;
    }
  }
  .content {
    margin-top: 3rem;

    &--instructions {
      width: 100%;
    }
  }
}
</style>

<script setup lang="ts">
import { useFoodStore } from '@/stores/FoodStore/FoodStore'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// interface IIngredients {
//   strIngredient1: string
//   strIngredient2: string
//   strIngredient3: string
//   strIngredient4: string
//   strIngredient5: string
//   strIngredient6: string
//   strIngredient7: string
//   strIngredient8: string
//   strIngredient9: string
//   strIngredient10: string
//   strIngredient11: string
//   strIngredient12: string
//   strIngredient13: string
//   strIngredient14: string
//   strIngredient15: string
//   strIngredient16: string
//   strIngredient17: string
//   strIngredient18: string
//   strIngredient19: string
//   strIngredient20: string
// }

// interface IMeasures {
//   strMeasure1: string
//   strMeasure2: string
//   strMeasure3: string
//   strMeasure4: string
//   strMeasure5: string
//   strMeasure6: string
//   strMeasure7: string
//   strMeasure8: string
//   strMeasure9: string
//   strMeasure10: string
//   strMeasure11: string
//   strMeasure12: string
//   strMeasure13: string
//   strMeasure14: string
//   strMeasure15: string
//   strMeasure16: string
//   strMeasure17: string
//   strMeasure18: string
//   strMeasure19: string
//   strMeasure20: string
// }
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

onMounted(async () => {
  const res = await foodStore.getDetails(route.params.id as string)

  details.value = (res as any).meals[0]
})
</script>
<template>
  <article>
    <header>
      <div class="title">
        <h1>{{ details?.strMeal }}</h1>
        <div class="title--categories">
          <span v-if="details?.strCategory">{{ details?.strCategory }}</span>
          <span v-if="details?.strArea">{{ details?.strArea }}</span>
        </div>
        <div class="image">
          <img :src="details?.strMealThumb" :alt="details?.strTags" />
        </div>
      </div>
    </header>

    <section class="content">
      <div v-if="details?.strIngredient1" class="content--ingredients">
        <span>{{ details?.strIngredient1 }} {{ details?.strMeasure1 }}</span>
        <span>{{ details?.strIngredient2 }} {{ details?.strMeasure2 }}</span>
      </div>
      <div v-if="details?.strInstructions" class="content--instructions">
        <span>{{ details?.strInstructions }}</span>
      </div>
    </section>
  </article>
</template>

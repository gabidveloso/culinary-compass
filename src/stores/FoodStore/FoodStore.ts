import { defineStore } from 'pinia'
import { useStorageAsync } from '@vueuse/core'
import { ref } from 'vue'
import { type IFood } from './FoodStore.type'
import type { IChip } from '@/components/TheChip/TheChip.type'

export const useFoodStore = defineStore('food', () => {
  const bookmarkedFoods = useStorageAsync<IFood[]>('bookmarkedFoods', [])

  const foodList = ref()

  const categoriesNames = ref<IChip[]>([])

  async function getAllRecipes() {
    return await fetch(import.meta.env.VITE_FOOD_API_BASE_URL + 'feeds/list?limit=24&start=0', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_X_RAPID_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_X_RAPID_API_HOST
      }
    })
  }

  async function getCategories() {
    if (categoriesNames.value.length > 0) return
    const res = await fetch(import.meta.env.VITE_FOOD_API_BASE_URL + 'categories.php')

    const data = await res.json()

    data.categories.map((category: any) => {
      categoriesNames.value.push({
        label: category.strCategory,
        id: category.idCategory,
        active: true,
        icon: category.strCategoryThumb,
        value: category.strCategory
      })
    })
  }

  async function getRecipes() {
    const res = await Promise.all(
      categoriesNames.value.map(async (category: any) => {
        return await fetch(
          import.meta.env.VITE_FOOD_API_BASE_URL + 'filter.php?c=' + category.value
        )
      })
    )

    const data = await Promise.all(res.map((res) => res.json()))

    foodList.value = Object.fromEntries(
      categoriesNames.value.map((category, index) => [category.value, data[index].meals])
    ) as typeof foodList.value
  }

  async function getData() {
    await getCategories()

    await getRecipes()
  }

  function setBookmarkedFood(food: IFood) {
    const hasBookmark = bookmarkedFoods.value.find(
      (bookmarkedFood) => bookmarkedFood.idMeal === food.idMeal
    )

    if (hasBookmark) {
      bookmarkedFoods.value = bookmarkedFoods.value.filter(
        (bookmarkedFood) => bookmarkedFood.idMeal !== food.idMeal
      )
    } else {
      bookmarkedFoods.value.push(food)
    }
  }

  function setActiveCategory(id: string) {
    categoriesNames.value.forEach((category) => {
      category.active = category.id === id
    })
  }

  function checkedIfBookmarked(food: IFood) {
    return bookmarkedFoods.value.some((bookmarkedRepo) => bookmarkedRepo.idMeal === food.idMeal)
  }

  function reset() {
    categoriesNames.value.forEach((category) => {
      category.active = true
    })

    bookmarkedFoods.value = []

    localStorage.removeItem('bookmarkedFoods')
    localStorage.removeItem('categoriesNames')
  }

  async function getDetails(id: string) {
    return await fetch(import.meta.env.VITE_FOOD_API_BASE_URL + 'lookup.php?i=' + id).then((res) =>
      res.json()
    )
  }

  return {
    bookmarkedFoods,
    setBookmarkedFood,
    setActiveCategory,
    checkedIfBookmarked,
    reset,
    getAllRecipes,
    getCategories,
    categoriesNames,
    getRecipes,
    getData,
    foodList,
    getDetails
  }
})

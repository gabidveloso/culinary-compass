import { expect, describe, it, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFoodStore } from '../FoodStore/FoodStore'
import type { IFood } from '../FoodStore/FoodStore.type'

// Mock fetch function
;(global as any).fetch = vi.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve({ items: [] })
    }
  })
})

describe('useFoodStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should fetch repos and update foodList', async () => {
    const foodStore = useFoodStore()
    await foodStore.getData()

    expect(fetch).toHaveBeenCalledTimes(foodStore.categoriesNames.length)
    expect(foodStore.foodList).toBeGreaterThan(0)
  })

  it('should handle setBookmarkedFood', () => {
    const foodStore = useFoodStore()
    const mockFood = { idMeal: '1', strMeal: 'Recipe1' } as IFood

    foodStore.setBookmarkedFood(mockFood)
    expect(foodStore.setBookmarkedFood).toEqual([mockFood])

    foodStore.setBookmarkedFood(mockFood)
    expect(foodStore.setBookmarkedFood).toEqual([])
  })

  it('should handle setActiveCategory', () => {
    const foodStore = useFoodStore()

    foodStore.setActiveCategory('1')
    expect(foodStore.categoriesNames[0].active).toBe(false)
    expect(foodStore.categoriesNames[1].active).toBe(true)
  })

  it('should handle checkedIfBookmarked', () => {
    const foodStore = useFoodStore()
    const mockFood = { idMeal: '1', strMeal: 'Recipe1' } as IFood

    expect(foodStore.checkedIfBookmarked(mockFood)).toBe(false)

    foodStore.setBookmarkedFood(mockFood)
    expect(foodStore.checkedIfBookmarked(mockFood)).toBe(true)
  })

  it('should handle reset', () => {
    const foodStore = useFoodStore()
    const mockFood = { idMeal: '1', strMeal: 'Recipe1' } as IFood

    foodStore.setBookmarkedFood(mockFood)
    foodStore.setActiveCategory('1')
    expect(foodStore.bookmarkedFoods).toEqual([mockFood])
    expect(foodStore.categoriesNames[0].active).toBe(false)
    expect(foodStore.categoriesNames[1].active).toBe(true)

    foodStore.reset()
    expect(foodStore.bookmarkedFoods).toEqual([])
    expect(foodStore.categoriesNames[0].active).toBe(true)
    expect(foodStore.categoriesNames[1].active).toBe(true)
  })
})

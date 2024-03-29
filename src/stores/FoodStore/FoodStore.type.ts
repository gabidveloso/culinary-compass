interface IFood {
  strMeal: string
  strMealThumb: string
  idMeal: string
}

interface ICategoriesNames {
  label: string
  value: string
  id: string
  active: boolean
}

export type { IFood, ICategoriesNames }

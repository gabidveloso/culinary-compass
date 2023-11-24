import { defineStore } from 'pinia'
import { useStorageAsync } from '@vueuse/core'
import { ref } from 'vue'
import {
  type IRepoList,
  type IGitHubRepository,
  type ICategoriesNames,
  REPOS_SORT_BY
} from './ReposStore.type'

export const useReposStore = defineStore('repos', () => {
  const bookmarkedRepos = useStorageAsync<IGitHubRepository[]>('bookmarkedRepos', [])

  const categories = useStorageAsync<ICategoriesNames[]>('categories', [
    {
      label: 'JavaScript',
      value: 'javascript',
      id: '0',
      active: true,
      sortBy: REPOS_SORT_BY.STARS
    },
    { label: 'Vue', value: 'vue', id: '1', active: true, sortBy: REPOS_SORT_BY.STARS },
    { label: 'CSS', value: 'css', id: '2', active: true, sortBy: REPOS_SORT_BY.STARS },
    {
      label: 'TypeScript',
      value: 'typescript',
      id: '3',
      active: true,
      sortBy: REPOS_SORT_BY.STARS
    },
    { label: 'GO', value: 'go', id: '4', active: true, sortBy: REPOS_SORT_BY.STARS },
    { label: 'Node', value: 'node', id: '5', active: true, sortBy: REPOS_SORT_BY.STARS }
  ])

  const repoList = ref<IRepoList>({
    javascript: [],
    vue: [],
    css: [],
    typescript: [],
    go: [],
    node: []
  })

  const headers = {
    headers: {
      Authorization: 'Bearer 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',
      'Content-Type': 'application/json'
    }
  }

  async function getRepos() {
    const res = await Promise.all(
      categories.value.map(async (category) => {
        return await fetch(
          `https://api.github.com/search/repositories?q=language%3A${category.value}%20stars%3A%3E1000%20license%3Amit&per_page=5&page=1&sort=${category.sortBy}`,
          headers
        )
      })
    )

    const data = await Promise.all(res.map((res) => res.json()))

    repoList.value = Object.fromEntries(
      categories.value.map((category, index) => [category.value, data[index].items])
    ) as typeof repoList.value
  }

  async function repoSortBy(type: string, category: string) {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=language%3A${category}%20stars%3A%3E1000%20license%3Amit&per_page=5&page=1&sort=${type}`,
      headers
    )

    const data = await res.json()

    repoList.value[category as keyof IRepoList] = data.items
  }

  function setBookmarkedRepo(repo: IGitHubRepository) {
    const hasBookmark = bookmarkedRepos.value.find(
      (bookmarkedRepo) => bookmarkedRepo.id === repo.id
    )

    if (hasBookmark) {
      bookmarkedRepos.value = bookmarkedRepos.value.filter(
        (bookmarkedRepo) => bookmarkedRepo.id !== repo.id
      )
    } else {
      bookmarkedRepos.value.push(repo)
    }
  }

  function setActiveCategory(id: string) {
    categories.value.forEach((category) => {
      category.active = category.id === id
    })
  }

  function checkedIfBookmarked(repo: IGitHubRepository) {
    return bookmarkedRepos.value.some((bookmarkedRepo) => bookmarkedRepo.id === repo.id)
  }

  function reset() {
    categories.value.forEach((category) => {
      category.active = true
      category.sortBy = REPOS_SORT_BY.STARS
    })

    bookmarkedRepos.value = []

    localStorage.removeItem('bookmarkedRepos')
    localStorage.removeItem('categories')
  }

  return {
    repoList,
    bookmarkedRepos,
    getRepos,
    categories,
    setBookmarkedRepo,
    setActiveCategory,
    checkedIfBookmarked,
    repoSortBy,
    reset
  }
})

import { expect, describe, it, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useReposStore } from '../FoodStore/FoodStore'
import type { IGitHubRepository } from '../FoodStore/FoodStore.type'

// Mock fetch function
;(global as any).fetch = vi.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve({ items: [] })
    }
  })
})

describe('useReposStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with default values', () => {
    const reposStore = useReposStore()

    expect(reposStore.repoList).toEqual({
      javascript: [],
      vue: [],
      css: [],
      typescript: [],
      go: [],
      node: []
    })

    expect(reposStore.bookmarkedRepos).toEqual([])
    expect(reposStore.categories).toEqual([
      { label: 'JavaScript', value: 'javascript', id: '0', active: true, sortBy: 'stars' },
      { label: 'Vue', value: 'vue', id: '1', active: true, sortBy: 'stars' },
      { label: 'CSS', value: 'css', id: '2', active: true, sortBy: 'stars' },
      { label: 'TypeScript', value: 'typescript', id: '3', active: true, sortBy: 'stars' },
      { label: 'GO', value: 'go', id: '4', active: true, sortBy: 'stars' },
      { label: 'Node', value: 'node', id: '5', active: true, sortBy: 'stars' }
    ])
  })

  it('should fetch repos and update repoList', async () => {
    const reposStore = useReposStore()
    await reposStore.getRepos()

    expect(fetch).toHaveBeenCalledTimes(reposStore.categories.length)
    expect(reposStore.repoList).toEqual({
      javascript: [],
      vue: [],
      css: [],
      typescript: [],
      go: [],
      node: []
    })
  })

  it('should handle repoSortBy', async () => {
    const reposStore = useReposStore()
    await reposStore.repoSortBy('stars', 'javascript')

    expect(reposStore.repoList.javascript).toEqual([])
  })

  it('should handle setBookmarkedRepo', () => {
    const reposStore = useReposStore()
    const mockRepo = { id: 1, name: 'Repo1' } as IGitHubRepository

    reposStore.setBookmarkedRepo(mockRepo)
    expect(reposStore.bookmarkedRepos).toEqual([mockRepo])

    reposStore.setBookmarkedRepo(mockRepo)
    expect(reposStore.bookmarkedRepos).toEqual([])
  })

  it('should handle setActiveCategory', () => {
    const reposStore = useReposStore()

    reposStore.setActiveCategory('1')
    expect(reposStore.categories[0].active).toBe(false)
    expect(reposStore.categories[1].active).toBe(true)
  })

  it('should handle checkedIfBookmarked', () => {
    const reposStore = useReposStore()
    const mockRepo = { id: 1, name: 'Repo1' } as IGitHubRepository

    expect(reposStore.checkedIfBookmarked(mockRepo)).toBe(false)

    reposStore.setBookmarkedRepo(mockRepo)
    expect(reposStore.checkedIfBookmarked(mockRepo)).toBe(true)
  })

  it('should handle reset', () => {
    const reposStore = useReposStore()
    const mockRepo = { id: 1, name: 'Repo1' } as IGitHubRepository

    reposStore.setBookmarkedRepo(mockRepo)
    reposStore.setActiveCategory('1')
    expect(reposStore.bookmarkedRepos).toEqual([mockRepo])
    expect(reposStore.categories[0].active).toBe(false)
    expect(reposStore.categories[1].active).toBe(true)

    reposStore.reset()
    expect(reposStore.bookmarkedRepos).toEqual([])
    expect(reposStore.categories[0].active).toBe(true)
    expect(reposStore.categories[1].active).toBe(true)
  })
})

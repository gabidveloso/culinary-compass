interface ITheCardProps {
  image?: string
  link?: string
  bookmarked?: boolean
}

interface ITheCardEmits {
  (e: 'update:bookmarked', value: boolean): void
}

export type { ITheCardProps, ITheCardEmits }

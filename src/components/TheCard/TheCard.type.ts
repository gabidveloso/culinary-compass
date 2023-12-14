interface ITheCardProps {
  image?: string
  link?: string
  bookmarked?: boolean
  title: string
}

interface ITheCardEmits {
  (e: 'update:bookmarked', value: boolean): void
}

export type { ITheCardProps, ITheCardEmits }

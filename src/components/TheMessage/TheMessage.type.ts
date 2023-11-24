export enum THE_MESSAGE_VARIANTS {
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success'
}

interface ITheMessageProps {
  message: string
  variant: THE_MESSAGE_VARIANTS
  show: boolean
}

interface ITheMessageEmits {
  (e: 'update:show'): void
}

export type { ITheMessageProps, ITheMessageEmits }

interface ITheInputProps {
  id: string
  label: string
  value: string
  required?: boolean
  disabled?: boolean
  errorMessages?: string[]
}

interface ITheInputEmits {
  (e: 'update:value', value: string): void
}

export type { ITheInputProps, ITheInputEmits }

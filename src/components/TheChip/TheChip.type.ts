interface IChip {
  label: string
  active: boolean
  icon?: string
  id: string
  value: string
}

interface ITheChipProps {
  chips: IChip[]
}

interface ITheChipEmits {
  (event: 'update:chips', value: IChip[]): void
}

export type { ITheChipProps, ITheChipEmits, IChip }

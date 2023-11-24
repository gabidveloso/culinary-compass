interface IChip {
  label: string
  active: boolean
  id: string
}

interface ITheChipProps {
  chips: IChip[]
}

interface ITheChipEmits {
  (event: 'update:chips', value: IChip[]): void
}

export type { ITheChipProps, ITheChipEmits, IChip }

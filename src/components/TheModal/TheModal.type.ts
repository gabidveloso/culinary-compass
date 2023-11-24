export interface ITheModalProps {
  clickOutsideToClose?: boolean
  show?: boolean
}

export interface ITheModalEmits {
  (e: 'update:show', state: boolean): void
}

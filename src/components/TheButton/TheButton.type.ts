export enum THE_BUTTON_VARIANTS {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TEXT = 'text',
  DANGER = 'danger'
}

interface ITheButtonProps {
  variant?: THE_BUTTON_VARIANTS
  id: string
}

export type { ITheButtonProps }

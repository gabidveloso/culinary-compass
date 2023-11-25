export enum THE_BUTTON_VARIANTS {
  PRIMARY = 'primary',
  TEXT = 'text'
}

interface ITheButtonProps {
  variant?: THE_BUTTON_VARIANTS
  id: string
}

export type { ITheButtonProps }

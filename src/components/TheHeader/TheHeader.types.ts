interface IMenuItem {
  name: string
  path: string
}

interface ITheHeaderProps {
  menuItems?: IMenuItem[]
  userName?: string | null
  isLoggedIn: boolean
}

interface ITheHeaderEmits {
  (e: 'logout'): void
}

export type { IMenuItem, ITheHeaderProps, ITheHeaderEmits }

export interface NavLink {
  name: string
  href: string
}

export interface Stat {
  label: string
  value: string
  description: string
  image: string
  color: string
}

export interface Service {
  title: string
  description: string
  icon: React.ComponentType<{ size?: number | string }>
}

export interface Project {
  title: string
  category: string
  description: string
  image: string
  size: 'large' | 'small'
}

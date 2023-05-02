import { Icon } from '@iconify/react'

export interface Props {
  icon: string
  size?: number
}

export function BaseIcon({ icon, size }: Props) {
  if (!icon) return null
  return <Icon icon={icon} width={size || 20} inline={true} />
}

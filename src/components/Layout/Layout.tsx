import { LayoutProps } from './layout.props'

import styles from './layout.module.css'
import { cn } from 'src/utils'
export function Layout({ className, children }: LayoutProps) {
  return (
    <div
      className={cn(
        styles.layout,
        className,

      )}
    >
      {children}
    </div>
  )
}

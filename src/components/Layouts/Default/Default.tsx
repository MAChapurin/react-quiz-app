import { cn } from '@/utils'
import styles from './Default.module.css'

export const Default: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className
}) => {
  return <main className={cn(styles.container, className)}>{children}</main>
}

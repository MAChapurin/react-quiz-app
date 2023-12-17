import clsx from "@/utils/cl"
import styles from './loader.module.css'

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({className, ...otherProps}) => {
  return (
    <div className={clsx(styles.loader, className)} {...otherProps}>
      <span className={styles.loaderSpan}>
      </span>
    </div>
  )
}

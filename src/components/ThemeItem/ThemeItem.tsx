import React from 'react'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '@/hooks/tolkitHooks'
import { addTheme, removeTheme } from '@/store/slices/themesSlice'
import { CheckedIcon } from '../icons/CheckedIcon'
import styles from './ThemeItem.module.css'

interface IThemeItem extends React.HTMLAttributes<HTMLElement> {
  name: string
  quizzes: number[]
}

export function ThemeItem({ name, quizzes, ...props }: IThemeItem) {
  const dispatch = useAppDispatch()

  const themesListActive = useAppSelector(state => state.themes.activeThemes)

  const [isChecked, setIsChecked] = React.useState(false)

  const handleClick = () => {
    if (!isChecked) {
      if (themesListActive.length === 3) return
      dispatch(addTheme(quizzes))
      setIsChecked(!isChecked)
    } else {
      dispatch(removeTheme(quizzes))
      setIsChecked(!isChecked)
    }

  }

  return (
    <li className={styles.li}>
      <button
        className={cn(styles.btn,
          {
            [styles.isChecked]: isChecked,
          }
        )}
        style={{ backgroundImage: `url(/images/themes/${name}.png)` }}
        {...props} onClick={handleClick}>
        <h3 className={styles.h3}>
          {name}
          {isChecked
            &&
            <CheckedIcon className={styles.icon} />}
        </h3>
      </button>
    </li >
  )
}

import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks'

import { cn } from '@/utils'

import { addTheme, removeTheme } from '@/store/slices/themesSlice'

import { CheckedIcon } from '@/components/icons/CheckedIcon'

import styles from './Theme.module.css'

type IThemeItem = React.HTMLAttributes<HTMLButtonElement> & {
  name: string
  themeId: number
  quizzes: number[]
}

export function ThemeItem({ name, themeId, quizzes, ...props }: IThemeItem) {
  const dispatch = useAppDispatch()

  const themesListActive = useAppSelector((state) => state.themes.activeThemes);

  const [isChecked, setIsChecked] = React.useState(!!themesListActive.find((item) => item.id === themeId))
  // const [isChecked, setIsChecked] = React.useState(false)

  const handleClick = () => {
    if (!isChecked) {
      if (themesListActive.length === 3) return
      dispatch(addTheme({ name, themeId, quizzes }))
      setIsChecked(!isChecked)
    } else {
      dispatch(removeTheme(themeId))
      setIsChecked(!isChecked)
    }
  }

  useEffect(()=> {
    console.log(themesListActive)
  },[themesListActive])

  return (
    <button
      onClick={handleClick}
      className={cn(styles.btn, {
        [styles.isChecked]: isChecked,
        [styles.rest]: themesListActive.length === 3 && !isChecked
      })}
      style={{ backgroundImage: `url(/images/themes/${name}.png)` }}
      {...props}
    >
      <span className={styles.name}>{name}</span>
      <div className={styles.filter}></div>
      {isChecked && <CheckedIcon className={styles.icon} />}
    </button>
  )
}

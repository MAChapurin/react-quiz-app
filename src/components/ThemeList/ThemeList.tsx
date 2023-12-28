import React from 'react'

import { ThemeItem } from './ThemeItem/ThemeItem'

import styles from './ThemeList.module.css'
import { cn } from '@/utils'

interface IBackground {
  dark: string
  light: string
}

interface ITheme {
  background: IBackground
  createdAt: Date
  id: number
  name: string
  quizzes: number[]
  updatedAt: Date
}


interface IThemeList extends React.HTMLAttributes<HTMLDivElement> {
  themesList: ITheme[]
  className?: string
}

export function ThemeList({
  themesList,
  className,
  ...otherProps
}: IThemeList) {
  return (
    <div className={cn(styles.ul, className)} {...otherProps}>
      {!!themesList?.length &&
        themesList.map((el) => {
          const { id, name, quizzes } = el
          return (
            <ThemeItem key={id.toString()} themeId={id} name={name} quizzes={quizzes}/>
          )
        })}
    </div>
  )
}

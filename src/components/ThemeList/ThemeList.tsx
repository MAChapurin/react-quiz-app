import React from "react";
import cn from "classnames";

import { ITheme } from "@/store/slices/themesSlice";

import { ThemeItem } from "../ThemeItem/ThemeItem";

import styles from './ThemeList.module.css'


interface IThemeList extends React.HTMLAttributes<HTMLUListElement> {
  themesList: ITheme[]
  className?: string
}

export function ThemeList({ themesList, className, ...otherProps }: IThemeList) {
  return (
    <ul className={cn(styles.ul, className)} {...otherProps}>
      {!!themesList?.length && themesList.map((el) => {
        const { id, name, quizzes } = el
        return (
          <React.Fragment key={id}>
            <ThemeItem  {...{ name, quizzes }} />
          </React.Fragment>
        )
      })}
    </ul>
  )
}


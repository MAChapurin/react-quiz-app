import { useAppDispatch, useAppSelector } from '@/hooks/tolkitHooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './themes.module.css'
import { Button, Logo } from '@/components/UI'
import { ThemeList } from '@/components/ThemeList/ThemeList'
import { reset, themes } from '@/store/slices/themesSlice'
import { addQuiz } from '@/store/slices/authSlice'
// import { useHotKey } from '@/hooks/useHotKey'
import { useSystemHook } from '@/hooks/useSystemHook'

export const Themes: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const themesList = useAppSelector(state => state.themes.themes)
  const themesListActive = useAppSelector(state => state.themes.activeThemes)

  const handlerBtn = () => {
    if (themesListActive.length === 3) {
      dispatch(addQuiz(themesListActive.flat()))
      navigate('/main')
    }

  }

  // const { shortcut, tip } = useHotKey(handlerBtn)
  const btnClue = useSystemHook(handlerBtn)


  useEffect(() => {
    dispatch(reset())
  }, [])


  useEffect(() => {
    dispatch(themes())
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Logo className={styles.logo} />
        <h2 className={styles.h2}>Выбери интересующие темы</h2>
      </div>
      <ThemeList className={styles.list} {...{ themesList }} />
      <Button
        onClick={handlerBtn}
        type='button'
        className={styles.btn}
        disabled={themesListActive.length < 3}
        tip={btnClue}
      >
        Продолжить
      </Button>
    </div>
  )
}

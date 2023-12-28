import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Themes.module.css'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { useHotKey } from '@/hooks/useHotKey'
import { themes } from '@/store/slices/themesSlice'
import { Default } from '@/components/Layouts'
import { Button, Logo } from '@/components/UI'
import { ThemeList } from '@/components/ThemeList/ThemeList'
// import { addQuiz } from '../../shared/model/slices/user'

export const Themes: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const themesList = useAppSelector((state) => state.themes.themes)
  const themesListActive = useAppSelector((state) => state.themes.activeThemes)

  const user = useAppSelector((state => state.auth.user))
  // const theme = useAppSelector(state => state.theme.theme)

  const handlerBtn = () => {
    if (themesListActive.length >= 3) {
      // dispatch(addQuiz(themesListActive.flat()))
      navigate('/main')
    }
  }

  const { shortcut, tip } = useHotKey(handlerBtn)

  useEffect(() => {
    if (!user?.name) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    console.log(shortcut)
    dispatch(themes())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Default>
      <div className={styles.container}>
        <div className={styles.header}>
        <Logo />
          <h2>
            Выбери <span>интересующие</span> темы
          </h2>
        </div>
        <ThemeList {...{ themesList }} />
        <Button
          onClick={handlerBtn}
          type='button'
          disabled={themesListActive.length < 3}
          tip={tip}
          // shortcut={shortcut}
        >
          Продолжить
        </Button>
      </div>
    </Default>
  )
}

import { useNavigate } from 'react-router-dom'
import { Logo, Button } from "@/components/UI";
import styles from './notFound.module.css'
import { useSystemHook } from '@/hooks/useSystemHook';


export function NotFound() {

  const navigate = useNavigate()

  const handleClick = () => {
    if(localStorage.getItem('name')) {
      navigate('/themes')
    } else {
      navigate('/')
    }
  }

  const handleKeyPress = () => {
    if(localStorage.getItem('name')) {
      navigate('/themes')
    } else {
      navigate('/')
    }
  }

  const btnClue = useSystemHook(handleKeyPress)

  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <div className={styles.content}>
        <img
          className={styles.img}
          src='/images/illustration2.png'
          alt='Иллюстрация'
        />
        <p className={styles.message}>
          Ой, кажется такой страницы не&nbsp;существует
        </p>
        <Button
          tip={btnClue}
          onClick={handleClick}
          className={styles.btn}>
          На главную
        </Button>
      </div>
    </div>

  )
}

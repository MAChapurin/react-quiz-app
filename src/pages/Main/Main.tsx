import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/tolkitHooks';
import { logoutUser } from '@/store/slices/authSlice';
import { Button } from '@/components/UI';
import styles from './main.module.css'


export function Main() {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <Button
      onClick={handleClick}
      className={styles.link}
    >
      Выйти
    </Button>
  )
}

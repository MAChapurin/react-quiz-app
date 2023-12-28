import { Navigate } from 'react-router-dom'
import { Default } from '../Layouts'
import { useAppSelector } from '@/hooks'


interface ILayoutProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Layout = ({children, ...props}: ILayoutProps) => {
  const themesListActive = useAppSelector((state) => state.themes.activeThemes)


  return themesListActive.length === 3 ? (
    <Default {...props}>

        {children}

    </Default>
  )
  :
  <Navigate to={'/'} replace />
}

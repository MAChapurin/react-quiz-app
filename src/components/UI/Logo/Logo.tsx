import { Link } from 'react-router-dom';
import {cn} from '@/utils/cl';
import LogoIcon from '@/components/icons/Logo';
import styles from './logo.module.css';

interface LogoProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  to?: string
  className?: string
}

export const Logo: React.FC<LogoProps> = ({
  className,
  to = '/',
  ...otherProps
}) => {
  return (
    <Link to={to} className={cn(styles.logo, className)} {...otherProps}>
      <LogoIcon />
    </Link>
  );
};

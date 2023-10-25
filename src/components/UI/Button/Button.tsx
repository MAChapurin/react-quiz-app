import clsx from '@/utils/clsx';
import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tip?: string;
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  tip,
	className,
	children,
  disabled = false,
	...otherProps
}) => {
	return (
    <>
		<button
      disabled={disabled}
      className={clsx(styles.btn, className)}
      {...otherProps}
    >
			{children}
		</button>
    {tip &&
      <span className={styles.tip}>
        или нажми
        <span>
          {tip}
        </span>
      </span>
    }
    </>
	);
};

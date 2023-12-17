import clsx from '@/utils/cl';
import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tip?: string;
  disabled?: boolean;
  // shortcut?: string
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
      {tip &&
      <span className={styles.tip}>
        или нажми
        <span>
          {tip}
        </span>
      </span>
    }
		</button>
    </>
	);
};

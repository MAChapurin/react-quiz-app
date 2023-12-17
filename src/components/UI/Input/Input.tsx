import clsx from '@/utils/cl';
import styles from './input.module.css';
import ClearInput from '@/components/icons/ClearInput';
import EyeInput from '@/components/icons/EyeInput';
import { useState } from 'react';
import CrossEyeInput from '@/components/icons/CrossEyeInput';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	tooltip?: string;
	label?: string;
  error?: string;
  type?: string;
  colorError?: string;
  value: string;
  setValue: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
	className,
	tooltip,
	label,
	id,
  type = 'text',
  error,
  value,
  setValue,
  colorError = 'red',
	...otherProps
}) => {
  const [shownPassword, setIsShownPassword] = useState<boolean>(false)

  const showPassword = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!shownPassword) {
      setIsShownPassword(true)
    } else {
      setIsShownPassword(false)
    }
  }

	return (
		<div className={clsx(styles.wrapper, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
        <input
          className={error ? clsx(styles.input, colorError === 'red' ? styles.red : styles.green) : styles.input}
          id={id}
          autoComplete='off'
          type={shownPassword ? 'text' : type}
          value={value}
          maxLength={30}
          {...otherProps}
        />
        <div className={styles.inputBtns}>
          <div
            onClick={() => setValue('')}
            className={type === 'password' ? clsx(styles.clearBtn, styles.secondBtn) : styles.clearBtn}>
            <ClearInput />
          </div>
          {type === 'password' &&
            <button
              className={styles.showInput}
              onClick={showPassword}
              type='button'
            >
              {shownPassword
                ? <CrossEyeInput />
                : <EyeInput />
              }
            </button>
          }
        </div>
        {error &&
          <span className={clsx(styles.tooltip, styles.error, colorError === 'red' ? styles.red : styles.green)}>
            {error}
          </span>}
        {tooltip && <span className={styles.tooltip}>{tooltip}</span>}
      </label>
		</div>
	);
};

import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/tolkitHooks';
import { login } from '@/store/slices/authSlice';

import { Button, Input, Loader } from '@/components/UI';

import clsx from '@/utils/clsx';
import styles from './form.module.css';
import { isValidName, isValidPassword } from '@/utils';
import { useSystemHook } from '@/hooks/useSystemHook';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> { }

export const Form: React.FC<FormProps> = ({ className, ...otherProps }) => {
  const [name, setName] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [nameError, setNameError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const loading = useAppSelector(state => state.auth.loading)
  const [nameErrorColor, setNameErrorColor] = useState('red')
  const error = useAppSelector(state => state.auth.error)

  useEffect(() => {
    if (name.length >= 1 && password.length >=1) {
      setDisabled(false)

      if(loading) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    } else {
      setDisabled(true)
    }

  }, [name, password, loading])

  useEffect(() => {
    if(error === 'Unauthorized') {
      setNameErrorColor('green')
      setNameError('Пользователь с таким именем уже существует')
      setPasswordError('Неверный пароль. Проверьте правильность ввода или создайте новый аккаунт')
    }
  }, [error])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setNameError('')
    setPasswordError('')

    if(!isValidName(name) || !isValidPassword(password)) {
      if(!isValidName(name)) {
        setNameError('Имя не соответствует требованиям')
        setNameErrorColor('red')
      } else if(isValidName(name)) {
        setNameError('Имя соответствует требованиям')
        setNameErrorColor('green')
      }

      !isValidPassword(password) && setPasswordError('Пароль не соответствует требованиям')

      return
    }

    dispatch(login({ name, password }))
  }

  const handleKeyPress = () => {
    setNameError('')
    setPasswordError('')

    if (name.length < 1 && password.length < 1) {
      setNameError('Введите имя')
      setPasswordError('Введите пароль')
      return
    }

    if(!isValidName(name) || !isValidPassword(password)) {
      if(!isValidName(name)) {
        setNameError('Имя не соответствует требованиям')
        setNameErrorColor('red')
      } else if(isValidName(name)) {
        setNameError('Имя соответствует требованиям')
        setNameErrorColor('green')
      }

      !isValidPassword(password) && setPasswordError('Пароль не соответствует требованиям')

      return
    }

    dispatch(login({ name, password }))
  }

  const btnClue = useSystemHook(handleKeyPress)

  return (
      <form className={clsx(styles.container, className)} {...otherProps}
        onSubmit={handleSubmit}>
        <img
          className={styles.img}
          src='/images/illustration1.png'
          alt='Иллюстрация'
        />
        <h2 className={styles.title}>Добро пожаловать!</h2>
        <Input
          required
          value={name}
          setValue={setName}
          onChange={(e) => {
            setName(e.target.value)
            setNameError('')
          }}
          className={styles.input}
          label='Имя'
          id='name'
          tooltip='Имя должно начинаться с заглавной буквы, содержать 2-30 символов, без пробелов'
          error={nameError}
          colorError={nameErrorColor}
        />
        <Input
          required
          value={password}
          setValue={setPassword}
          onChange={(e) => {
            setPassword(e.target.value)
            setPasswordError('')
          }}
          className={styles.input}
          id='password'
          label='Пароль'
          type='password'
          tooltip='Пароль должен содержать 8-30 символов, без пробелов. Минимум 2 цифры и 3 заглавные буквы'
          error={passwordError}
        />
        <Button
          className={styles.submitBtn}
          type='submit'
          disabled={disabled}
          tip={btnClue}
        >
          {loading
            ? <Loader />
            : 'Начать'
           }
        </Button>
      </form>
  );
};

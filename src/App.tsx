import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAppSelector } from './hooks/tolkitHooks';

import { Login, NotFound, Themes } from '@/pages';

import styles from './App.module.css';
import { Main } from './pages/Main/Main';


const App = () => {
  const user = useAppSelector(state => state.auth.user)

  React.useEffect(() => {
    if (localStorage.getItem('firstLoading')) return
    localStorage.clear();
    localStorage.setItem('firstLoading', 'was')
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Quiz App</h1>
      <Routes>
        <Route path='/' element={user ? <Navigate to="/themes" /> : <Login />} />
        {user && <>
          <Route path='/themes' element={<Themes />} />
          <Route path='/main' element={<Main/>} />
        </>}
        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate to="/not-found"/>} />
      </Routes>
      <div>
      </div>
    </div>
  );
};

export default App;

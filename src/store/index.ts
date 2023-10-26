import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/authSlice'
import themes from './slices/themesSlice'


const store = configureStore({
  reducer: {
    auth,
    themes
  },
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

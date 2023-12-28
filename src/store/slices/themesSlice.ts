import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface ITheme {
  background: IBackground
  createdAt: Date
  id: number
  name: string
  quizzes: number[]
  updatedAt: Date
}

interface IBackground {
  dark: string
  light: string
}

interface ApiError {
  message: string
  error: string
  statusCode: number
}

interface IThemesState {
  themes: ITheme[]
  activeThemes: Pick<ITheme, 'id' | 'name' | 'quizzes'>[]
  loading: boolean
  error: ApiError | null
}

const initialState: IThemesState = {
  themes: [],
  activeThemes: [],
  loading: false,
  error: null
}

export const themes = createAsyncThunk(
  '@@user/themes',
  async (_, { rejectWithValue }) => {
    const res = await fetch(import.meta.env.VITE_API_URL + '/3-quiz/themes')
    const data = await res.json()
    if (!res.ok) {
      return rejectWithValue(data)
    }

    return data
  }
)


export const themesSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    reset: (state)=> {
      state.activeThemes = []
    },
    addTheme: (state, action) => {
      state.activeThemes.push(action.payload)
    },
    removeTheme: (state, action) => {
      state.activeThemes = state.activeThemes.filter(theme => theme.id !== action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(themes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(themes.fulfilled, (state, action) => {
        state.themes = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(themes.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as ApiError
      })
  }
})

export const { addTheme, removeTheme, reset } = themesSlice.actions
export default themesSlice.reducer

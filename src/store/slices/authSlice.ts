import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { API_URL } from '@/constants'

interface AuthState {
	user: IUser | null
	loading: boolean
  error: string
}

interface IUser {
	createdAt: Date
	id: number
	name: string
	password: string
	quizzes: null
	updatedAt: Date
	user?: IUser
}

export type UserData = Pick<IUser, 'name' | 'password'>;

const initialState: AuthState = {
	user: sessionStorage.getItem('user')
		? JSON.parse(sessionStorage.getItem('user')!)
		: null,
	loading: false,
  error: ''
};

export const login = createAsyncThunk(
	'@@auth/login',
	async function (userData: UserData, { rejectWithValue }) {
		const response = await fetch(`${API_URL}/3-quiz/auth`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			return rejectWithValue(response.statusText);
		}
		return await response.json()
	},
);

export const authSlice = createSlice({
	name: '@@auth',
	initialState,
	reducers: {
		logoutUser: (state) => {
			state.user = null;
			sessionStorage.clear();
      localStorage.clear();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true
        state.error = ''
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
				const user = action.payload.user ? action.payload.user : action.payload;
				state.loading = false
				state.user = user
				localStorage.setItem('name', user.name);
				sessionStorage.setItem('user', JSON.stringify(user))
			})
      .addCase(login.rejected, (state, action) => {
				state.user = null
				state.loading = false
				state.error = action.payload as string
			})
	},
});

export const { logoutUser } = authSlice.actions
export default authSlice.reducer

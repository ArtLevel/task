import { createSlice, isFulfilled, isPending, PayloadAction } from '@reduxjs/toolkit'

export type AppSlice = {
	error: null | string
	status: 'loading' | 'fulfilled' | 'rejected'
}

const initialState: AppSlice = {
	error: null,
	status: 'loading'
}

const slice = createSlice({
	name: 'app',
	initialState: initialState,
	reducers: {
		setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
			state.error = action.payload.error
		},
		setAppStatus: (state, action: PayloadAction<{ status: AppSlice['status'] }>) => {
			state.status = action.payload.status
		}
	},
	extraReducers: builder => {
		builder
			.addMatcher(isPending, (state) => {
				state.status = 'loading'
			})
			.addMatcher(isFulfilled, (state) => {
				state.status = 'fulfilled'
				state.error = null
			})
	}
})

export const appReducer = slice.reducer
export const appActions = slice.actions

import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

type AppSlice = {
	error: null | string
	status: 'loading' | 'fulfilled' | 'rejected'
}

const initialState: AppSlice = {
	error: '',
	status: 'loading'
}

const slice = createSlice({
	name: 'app',
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addMatcher(isPending, (state) => {
				state.status = 'loading'
			})
			.addMatcher(isFulfilled, (state) => {
				state.status = 'fulfilled'
				state.error = ''
			})
			.addMatcher(isRejected, (state) => {
				state.status = 'rejected'
				state.error = 'ERROR'
			})
	}
})

export const appReducer = slice.reducer

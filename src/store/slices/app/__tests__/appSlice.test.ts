import { appActions, appReducer, AppSlice } from '../appSlice'

let state: AppSlice

beforeEach(() => {
	state = {
		error: null,
		status: 'loading'
	}
})

it('setAppError should be correct', () => {
	const firstAction = appActions.setAppError({ error: 'Error, please refresh web' })
	const secondAction = appActions.setAppStatus({ status: 'rejected' })

	const firstState = appReducer(state, firstAction)
	const secondState = appReducer(firstState, secondAction)

	expect(secondState.error).toBe('Error, please refresh web')
	expect(secondState.status).toBe('rejected')
})

it('setAppStatus should be correct', () => {
	const firstAction = appActions.setAppError({ error: null })
	const secondAction = appActions.setAppStatus({ status: 'fulfilled' })

	const firstState = appReducer(state, firstAction)
	const secondState = appReducer(firstState, secondAction)

	expect(secondState.error).toBe(null)
	expect(secondState.status).toBe('fulfilled')
})

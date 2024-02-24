import { Dispatch } from 'redux'
import { appActions } from '../store/slices/app/appSlice'
import { AxiosError } from 'axios'

export const setNetworkError = (error: AxiosError, dispatch: Dispatch) => {
	dispatch(appActions.setAppError({ error: error.message + ' ' + 'Попробуйте позже повторить запрос' }))
	console.error(error.message)
}

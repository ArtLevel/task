import { memo, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useAppSelector } from '../../store/store'

export const GlobalError = memo(() => {
	const errorMessage = useAppSelector(state => state.app.error)

	useEffect(() => {
		if (errorMessage) {
			toast.error(errorMessage, {
				position: 'bottom-left',
				autoClose: 10000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light'
			})
		}
	}, [errorMessage])

	return <ToastContainer theme="dark" autoClose={10000} />
})

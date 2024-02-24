import { useAppDispatch, useAppSelector } from '../../store/store'
import { useFormik } from 'formik'
import { getFilteredProducts, getProducts } from '../../store/slices/thunks'

export type FormikValues = {
	filterType: 'product' | 'brand' | 'price' | 'off'
	value: string
}

type FormikErrors = Partial<FormikValues>

export const useFilter = () => {
	const { pageSize, currentPage, fieldsOfFilter } = useAppSelector(state => state.products)
	const dispatch = useAppDispatch()

	const formik = useFormik({
		validate: (values) => {
			const error: FormikErrors = {}

			if (values.value.length > 100) {
				error.value = 'It\'s such a big text'
			}

			return error
		},
		initialValues: {
			filterType: 'off' as FormikValues['filterType'],
			value: ''
		},
		onSubmit: values => {
			if (values.filterType !== 'off') {
				dispatch(getFilteredProducts({ filterType: values.filterType, value: values.value }))
			}

			if (values.filterType === 'off') {
				dispatch(getProducts({ currentPage, pageSize }))
			}
		}
	})

	const errorOfTextField = !!(formik.touched.value && formik.errors.value)
	const isDisabledButton = errorOfTextField || formik.values.filterType !== 'off' && !(formik.values.value)

	return {
		formik,
		fieldsOfFilter,
		errorOfTextField,
		isDisabledButton
	}
}

import { useFormik } from 'formik'

export const Filter = () => {
	const formik = useFormik({
		validate: (values) => {
		},
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		onSubmit: values => {

		}
	})

	return <>
		Filter
	</>
}

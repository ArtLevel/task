import { useFormik } from 'formik'
import { Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store/store'
import { getFilteredProducts, getProducts } from '../store/slices/thunks'

export type FormikValues = {
	filterType: 'product' | 'brand' | 'price' | 'off'
	value: string
}

type FormikErrors = Partial<FormikValues>

export const Filter = () => {
	const { pageSize, currentPage } = useAppSelector(state => state.products)
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

	return <Grid container justifyContent="center">
		<Grid item xs={4}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl style={{ display: 'flex', marginTop: '2rem' }}>
					<FormGroup style={{ display: 'flex', gap: '20px' }}>
						<InputLabel>Filter</InputLabel>
						<Select
							label="Filter"
							{...formik.getFieldProps('filterType')}
						>
							<MenuItem value="off">Off</MenuItem>
							<MenuItem value="brand">Brand</MenuItem>
							<MenuItem value="product">Product</MenuItem>
							<MenuItem value="price">Price</MenuItem>
						</Select>
						{
							formik.values.filterType !== 'off' &&
							<TextField
								error={errorOfTextField}
								label={errorOfTextField ? formik.errors.value : 'Search'}
								type={formik.values.filterType === 'price' ? 'number' : 'text'}
								{...formik.getFieldProps('value')}
							/>
						}
						<Button type="submit" variant="contained" color="primary"
										disabled={isDisabledButton}>Search</Button>
					</FormGroup>
				</FormControl>
			</form>
		</Grid>
	</Grid>
}

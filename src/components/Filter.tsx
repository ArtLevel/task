import { useFormik } from 'formik'
import { Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store/store'
import { getFilteredProducts } from '../store/slices/thunks'

export type FormikValues = {
	filterType: 'product' | 'brand' | 'price'
	value: string
}

type FormikErrors = Partial<FormikValues>

export const Filter = () => {
	const { pageSize, currentPage } = useAppSelector(state => state.products)
	const dispatch = useAppDispatch()

	const formik = useFormik({
		validate: (values) => {
			const error: FormikErrors = {}

			if (values.filterType !== 'price' && !values.value) {
				error.value = 'Please enter text'
			}

			if (values.value.length > 100) {
				error.value = 'It\'s such a big text'
			}

			return error
		},
		initialValues: {
			filterType: 'product' as FormikValues['filterType'],
			value: ''
		},
		onSubmit: values => {
			dispatch(getFilteredProducts({ filterType: values.filterType, value: values.value }))
		}
	})

	const errorOfTextField = !!(formik.touched.value && formik.errors.value)

	return <Grid container justifyContent="center">
		<Grid item xs={4}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl style={{ display: 'flex', gap: '20px', marginTop: '2rem' }}>
					<FormGroup>
						<InputLabel>Filter</InputLabel>
						<Select
							label="Filter"
							{...formik.getFieldProps('filterType')}
						>
							<MenuItem value="brand">Brand</MenuItem>
							<MenuItem value="product">Product</MenuItem>
							<MenuItem value="price">Price</MenuItem>
						</Select>
						<TextField
							error={errorOfTextField}
							label={errorOfTextField ? formik.errors.value : 'Search'}
							margin="normal"
							type={formik.values.filterType === 'price' ? 'number' : 'text'}
							{...formik.getFieldProps('value')}
						/>
						<Button type="submit" variant="contained" color="primary"
										disabled={errorOfTextField || !(formik.values.value)}>Search</Button>
					</FormGroup>
				</FormControl>
			</form>
		</Grid>
	</Grid>
}

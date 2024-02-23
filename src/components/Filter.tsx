import { useFormik } from 'formik'
import { Button, FormControl, FormGroup, FormLabel, Grid, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../store/store'
import { DataForGetFilteredProducts, getFilteredProducts } from '../store/slices/thunks'

export const Filter = () => {
	const { pageSize, currentPage } = useAppSelector(state => state.products)
	const dispatch = useAppDispatch()

	const formik = useFormik({
		validate: (values) => {
		},
		initialValues: {
			price: '',
			brand: ''
		},
		onSubmit: values => {
			const data: DataForGetFilteredProducts = {}

			if (values.price) {
				data.price = Number(values.price)
			}
			if (values.brand) {
				data.brand = values.brand
			}

			dispatch(getFilteredProducts(data))
		}
	})

	return <Grid container justifyContent="center">
		<Grid item xs={4}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl style={{ display: 'flex' }}>
					<FormLabel>
						<p>
							Filter
						</p>
					</FormLabel>
					<FormGroup>
						<TextField
							label="Price"
							margin="normal"
							{...formik.getFieldProps('price')}
						/>
						{/*{formik.errors.email ? <div>{formik.errors.email}</div> : null}*/}
						<TextField
							label="Brand"
							margin="normal"
							{...formik.getFieldProps('brand')}
						/>
						{/*{formik.errors.password ? <div>{formik.errors.password}</div> : null}*/}
						<Button type={'submit'} variant={'contained'} color={'primary'}>Search</Button>
					</FormGroup>
				</FormControl>
			</form>
		</Grid>
	</Grid>
}

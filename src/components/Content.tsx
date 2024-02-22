import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { CardOfProduct } from './CardOfProduct'
import { useAppDispatch, useAppSelector } from '../store/store'
import { getProducts } from '../store/slices/thunks'

export const Content = () => {
	const products = useAppSelector(state => state.products.products)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getProducts())
	}, [])

	return <Grid container spacing={3} sx={{ padding: 5 }}>
		{products.map((product) => (
			<CardOfProduct key={product.id} item={product} />
		))}
	</Grid>
}

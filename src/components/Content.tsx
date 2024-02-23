import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { CardOfProduct } from './CardOfProduct'
import { useAppDispatch, useAppSelector } from '../store/store'
import { getProducts } from '../store/slices/thunks'
import { Paginator } from './Paginator'

export const Content = () => {
	const products = useAppSelector(state => state.products.products)
	const { currentPage, pageSize } = useAppSelector(state => state.products)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getProducts({ currentPage, pageSize }))
	}, [])

	const onPageChanged = (currentPage: number) => {
		dispatch(getProducts({ currentPage, pageSize }))
	}

	return <Grid container spacing={3} sx={{ padding: 5 }}>
		{products.map((product) => (
			<CardOfProduct key={product.id} item={product} />
		))}
		<Paginator onPageChanged={onPageChanged} />
	</Grid>
}

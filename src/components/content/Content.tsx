import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { CardOfProduct } from './CardOfProduct'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getProducts } from '../../store/slices/thunks'
import { Paginator } from '../paginator/Paginator'

export const Content = () => {
	const products = useAppSelector(state => state.products.products)
	const { currentPage, pageSize, isFilterMode, totalProductsCount } = useAppSelector(state => state.products)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getProducts({ currentPage, pageSize }))
	}, [])

	const onPageChanged = (currentPage: number) => {
		dispatch(getProducts({ currentPage, pageSize }))
	}

	return <Grid container spacing={2}
							 style={{
								 display: 'flex',
								 alignItems: 'center',
								 justifyContent: 'center',
								 marginTop: '50px',
								 marginBottom: '50px'
							 }}>
		{isFilterMode && <p>По вашему запросу столько результатов: {totalProductsCount}</p>}
		{!isFilterMode && <Paginator onPageChanged={onPageChanged} />}
		<Grid item style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexWrap: 'wrap',
			gap: '20px'
		}}>
			{products.map((product) => (
				<CardOfProduct key={product.id} item={product} />
			))}
		</Grid>
		{!isFilterMode && <Paginator onPageChanged={onPageChanged} />}
	</Grid>
}

import { Grid } from '@mui/material'
import React, { memo, useEffect } from 'react'
import { CardOfProduct } from './CardOfProduct'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getProducts } from '../../store/slices/thunks'
import { Paginator } from '../paginator/Paginator'
import { productsSelectors } from '../../store/slices/products/productsSlice'

export const Content = memo(() => {
	const products = useAppSelector(productsSelectors.getProducts)
	const currentPage = useAppSelector(productsSelectors.getCurrentPage)
	const pageSize = useAppSelector(productsSelectors.getPageSize)
	const isFilterMode = useAppSelector(productsSelectors.getIfFilterMode)
	const totalProductsCount = useAppSelector(productsSelectors.getTotalProductsCount)

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
})

import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { API } from '../api/api'
import { Product } from '../types'
import { CardOfProduct } from './CardOfProduct'

export const Content = () => {
	const [ids, setIds] = useState<string[]>([])
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		API.get_ids().then(res => setIds(res.data.result))
	}, [])

	useEffect(() => {
		API.get_items(ids).then(res => setProducts(res.data.result))
	}, [ids])


	return <Grid container spacing={3} sx={{ padding: 5 }}>
		{products.map((product) => (
			<CardOfProduct key={product.id} item={product} />
		))}
	</Grid>
}
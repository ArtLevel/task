import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api/api'
import { productsActions } from './productsSlice'

type DataForAPI = {
	currentPage: number
	pageSize: number
}

export type DataForGetFilteredProducts = {
	price?: number
	brand?: string,
	product?: string
}

export const getProducts = createAsyncThunk('products/getProducts', async (arg: DataForAPI, { dispatch }) => {
	try {
		const ids = await dispatch(getIds(arg))
			.unwrap()
			.then(res => res ? res.result : [])


		const products = await dispatch(getItems({ ids }))
			.unwrap()
			.then(res => res ? res.result : [])

		const totalProductsCount = await dispatch(getIds({}))
			.unwrap()
			.then(res => res ? res.result.length : 0)

		dispatch(productsActions.setProducts({ products }))
		dispatch(productsActions.setTotalProductsCount({ totalProductsCount }))
		dispatch(productsActions.setCurrentPage({ currentPage: arg.currentPage }))
	} catch (e) {
		console.error(e)
	}
})

const getIds = createAsyncThunk('products/getIds', async (arg: Partial<DataForAPI>, thunkAPI) => {
	try {
		const { currentPage, pageSize } = arg

		return await API.get_ids(currentPage, pageSize)
	} catch (e) {
		console.error(e)
	}
})

export const getFilteredProducts = createAsyncThunk('products/getFilteredProducts', async (arg: DataForGetFilteredProducts, thunkAPI) => {
	try {
		const ids = await API.filter(arg).then(res => res ? res.result : [])

		const products = await thunkAPI.dispatch(getItems({ ids }))
			.unwrap()
			.then(res => res ? res.result : [])

		thunkAPI.dispatch(productsActions.setProducts({ products }))
	} catch (e) {
		console.error(e)
	}
})

const getItems = createAsyncThunk('products/getItems', async (arg: { ids: string[] }, thunkAPI) => {
	try {
		return await API.get_items(arg.ids)
	} catch (e) {
		console.error(e)
	}
})

export const getFields = createAsyncThunk('products/getFields', async (arg: { field: string }, thunkAPI) => {
	try {
		return await API.get_fields('brand', 3, 5)
	} catch (e) {
		console.error(e)
	}
})

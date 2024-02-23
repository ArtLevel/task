import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api/api'
import { productsActions } from './productsSlice'

type DataForAPI = {
	currentPage: number
	pageSize: number
}

export const getProducts = createAsyncThunk('products/getIds', async (arg: DataForAPI, thunkAPI) => {
	try {
		const ids = await thunkAPI.dispatch(getIds(arg)).unwrap().then(res => res ? res.result : [])
		const products = await thunkAPI.dispatch(getItems({ ids })).unwrap().then(res => res ? res.result : [])

		const totalProductsCount = await thunkAPI.dispatch(getIds({})).unwrap().then(res => res ? res.result.length : 0)

		thunkAPI.dispatch(productsActions.setProducts({ products, totalProductsCount, currentPage: arg.currentPage }))
	} catch (e) {
		console.error(e)
	}
})

export const getIds = createAsyncThunk('products/getIds', async (arg: Partial<DataForAPI>, thunkAPI) => {
	try {
		const { currentPage, pageSize } = arg

		return await API.get_ids(currentPage, pageSize)
	} catch (e) {
		console.error(e)
	}
})

export const getItems = createAsyncThunk('products/getItems', async (arg: { ids: string[] }, thunkAPI) => {
	try {
		return await API.get_items(arg.ids)
	} catch (e) {
		console.error(e)
	}
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api/api'
import { productsActions } from './productsSlice'

type DataForAPI = {
	currentPage: number
	pageSize: number
}

export const getProducts = createAsyncThunk('products/getIds', async (arg: DataForAPI, thunkAPI) => {
	const ids = await thunkAPI.dispatch(getIds(arg)).unwrap().then(res => res.result)
	const products = await thunkAPI.dispatch(getItems({ ids })).unwrap().then(res => res.result)

	const totalProductsCount = await thunkAPI.dispatch(getIds({})).unwrap().then(res => res.result.length)

	thunkAPI.dispatch(productsActions.setProducts({ products, totalProductsCount, currentPage: arg.currentPage }))
})

export const getIds = createAsyncThunk('products/getIds', async (arg: Partial<DataForAPI>, thunkAPI) => {
	const { currentPage, pageSize } = arg

	return await API.get_ids(currentPage, pageSize)
})

export const getItems = createAsyncThunk('products/getItems', async (arg: { ids: string[] }, thunkAPI) => {
	return await API.get_items(arg.ids)
})

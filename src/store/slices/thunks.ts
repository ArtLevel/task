import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api/api'
import { productsActions } from './productsSlice'

export const getProducts = createAsyncThunk('products/getIds', async (arg, thunkAPI) => {
	const ids = await thunkAPI.dispatch(getIds()).unwrap().then(res => res.result)
	const products = await thunkAPI.dispatch(getItems({ ids })).unwrap().then(res => res.result)

	thunkAPI.dispatch(productsActions.setProducts({ products }))
})

export const getIds = createAsyncThunk('products/getIds', async (arg, thunkAPI) => {
	return await API.get_ids()
})

export const getItems = createAsyncThunk('products/getItems', async (arg: { ids: string[] }, thunkAPI) => {
	return await API.get_items(arg.ids)
})

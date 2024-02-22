import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api/api'
import { Product } from '../../types'

export const getProducts = createAsyncThunk('products/getIds', async (arg, thunkAPI): Promise<{
	result: Product[]
}> => {
	const ids = await thunkAPI.dispatch(getIds()).unwrap().then(res => res.result)

	return await thunkAPI.dispatch(getItems({ ids })).unwrap().then(res => res)
})

export const getIds = createAsyncThunk('products/getIds', async (arg, thunkAPI) => {
	return await API.get_ids()
})

export const getItems = createAsyncThunk('products/getItems', async (arg: { ids: string[] }, thunkAPI) => {
	return await API.get_items(arg.ids)
})

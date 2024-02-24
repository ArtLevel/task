import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api/api'
import { productsActions } from './products/productsSlice'
import { FormikValues } from '../../components/filter/useFilter'
import { setNetworkError } from '../../utils/setNetworkError'
import { isAxiosError } from 'axios'

type DataForAPI = {
	currentPage: number
	pageSize: number
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

		dispatch(productsActions.setIsFilterMode({ isFilterMode: false }))
		dispatch(productsActions.setProducts({ products }))
		dispatch(productsActions.setTotalProductsCount({ totalProductsCount }))
		dispatch(productsActions.setCurrentPage({ currentPage: arg.currentPage }))
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			setNetworkError(error, dispatch)
		}
	}
})

const getIds = createAsyncThunk('products/getIds', async (arg: Partial<DataForAPI>, { dispatch }) => {
	try {
		const { currentPage, pageSize } = arg

		return await API.get_ids(currentPage, pageSize)
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			setNetworkError(error, dispatch)
		}
	}
})

export const getFilteredProducts = createAsyncThunk('products/getFilteredProducts', async (arg: FormikValues, { dispatch }) => {
	try {
		const ids = await API.filter(arg).then(res => res ? res.result : [])

		const products = await dispatch(getItems({ ids }))
			.unwrap()
			.then(res => res ? res.result : [])

		dispatch(productsActions.setIsFilterMode({ isFilterMode: true }))
		dispatch(productsActions.setProducts({ products }))
		dispatch(productsActions.setTotalProductsCount({ totalProductsCount: ids.length }))
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			setNetworkError(error, dispatch)
		}
	}
})

const getItems = createAsyncThunk('products/getItems', async (arg: { ids: string[] }, { dispatch }) => {
	try {
		return await API.get_items(arg.ids)
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			setNetworkError(error, dispatch)
		}
	}
})

export const getFields = createAsyncThunk('products/getFields', async (arg: { field: string }, { dispatch }) => {
	try {
		const res = await API.get_fields(arg.field)

		dispatch(productsActions.setFieldsOfFilter({ fieldsOfFilter: res.result }))
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			setNetworkError(error, dispatch)
		}
	}
})

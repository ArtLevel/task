import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../types'

type ProductsSlice = {
	products: Product[]
	pageSize: number
	totalProductsCount: number
	currentPage: number
	isFilterMode: boolean
	fieldsOfFilter: string[]
}

const initialState: ProductsSlice = {
	products: [],
	pageSize: 50,
	totalProductsCount: 0,
	currentPage: 1,
	isFilterMode: false,
	fieldsOfFilter: []
}

const slice = createSlice({
	name: 'products',
	initialState: initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<{
			products: Product[]
		}>) => {
			state.products = action.payload.products
		},
		setTotalProductsCount: (state, action: PayloadAction<{ totalProductsCount: number }>) => {
			state.totalProductsCount = action.payload.totalProductsCount
		},
		setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
			state.currentPage = action.payload.currentPage
		},
		setIsFilterMode: (state, action: PayloadAction<{ isFilterMode: boolean }>) => {
			state.isFilterMode = action.payload.isFilterMode
		},
		setFieldsOfFilter: (state, action: PayloadAction<{ fieldsOfFilter: string[] }>) => {
			state.fieldsOfFilter = action.payload.fieldsOfFilter
		}
	}
})

export const productsReducer = slice.reducer
export const productsActions = slice.actions

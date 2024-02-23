import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../types'

type ProductsSlice = {
	products: Product[]
	pageSize: number
	totalProductsCount: number
	currentPage: number
}

const initialState: ProductsSlice = {
	products: [],
	pageSize: 50,
	totalProductsCount: 0,
	currentPage: 1
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
		}
	}
})

export const productsReducer = slice.reducer
export const productsActions = slice.actions

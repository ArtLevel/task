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
	pageSize: 5,
	totalProductsCount: 0,
	currentPage: 1
}

const slice = createSlice({
	name: 'products',
	initialState: initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<{
			products: Product[],
			totalProductsCount: number,
			currentPage: number
		}>) => {
			state.products = action.payload.products
			state.totalProductsCount = action.payload.totalProductsCount
			state.currentPage = action.payload.currentPage
		}
	}
})

export const productsReducer = slice.reducer
export const productsActions = slice.actions

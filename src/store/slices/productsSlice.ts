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
			products: Product[],
			totalProductsCount?: number,
			currentPage?: number
		}>) => {
			state.products = action.payload.products

			if (action.payload.currentPage) {
				state.currentPage = action.payload.currentPage
			}

			if (action.payload.totalProductsCount) {
				state.totalProductsCount = action.payload.totalProductsCount
			}

		}
	}
})

export const productsReducer = slice.reducer
export const productsActions = slice.actions

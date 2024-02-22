import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../types'

type ProductsSlice = {
	products: Product[]
}

const initialState: ProductsSlice = {
	products: []
}

const slice = createSlice({
	name: 'products',
	initialState: initialState,
	reducers: {
		setProducts: (state, action: PayloadAction<{ products: Product[] }>) => {
			state.products = action.payload.products
		}
	}
})

export const productsReducer = slice.reducer
export const productsActions = slice.actions

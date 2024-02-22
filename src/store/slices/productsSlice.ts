import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../types'
import { getProducts } from './thunks'

type ProductsSlice = {
	products: Product[]
}

const initialState: ProductsSlice = {
	products: []
}

const slice = createSlice({
	name: 'products',
	initialState: initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getProducts.fulfilled, (state, action) => {
				state.products = action.payload.result
			})
	}
})

export const productsReducer = slice.reducer

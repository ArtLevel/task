import { productsActions, productsReducer, ProductsSlice } from '../productsSlice'

let state: ProductsSlice

beforeEach(() => {
	state = {
		products: [],
		pageSize: 50,
		totalProductsCount: 0,
		currentPage: 1,
		isFilterMode: false,
		fieldsOfFilter: []
	}
})

it('setProducts should be correct', () => {
	const action = productsActions.setProducts({
		products: [
			{
				product: 'Кольцо с бриллиантом',
				brand: null,
				id: '1',
				price: 22500
			},
			{
				product: 'Кольцо с бриллиантом СССР',
				brand: null,
				id: '2',
				price: 25500
			},
			{
				product: 'Кольцо',
				brand: 'Piaget',
				id: '3',
				price: 8500
			}
		]
	})

	const newState = productsReducer(state, action)

	expect(newState.products).toEqual([
		{
			product: 'Кольцо с бриллиантом',
			brand: null,
			id: '1',
			price: 22500
		},
		{
			product: 'Кольцо с бриллиантом СССР',
			brand: null,
			id: '2',
			price: 25500
		},
		{
			product: 'Кольцо',
			brand: 'Piaget',
			id: '3',
			price: 8500
		}
	])
})

it('setTotalProductsCount should be correct', () => {
	const action = productsActions.setTotalProductsCount({ totalProductsCount: 10000 })

	const newState = productsReducer(state, action)

	expect(newState.totalProductsCount).toBe(10000)
})

it('setCurrentPage should be correct', () => {
	const action = productsActions.setCurrentPage({ currentPage: 10 })

	const newState = productsReducer(state, action)

	expect(newState.currentPage).toBe(10)
})

it('setIsFilterMode should be correct', () => {
	const action = productsActions.setIsFilterMode({ isFilterMode: true })

	const newState = productsReducer(state, action)

	expect(newState.isFilterMode).toBe(true)
})

it('setFieldsOfFilter should be correct', () => {
	const action = productsActions.setFieldsOfFilter({ fieldsOfFilter: ['brand'] })

	const newState = productsReducer(state, action)

	expect(newState.fieldsOfFilter).toEqual(['brand'])
})

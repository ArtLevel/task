import React, { useEffect } from 'react'
import { Header } from './components/Header'
import { Content } from './components/Content'
import { Filter } from './components/Filter'
import { getFields } from './store/slices/thunks'
import { useAppDispatch } from './store/store'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getFields({ field: 'brand' }))
	}, [])

	return (
		<>
			<Header />
			<Filter />
			<Content />
		</>
	)
}

export default App

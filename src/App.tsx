import React, { memo, useEffect } from 'react'
import { Header } from './components/header/Header'
import { Content } from './components/content/Content'
import { Filter } from './components/filter/Filter'
import { getFields } from './store/slices/thunks'
import { useAppDispatch } from './store/store'
import { GlobalError } from './components/utils/GlobalError'

const App = memo(() => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getFields({ field: 'brand' }))
	}, [])

	return (
		<>
			<Header />
			<Filter />
			<Content />
			<GlobalError />
		</>
	)
})

export default App

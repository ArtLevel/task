import { useAppSelector } from '../../store/store'
import { useState } from 'react'
import { Paginator } from './Paginator'

export const usePaginator = (props: Paginator) => {
	const { portionSize = 10, onPageChanged } = props
	const { currentPage, pageSize, totalProductsCount } = useAppSelector(
		(state) => state.products
	)

	const pagesCount = Math.ceil(totalProductsCount / pageSize)

	const pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}


	const portionCount = Math.ceil(pagesCount / portionSize)
	const [portionNumber, setPortionNumber] = useState(1)
	const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
	const rightPortionPageNumber = portionNumber * portionSize

	const incrementPortionNumberHandler = () =>
		setPortionNumber((prevState) => prevState + 1)
	const decrementPortionNumberHandler = () =>
		setPortionNumber((prevState) => prevState - 1)

	return {
		currentPage,
		portionCount,
		leftPortionPageNumber,
		rightPortionPageNumber,
		portionSize,
		pages,
		portionNumber,
		onPageChanged,
		incrementPortionNumberHandler,
		decrementPortionNumberHandler,
		setPortionNumber
	}
}

import { useEffect, useState } from 'react'
import { useAppSelector } from '../store/store'
import { Button } from '@mui/material'
import styled, { css } from 'styled-components'

type Paginator = {
	portionSize?: number

	onPageChanged: (currentPage: number) => void
}

export const Paginator = (props: Paginator) => {
	const { portionSize = 10, onPageChanged } = props
	const { currentPage, pageSize, totalProductsCount } = useAppSelector(
		(state) => state.products
	)

	const pagesCount = Math.ceil(totalProductsCount / pageSize)

	const pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	console.log(pages, pagesCount, currentPage)

	const portionCount = Math.ceil(pagesCount / portionSize)
	const [portionNumber, setPortionNumber] = useState(1)
	const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
	const rightPortionPageNumber = portionNumber * portionSize

	const pagesMapped = pages
		.filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
		.map((p) => (
			<PaginatorItem
				key={p}
				onClick={() => onPageChanged(p)}
				isActivePage={currentPage === p}
			>
				{p}
			</PaginatorItem>
		))

	const incrementPortionNumberHandler = () =>
		setPortionNumber((prevState) => prevState + 1)
	const decrementPortionNumberHandler = () =>
		setPortionNumber((prevState) => prevState - 1)

	useEffect(() => {
		setPortionNumber(Math.ceil(currentPage / portionSize))
	}, [currentPage])

	return (
		<StyledPaginator>
			{portionNumber > 1 && (
				<Button onClick={decrementPortionNumberHandler}>back</Button>
			)}
			{pagesMapped}
			{portionNumber < portionCount && (
				<Button onClick={incrementPortionNumberHandler}>next</Button>
			)}
		</StyledPaginator>
	)
}

const StyledPaginator = styled.div`
    width: 100%;
    max-height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 10px;

    margin: 10px 0;
`

type PaginatorItem = {
	isActivePage: boolean
}

const PaginatorItem = styled.span<PaginatorItem>`
    min-height: 30px;
    min-width: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 5px;

    border-radius: 5px;
    border: 2px solid #0B5FA5;
    cursor: pointer;

    ${(props) =>
            props.isActivePage &&
            css<PaginatorItem>`
                color: #66A1D2;
                font-weight: bold;
            `}
`

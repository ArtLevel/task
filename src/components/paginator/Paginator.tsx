import { memo, useEffect } from 'react'
import { Button } from '@mui/material'
import styled, { css } from 'styled-components'
import { usePaginator } from './usePaginator'

export type Paginator = {
	portionSize?: number

	onPageChanged: (currentPage: number) => void
}

export const Paginator = memo((props: Paginator) => {
		const {
			portionCount,
			currentPage,
			leftPortionPageNumber,
			rightPortionPageNumber,
			portionSize,
			pages,
			portionNumber,
			setPortionNumber,
			onPageChanged,
			incrementPortionNumberHandler,
			decrementPortionNumberHandler
		} = usePaginator(props)

		useEffect(() => {
			setPortionNumber(Math.ceil(currentPage / portionSize))
		}, [currentPage])

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
)
const StyledPaginator = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    gap: 10px;

    padding: 0 20px;
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

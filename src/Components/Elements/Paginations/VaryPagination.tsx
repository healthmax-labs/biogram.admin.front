import React, { useEffect, useState } from 'react'
import { PaginationStyle } from '@Style/Elements/CommonStyles'
import Const from '@Const'
import _ from 'lodash'

const {
    Numbering,
    Wapper,
    Left,
    NextText,
    PreviousText,
    Right,
    PagingBox,
    Container,
} = PaginationStyle

const initializeState = {
    pageSize: Const.Pages.perPage,
    pagingCount: 10,
    totalPages: 0,
    startPage: 0,
    endPage: 0,
    prevPage: 0,
    nextPage: 0,
}

const VaryPagination = ({
    CurrentPage = 1,
    TotalCount,
    PaginationClick,
}: {
    TotalCount: number
    CurrentPage: number
    PaginationClick: ({ pageNumber }: { pageNumber: number }) => void
}) => {
    const [pageState, setPageState] = useState<{
        pageSize: number // 페이지당 데이터 건수
        pagingCount: number // 화면에 보일 페이지 번호 개수
        totalPages: number
        startPage: number
        endPage: number
        prevPage: number | null
        nextPage: number | null
    }>(initializeState)

    useEffect(() => {
        // https://haguri-peng.tistory.com/109 참고.

        const totalPage =
            Math.floor(TotalCount / pageState.pageSize) +
            (TotalCount % pageState.pageSize == 0 ? 0 : 1)

        let prevPageNumber: null | number = null
        if (CurrentPage <= pageState.pagingCount) {
            prevPageNumber = null
        } else {
            const tempPpage: number | undefined = _.min(
                _.range(pageState.startPage, pageState.endPage)
            )
            prevPageNumber = tempPpage ? Number(tempPpage) : 1
        }

        let nextPageNumber: null | number = null
        if (
            totalPage <= pageState.pagingCount ||
            Math.floor((CurrentPage - 1) / pageState.pagingCount) *
                pageState.pagingCount +
                pageState.pagingCount +
                1 >
                totalPage
        ) {
            nextPageNumber = null
        } else {
            const tempNpage: number | undefined = _.max(
                _.range(pageState.startPage, pageState.endPage)
            )

            nextPageNumber = tempNpage ? Number(tempNpage) : totalPage
        }

        const startPage =
            Math.floor((CurrentPage - 1) / pageState.pagingCount) *
                pageState.pagingCount +
            1
        const endPage = startPage + pageState.pagingCount

        setPageState(prevState => ({
            ...prevState,
            totalPages: totalPage,
            startPage: startPage,
            endPage: endPage,
            prevPage: prevPageNumber,
            nextPage: nextPageNumber,
        }))
    }, [
        TotalCount,
        CurrentPage,
        pageState.endPage,
        pageState.pageSize,
        pageState.pagingCount,
        pageState.startPage,
    ])

    return (
        <>
            <Container>
                <Wapper>
                    <Left
                        onClick={() =>
                            pageState.prevPage &&
                            PaginationClick({ pageNumber: pageState.prevPage })
                        }
                        Active={!!pageState.prevPage}>
                        <svg
                            width="14"
                            height="8"
                            viewBox="0 0 14 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.1665 4H12.8332"
                                stroke="currentColor"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1.1665 4L4.49984 7.33333"
                                stroke="currentColor"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1.1665 4.00002L4.49984 0.666687"
                                stroke="currentColor"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <PreviousText>이전</PreviousText>
                    </Left>
                    <PagingBox>
                        {_.range(pageState.startPage, pageState.endPage).map(
                            (current, index) => {
                                return (
                                    <Numbering
                                        key={`vary-pagination-page-number-${index}`}
                                        Active={current === CurrentPage}
                                        onClick={() =>
                                            current !== CurrentPage &&
                                            PaginationClick({
                                                pageNumber: current,
                                            })
                                        }>
                                        {current}
                                    </Numbering>
                                )
                            }
                        )}
                    </PagingBox>
                    <Right
                        onClick={() =>
                            pageState.nextPage &&
                            PaginationClick({ pageNumber: pageState.nextPage })
                        }
                        Active={!!pageState.nextPage}>
                        <NextText>다음</NextText>
                        <svg
                            width="14"
                            height="8"
                            viewBox="0 0 14 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.1665 4H12.8332"
                                stroke="currentColor"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9.5 7.33333L12.8333 4"
                                stroke="currentColor"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9.5 0.666687L12.8333 4.00002"
                                stroke="currentColor"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Right>
                </Wapper>
            </Container>
        </>
    )
}

export default VaryPagination

import React from 'react'
import { Commons } from '@Style/Elements/CommonStyles'

export default function DefaultPagination() {
    return (
        <>
            <Commons.Pagination.Container>
                <Commons.Pagination.Wapper>
                    <Commons.Pagination.Left>
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
                        <Commons.Pagination.PreviousText>
                            Previous
                        </Commons.Pagination.PreviousText>
                    </Commons.Pagination.Left>
                    <Commons.Pagination.PagingBox>
                        <Commons.Pagination.Numbering Active={true}>
                            1
                        </Commons.Pagination.Numbering>
                        <Commons.Pagination.Numbering Active={false}>
                            2
                        </Commons.Pagination.Numbering>
                        <Commons.Pagination.Numbering Active={false}>
                            3
                        </Commons.Pagination.Numbering>
                        <Commons.Pagination.Numbering Active={false}>
                            4
                        </Commons.Pagination.Numbering>
                        <Commons.Pagination.Numbering Active={false}>
                            5
                        </Commons.Pagination.Numbering>
                        <Commons.Pagination.Numbering Active={false}>
                            6
                        </Commons.Pagination.Numbering>
                        <Commons.Pagination.Numbering Active={false}>
                            7
                        </Commons.Pagination.Numbering>
                        <Commons.Pagination.Numbering Active={false}>
                            8
                        </Commons.Pagination.Numbering>
                    </Commons.Pagination.PagingBox>
                    <Commons.Pagination.Right>
                        <Commons.Pagination.NextText>
                            Next
                        </Commons.Pagination.NextText>
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
                    </Commons.Pagination.Right>
                </Commons.Pagination.Wapper>
            </Commons.Pagination.Container>
        </>
    )
}

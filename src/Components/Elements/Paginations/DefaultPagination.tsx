import React from 'react'
import {
    Container,
    Wapper,
    LeftBox,
    PreviousText,
    PagingBox,
    Numbering,
    RightBox,
    NextText,
} from '@Style/Elements/Pagination'

export default function DefaultPagination() {
    return (
        <>
            <Container>
                <Wapper>
                    <LeftBox>
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
                        <PreviousText>Previous</PreviousText>
                    </LeftBox>
                    <PagingBox>
                        <Numbering Active={true}>1</Numbering>
                        <Numbering Active={false}>2</Numbering>
                        <Numbering Active={false}>3</Numbering>
                        <Numbering Active={false}>4</Numbering>
                        <Numbering Active={false}>5</Numbering>
                        <Numbering Active={false}>6</Numbering>
                        <Numbering Active={false}>7</Numbering>
                        <Numbering Active={false}>8</Numbering>
                    </PagingBox>
                    <RightBox>
                        <NextText>Next</NextText>
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
                    </RightBox>
                </Wapper>
            </Container>
        </>
    )
}

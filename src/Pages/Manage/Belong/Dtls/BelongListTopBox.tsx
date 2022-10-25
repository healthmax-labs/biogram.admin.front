import React from 'react'
import {
    SearchBox,
    TopSearchBox,
    TopSearch,
    TopSearchInput,
    TopSearchButton,
    TopRightButtonBox,
    TopRightButton,
} from '@Style/Pages/BelongMain'

export default function BelongListTopBox() {
    return (
        <>
            <SearchBox>
                <TopSearchBox>
                    <TopSearch>
                        <TopSearchInput type="text" placeholder="Search..." />
                        <TopSearchButton>
                            <svg
                                className="w-6 h-6 text-gray-600 text-sm"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                            </svg>
                        </TopSearchButton>
                    </TopSearch>
                </TopSearchBox>

                <TopRightButtonBox>
                    <TopRightButton>소속승인</TopRightButton>
                    <TopRightButton>소속거절</TopRightButton>
                    <TopRightButton>저장</TopRightButton>
                    <TopRightButton>부서입력</TopRightButton>
                    <TopRightButton>부서제거</TopRightButton>
                    <TopRightButton>부서설정</TopRightButton>
                </TopRightButtonBox>
            </SearchBox>
        </>
    )
}

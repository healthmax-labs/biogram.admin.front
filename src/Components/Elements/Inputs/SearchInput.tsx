import React from 'react'
import { InputStyle } from '@Style/Elements/InputStyles'

const {
    Search: { Wapper, Search, SearchButton, SearchBox, Toggle, Label },
} = InputStyle

const SearchInput = () => {
    return (
        <Wapper>
            <Label htmlFor="search-dropdown">소속</Label>
            <Toggle
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                type="button">
                전체 소속
                <svg
                    aria-hidden="true"
                    className="ml-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"></path>
                </svg>
            </Toggle>

            <SearchBox>
                <Search
                    type="search"
                    id="search-dropdown"
                    placeholder="ID / 이름 / 연락처 / 전화번호"
                    required
                />
                <SearchButton type="submit">
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span className="sr-only">Search</span>
                </SearchButton>
            </SearchBox>
        </Wapper>
    )
}

export default SearchInput

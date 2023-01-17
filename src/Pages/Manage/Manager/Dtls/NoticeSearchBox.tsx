import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton } from '@Elements'

const { Container, SearchWapper, RightSearchButton } = SearchBoxStyle

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    return (
        <Container>
            <SearchWapper></SearchWapper>
            <RightSearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </Container>
    )
}
export default SearchBox

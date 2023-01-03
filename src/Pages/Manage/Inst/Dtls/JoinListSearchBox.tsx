import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryInput,
    VaryLabel,
} from '@Elements'
import { useRecoilState } from 'recoil'
import { InstJoinListState } from '@Recoil/InstPagesState'
import { isNull } from 'lodash'

const {
    Container,
    SearchWapper,
    SearchItemWapper,
    SearchLabel,
    SearchItem,
    SearchButton,
} = SearchBoxStyle

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const [instJoinListState, setInstJoinListState] =
        useRecoilState(InstJoinListState)

    return (
        <Container>
            <SearchWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`소속`} />
                    </SearchLabel>
                    <SearchItem>
                        <PstinstSelector
                            HandleSelectValue={({ instNo }) =>
                                setInstJoinListState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        instNo: String(instNo),
                                    },
                                }))
                            }
                        />
                    </SearchItem>
                </SearchItemWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`검색어`} />
                    </SearchLabel>
                    <SearchItem>
                        <VaryInput
                            ContentsType={`search`}
                            Width={'w64'}
                            HandleOnChange={e =>
                                setInstJoinListState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        searchKey: e.target.value,
                                    },
                                }))
                            }
                            id={'id'}
                            Placeholder={'ID / 이름 / 연락처 / 전화번호'}
                            Value={
                                isNull(instJoinListState.search.SEARCH_KEY)
                                    ? ''
                                    : instJoinListState.search.SEARCH_KEY
                            }
                        />
                    </SearchItem>
                </SearchItemWapper>
            </SearchWapper>
            <SearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </SearchButton>
        </Container>
    )
}
export default SearchBox

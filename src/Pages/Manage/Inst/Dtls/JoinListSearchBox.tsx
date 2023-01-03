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
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    RightSearchButton,
    SearchItem,
} = SearchBoxStyle

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const [instJoinListState, setInstJoinListState] =
        useRecoilState(InstJoinListState)

    return (
        <RowContainer>
            <SearchRowWapper>
                <SearchItemRow>
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
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default SearchBox

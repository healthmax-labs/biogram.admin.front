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

const { Container, SearchWapper, SearchItemWapper, SearchLabel, SearchButton } =
    SearchBoxStyle

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
                </SearchItemWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`검색어`} />
                    </SearchLabel>
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
                </SearchItemWapper>
            </SearchWapper>
            <SearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </SearchButton>
        </Container>
    )
}
export default SearchBox

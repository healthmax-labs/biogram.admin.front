import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton, PstinstSelector, VaryLabel } from '@Elements'
import { useRecoilState } from 'recoil'
import { InstJoinListState } from '@Recoil/InstPagesState'

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
                                SelectElement={{
                                    value: instJoinListState.search.INST_NO
                                        ? Number(
                                              instJoinListState.search.INST_NO
                                          )
                                        : null,
                                    text: instJoinListState.search.instNm
                                        ? instJoinListState.search.instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) =>
                                    setInstJoinListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            INST_NO: String(instNo),
                                            instNm: instNm,
                                        },
                                    }))
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

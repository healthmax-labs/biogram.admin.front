import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton, PstinstSelector, VaryLabel } from '@Elements'
import { useRecoilState, useRecoilValue } from 'recoil'
import { InstJoinListState } from '@Recoil/InstPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

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
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
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
                                            INST_NO: instNo
                                                ? String(instNo)
                                                : ``,
                                            instNm: instNm ? instNm : ``,
                                        },
                                    }))
                                }
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton WindowsWidth={mainLayoutState.windowsSize.width}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default SearchBox

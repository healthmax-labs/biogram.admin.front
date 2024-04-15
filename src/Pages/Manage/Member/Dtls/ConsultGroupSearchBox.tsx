import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton, PstinstSelector, VaryLabel } from '@Element/index'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ConsultGroupListState } from '@Recoil/MemberPagesState'
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

const ConsultGroupSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [consultGroupListState, setConsultGroupListState] = useRecoilState(
        ConsultGroupListState
    )

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
                                    value: consultGroupListState.search.instNo
                                        ? Number(
                                              consultGroupListState.search
                                                  .instNo
                                          )
                                        : null,
                                    text: consultGroupListState.search.instNm
                                        ? consultGroupListState.search.instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) => {
                                    setConsultGroupListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            instNo: instNo
                                                ? String(instNo)
                                                : ``,
                                            instNm: instNm ? instNm : ``,
                                        },
                                    }))
                                }}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton
                Item={'end'}
                WindowsWidth={mainLayoutState.windowsSize.width}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}

export default ConsultGroupSearchBox

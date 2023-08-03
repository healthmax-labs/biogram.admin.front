import React, { KeyboardEvent } from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton, VaryInput, VaryLabel } from '@Elements'
import { useRecoilState, useRecoilValue } from 'recoil'
import { UhealthzoneListState } from '@Recoil/ContentsPagesState'
import { isNull } from 'lodash'
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

const UhealthzoneListSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [listState, setListState] = useRecoilState(UhealthzoneListState)

    const handleSearchInputOnKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key !== 'Enter') return
        HandleGetList()
    }

    return (
        <RowContainer>
            <SearchRowWapper>
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`설치장소`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryInput
                                ContentsType={`search`}
                                Width={'w40'}
                                HandleOnChange={e =>
                                    setListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            search_Key: e.target.value,
                                        },
                                    }))
                                }
                                id={'id'}
                                Placeholder={'설치장소'}
                                Value={
                                    isNull(listState.search.search_Key)
                                        ? ''
                                        : listState.search.search_Key
                                }
                                HandleOnKeyDown={handleSearchInputOnKeyDown}
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
export default UhealthzoneListSearchBox

import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton, VaryInput, VaryLabel } from '@Elements'
import { useRecoilState } from 'recoil'
import { InstListState } from '@Recoil/InstPagesState'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    RightSearchButton,
    SearchItem,
} = SearchBoxStyle

const InstListSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [instListState, setInstListState] = useRecoilState(InstListState)

    return (
        <RowContainer>
            <SearchRowWapper>
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`소속`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryInput
                                ContentsType={`search`}
                                Width={'w40'}
                                HandleOnChange={e => {
                                    setInstListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            searchName: e.target.value,
                                        },
                                    }))
                                }}
                                id={'id'}
                                Placeholder={'소속'}
                                Value={instListState.search.searchName}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper></SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>

            <RightSearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default InstListSearchBox

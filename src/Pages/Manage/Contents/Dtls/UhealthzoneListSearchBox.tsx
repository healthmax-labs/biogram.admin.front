import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton, VaryInput, VaryLabel } from '@Elements'
import { useRecoilState } from 'recoil'
import { UhealthzoneListState } from '@Recoil/ContentsPagesState'
import { isNull } from 'lodash'

const {
    Container,
    SearchWapper,
    SearchItemWapper,
    SearchLabel,
    SearchButton,
    SearchItem,
} = SearchBoxStyle

const UhealthzoneListSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [listState, setListState] = useRecoilState(UhealthzoneListState)

    return (
        <Container>
            <SearchWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`설치장소`} />
                    </SearchLabel>
                    <SearchItem>
                        <VaryInput
                            ContentsType={`search`}
                            Width={'w64'}
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
export default UhealthzoneListSearchBox

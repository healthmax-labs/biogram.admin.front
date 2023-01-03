import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton, VaryInput, VaryLabel } from '@Elements'
import { useRecoilState } from 'recoil'
import { MagazineListState } from '@Recoil/ContentsPagesState'
import { isNull } from 'lodash'

const {
    Container,
    SearchWapper,
    SearchItemWapper,
    SearchLabel,
    SearchButton,
    SearchItem,
} = SearchBoxStyle

const MagazineListSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [listState, setListState] = useRecoilState(MagazineListState)

    return (
        <Container>
            <SearchWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`매거진`} />
                    </SearchLabel>
                    <SearchItem>
                        <VaryInput
                            ContentsType={`search`}
                            Width={'w60'}
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
                            Placeholder={'제목 / 내용'}
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
export default MagazineListSearchBox

import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { DefaultSearchButton, VaryLabel, VarySelectBox } from '@Elements'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LoungeListState } from '@Recoil/ContentsPagesState'
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

const LoungeListSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [listState, setListState] = useRecoilState(LoungeListState)

    return (
        <RowContainer>
            <SearchRowWapper>
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`정렬방식`} />
                        </SearchLabel>
                        <SearchItem>
                            <VarySelectBox
                                Width={`w60`}
                                ContentsType={`search`}
                                PlaceholderDisable={false}
                                Placeholder={`정렬방식을 선택해주세요`}
                                Value={listState.search.sortType}
                                Elements={[
                                    {
                                        value: 'latest',
                                        text: '최신순',
                                    },
                                    {
                                        value: 'popular',
                                        text: '인기순',
                                    },
                                ]}
                                HandleOnChange={e => {
                                    const sortTypeValue: 'latest' | 'popular' =
                                        e.value === 'latest' ||
                                        e.value === 'popular'
                                            ? e.value
                                            : 'latest'
                                    setListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            sortType: sortTypeValue,
                                        },
                                    }))
                                }}
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
export default LoungeListSearchBox

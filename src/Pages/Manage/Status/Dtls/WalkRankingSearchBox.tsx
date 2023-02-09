import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryLabel,
} from '@Elements'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useRecoilState } from 'recoil'
import { WalkRankingListState } from '@Recoil/StatusPagesState'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    SearchItem,
    RightSearchButton,
} = SearchBoxStyle

const WalkRankingSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [walkRankingListState, setWalkRankingState] =
        useRecoilState(WalkRankingListState)
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
                                    setWalkRankingState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            INST_NO: String(instNo),
                                        },
                                    }))
                                }
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`측정 월`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryDatepickerInput
                                ContentsType={`search`}
                                Value={
                                    walkRankingListState.search.MESURE_MT
                                        ? changeDatePickerDate(
                                              walkRankingListState.search
                                                  .MESURE_MT
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setWalkRankingState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            MESURE_MT: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton Item={'end'}>
                <DefaultSearchButton
                    ButtonClick={() => {
                        HandleGetList()
                    }}
                />
            </RightSearchButton>
        </RowContainer>
    )
}

export default WalkRankingSearchBox

import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryLabel,
} from '@Elements'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useRecoilState, useRecoilValue } from 'recoil'
import { WalkRankingListState } from '@Recoil/StatusPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { useNavigate } from 'react-router-dom'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    SearchItem,
    RightSearchButton,
} = SearchBoxStyle

const WalkRankingSearchBox = () => {
    const navigate = useNavigate()
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
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
                                SelectElement={{
                                    value: walkRankingListState.search.INST_NO
                                        ? Number(
                                              walkRankingListState.search
                                                  .INST_NO
                                          )
                                        : null,
                                    text: walkRankingListState.search.instNm
                                        ? walkRankingListState.search.instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) =>
                                    setWalkRankingState(prevState => ({
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
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`측정 월`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryDatepickerInput
                                Width={'w40'}
                                ShowType={`year, month`}
                                DateFormat={'yyyy년 MM월'}
                                InputeType={`search`}
                                Value={changeDatePickerDate(
                                    `${walkRankingListState.search.MESURE_MT}`
                                )}
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
            <RightSearchButton
                Item={'end'}
                WindowsWidth={mainLayoutState.windowsSize.width}>
                <DefaultSearchButton
                    ButtonClick={() => {
                        setWalkRankingState(prevState => ({
                            ...prevState,
                            status: 'idle',
                            search: {
                                ...prevState.search,
                                curPage: 1,
                            },
                        }))

                        navigate({
                            pathname:
                                process.env.PUBLIC_URL +
                                `/manage/status/walk-ranking`,
                        })
                    }}
                />
            </RightSearchButton>
        </RowContainer>
    )
}

export default WalkRankingSearchBox

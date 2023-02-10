import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
} from '@Elements'

import { useRecoilState } from 'recoil'
import { NonMeasureListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    SearchItem,
    RightSearchButton,
} = SearchBoxStyle

const NonMeasureSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [nonMeasureListState, setNonMeasureListState] =
        useRecoilState(NonMeasureListState)

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
                                    setNonMeasureListState(prevState => ({
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
                            <VaryLabel LabelName={`검색어 `} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryInput
                                ContentsType={`search`}
                                Width={'w40'}
                                HandleOnChange={() => {
                                    //
                                }}
                                id={'id'}
                                Placeholder={'검색어 입력'}
                                Value={
                                    isNull(
                                        nonMeasureListState.search.SEARCH_KEY
                                    )
                                        ? ''
                                        : nonMeasureListState.search.SEARCH_KEY
                                }
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`측정일자`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryDatepickerInput
                                InputeType={`search`}
                                Value={
                                    nonMeasureListState.search.MESURE_DT
                                        ? changeDatePickerDate(
                                              nonMeasureListState.search
                                                  .MESURE_DT
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setNonMeasureListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            MESURE_DT: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton Item={'end'}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}

export default NonMeasureSearchBox

import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryButton,
    VaryDatepickerInput,
    VaryLabel,
    VaryLabelCheckBox,
} from '@Elements'

import { useRecoilState } from 'recoil'
import { MesureAnalyticsListState } from '@Recoil/AnalyticsPagesState'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    DatepickerLine,
    SearchItem,
    SearchItemGap,
    RightSearchButton,
} = SearchBoxStyle

const MeasureUserSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [listState, setListState] = useRecoilState(MesureAnalyticsListState)

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
                                    setListState(prevState => ({
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
                            <VaryLabel LabelName={`기간`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryDatepickerInput
                                InputeType={`search`}
                                Value={
                                    listState.search.BGNDE
                                        ? changeDatePickerDate(
                                              listState.search.BGNDE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            BGNDE: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                            <DatepickerLine>~</DatepickerLine>
                            <VaryDatepickerInput
                                InputeType={`search`}
                                Value={
                                    listState.search.ENDDE
                                        ? changeDatePickerDate(
                                              listState.search.ENDDE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            ENDDE: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`빠른설정`} />
                        </SearchLabel>
                        <SearchItemGap>
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="1개월"
                                Active={true}
                                HandleClick={() => {
                                    //
                                }}
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="3개월"
                                HandleClick={() => {
                                    //
                                }}
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="6개월"
                                HandleClick={() => {
                                    //
                                }}
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="1년"
                                HandleClick={() => {
                                    //
                                }}
                            />
                        </SearchItemGap>
                    </SearchItemWapper>
                </SearchItemRow>
                <SearchItemRow>
                    <SearchItemWapper ColSpan={true}>
                        <SearchLabel>
                            <VaryLabel LabelName={`연령`} />
                        </SearchLabel>
                        <SearchItemGap>
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() => {
                                    //
                                }}
                                LabelName={`전체`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() => {
                                    //
                                }}
                                LabelName={`10대이하`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() => {
                                    //
                                }}
                                LabelName={`20대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() => {
                                    //
                                }}
                                LabelName={`30대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() => {
                                    //
                                }}
                                LabelName={`40대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() => {
                                    //
                                }}
                                LabelName={`50대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() => {
                                    //
                                }}
                                LabelName={`60대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() => {
                                    //
                                }}
                                LabelName={`70대 이상`}
                            />
                        </SearchItemGap>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`주기`} />
                        </SearchLabel>
                        <SearchItemGap>
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="1일"
                                Active={true}
                                HandleClick={() => {
                                    //
                                }}
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="1주"
                                HandleClick={() => {
                                    //
                                }}
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="1개월"
                                HandleClick={() => {
                                    //
                                }}
                            />
                        </SearchItemGap>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton Item={'end'}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}

export default MeasureUserSearchBox

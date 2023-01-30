import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    PstinstSelector,
    VaryButton,
    VaryDatepickerInput,
    VaryLabel,
    VaryLabelCheckBox,
    DefaultSearchButton,
} from '@Elements'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useRecoilState } from 'recoil'
import { MberAnalyticsListState } from '@Recoil/AnalyticsPagesState'

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

const MemberSearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const [listState, setListState] = useRecoilState(MberAnalyticsListState)

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
                                ContentsType={`search`}
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
                                ContentsType={`search`}
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
                                HandleClick={() =>
                                    console.debug('HandleClick 1개월')
                                }
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="3개월"
                                HandleClick={() =>
                                    console.debug('HandleClick 3개월')
                                }
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="6개월"
                                HandleClick={() =>
                                    console.debug('HandleClick 6개월')
                                }
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="1년"
                                HandleClick={() =>
                                    console.debug('HandleClick 1년')
                                }
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
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange 전체')
                                }
                                LabelName={`전체`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange 10대이하')
                                }
                                LabelName={`10대이하`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange 20대')
                                }
                                LabelName={`20대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange 30대')
                                }
                                LabelName={`30대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange 40대')
                                }
                                LabelName={`40대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange 50대')
                                }
                                LabelName={`50대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange 60대')
                                }
                                LabelName={`60대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange 70대 이상')
                                }
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
                                HandleClick={() =>
                                    console.debug('HandleClick 1일')
                                }
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="1주"
                                HandleClick={() =>
                                    console.debug('HandleClick 1주')
                                }
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="1개월"
                                HandleClick={() =>
                                    console.debug('HandleClick 1개월')
                                }
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

export default MemberSearchBox

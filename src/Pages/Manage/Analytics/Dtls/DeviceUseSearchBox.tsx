import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import { gmtTimeToTimeObject } from '@Helper'
import {
    PstinstSelector,
    VaryButton,
    VaryDatepickerInput,
    VaryLabel,
    VaryLabelCheckBox,
    DefaultSearchButton,
} from '@Elements'

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

const DeviceUseSearchBox = () => {
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
                                HandleSelectValue={({ instNo, instNm }) =>
                                    console.debug(instNo, instNm)
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
                                Value={new Date()}
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    console.debug(year, monthPad, dayPad)
                                }}
                            />
                            <DatepickerLine>~</DatepickerLine>
                            <VaryDatepickerInput
                                ContentsType={`search`}
                                Value={new Date()}
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    console.debug(year, monthPad, dayPad)
                                }}
                            />
                        </SearchItem>
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
                                    console.debug('HandleOnChange')
                                }
                                LabelName={`전체`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange')
                                }
                                LabelName={`10대이하`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange')
                                }
                                LabelName={`20대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange')
                                }
                                LabelName={`30대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange')
                                }
                                LabelName={`40대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange')
                                }
                                LabelName={`50대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange')
                                }
                                LabelName={`60대`}
                            />
                            <VaryLabelCheckBox
                                LabelWidth={'wMin'}
                                Checked={false}
                                HandleOnChange={() =>
                                    console.debug('HandleOnChange')
                                }
                                LabelName={`70대 이상`}
                            />
                        </SearchItemGap>
                    </SearchItemWapper>
                </SearchItemRow>
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`주기`} />
                        </SearchLabel>
                        <SearchItemGap>
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="1일"
                                Active={true}
                                HandleClick={() => console.debug('HandleClick')}
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="1주"
                                HandleClick={() => console.debug('HandleClick')}
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="1개월"
                                HandleClick={() => console.debug('HandleClick')}
                            />
                        </SearchItemGap>
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
                                HandleClick={() => console.debug('HandleClick')}
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="3개월"
                                HandleClick={() => console.debug('HandleClick')}
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="6개월"
                                HandleClick={() => console.debug('HandleClick')}
                            />
                            <VaryButton
                                ButtonType={`button`}
                                ButtonName="1년"
                                HandleClick={() => console.debug('HandleClick')}
                            />
                        </SearchItemGap>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton Item={'end'}>
                <DefaultSearchButton ButtonClick={() => console.log('1234')} />
            </RightSearchButton>
        </RowContainer>
    )
}

export default DeviceUseSearchBox

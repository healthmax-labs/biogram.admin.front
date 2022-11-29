import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
} from '@Elements'
import { gmtTimeToTimeObject } from '@Helper'
// import { useRecoilState } from 'recoil'
// import { ListState } from '@Recoil/MemberPagesState'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    RightSearchButton,
    DatepickerLine,
    SearchItem,
    SearchColSpanLabel,
} = SearchBoxStyle

const ConsultSearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    // const [listState, setListState] = useRecoilState(ListState)

    return (
        <RowContainer>
            <SearchRowWapper>
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`소속:`} />
                        </SearchLabel>
                        <PstinstSelector
                            HandleSelectValue={({ instNo, instNm }) =>
                                console.debug(instNo, instNm)
                            }
                        />
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`기간:`} />
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
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`검색어:`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryInput
                                ContentsType={`search`}
                                Width={'w64'}
                                HandleOnChange={e => console.debug(e)}
                                id={'id'}
                                Placeholder={'ID / 이름 / 연락처 / 전화번호'}
                                Value={``}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
                <SearchItemRow Second={true}>
                    <SearchItemWapper ColSpan={true}>
                        <SearchColSpanLabel>
                            <VaryLabel LabelName={`요인:`} />
                        </SearchColSpanLabel>
                        <SearchItem>
                            <div className="px-2">
                                <VaryLabelCheckBox
                                    LabelName={`혈압`}
                                    Checked={false}
                                    HandleOnChange={e => console.debug(e)}
                                />
                            </div>
                            <div className="px-2">
                                <VaryLabelCheckBox
                                    LabelName={`식후혈당`}
                                    Checked={false}
                                    HandleOnChange={e => console.debug(e)}
                                />
                            </div>

                            <div className="px-2">
                                <VaryLabelCheckBox
                                    LabelName={`허리둘레`}
                                    Checked={false}
                                    HandleOnChange={e => console.debug(e)}
                                />
                            </div>

                            <div className="px-2">
                                <VaryLabelCheckBox
                                    LabelName={`BMI`}
                                    Checked={false}
                                    HandleOnChange={e => console.debug(e)}
                                />
                            </div>

                            <div className="px-2">
                                <VaryLabelCheckBox
                                    LabelName={`중성지방`}
                                    Checked={false}
                                    HandleOnChange={e => console.debug(e)}
                                />
                            </div>

                            <div className="px-2">
                                <VaryLabelCheckBox
                                    LabelName={`고밀도콜레스테롤`}
                                    Checked={false}
                                    LabelWidth={`w20`}
                                    HandleOnChange={e => console.debug(e)}
                                />
                            </div>

                            <div className="px-2">
                                <VaryLabelCheckBox
                                    LabelName={`스트레스`}
                                    Checked={false}
                                    HandleOnChange={e => console.debug(e)}
                                />
                            </div>
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper></SearchItemWapper>
                    <SearchItemWapper></SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default ConsultSearchBox

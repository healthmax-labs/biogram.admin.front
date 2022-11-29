import React from 'react'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryRadioButton,
    VaryLabelCheckBox,
} from '@Elements'
import { gmtTimeToTimeObject } from '@Helper'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    RightSearchButton,
    DatepickerLine,
    SearchItem,
} = SearchBoxStyle

const SearchBox = () => {
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
                            <VaryLabel LabelName={`소속:`} />
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
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`요인:`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryLabelCheckBox
                                LabelName={`허리둘레`}
                                Checked={false}
                                HandleOnChange={e => console.debug(e)}
                            />
                            <VaryLabelCheckBox
                                LabelName={`혈압`}
                                Checked={false}
                                HandleOnChange={e => console.debug(e)}
                            />
                            <VaryLabelCheckBox
                                LabelName={`TG`}
                                Checked={false}
                                HandleOnChange={e => console.debug(e)}
                            />
                            <VaryLabelCheckBox
                                LabelName={`HDL`}
                                Checked={false}
                                HandleOnChange={e => console.debug(e)}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`갯수:`} />
                        </SearchLabel>
                        <SearchItem>
                            <div className="flex flex-nowrap px-0">
                                <div className="mr-2">
                                    <VaryRadioButton
                                        LabelName="0개"
                                        Checked={false}
                                        HandleOnChange={() =>
                                            console.log('111')
                                        }
                                    />
                                </div>
                                <div className="mr-2">
                                    <VaryRadioButton
                                        LabelName="1개"
                                        Checked={false}
                                        HandleOnChange={() =>
                                            console.log('111')
                                        }
                                    />
                                </div>
                                <div className="mr-2">
                                    <VaryRadioButton
                                        LabelName="2개"
                                        Checked={false}
                                        HandleOnChange={() =>
                                            console.log('111')
                                        }
                                    />
                                </div>
                                <div className="mr-2">
                                    <VaryRadioButton
                                        LabelName="3개"
                                        Checked={false}
                                        HandleOnChange={() =>
                                            console.log('111')
                                        }
                                    />
                                </div>
                                <div className="mr-2">
                                    <VaryRadioButton
                                        LabelName="4개"
                                        Checked={false}
                                        HandleOnChange={() =>
                                            console.log('111')
                                        }
                                    />
                                </div>
                                <div className="mr-2">
                                    <VaryRadioButton
                                        LabelName="5개"
                                        Checked={false}
                                        HandleOnChange={() =>
                                            console.log('111')
                                        }
                                    />
                                </div>
                            </div>
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`복약:`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryLabelCheckBox
                                LabelName={`고혈압`}
                                Checked={false}
                                HandleOnChange={e => console.debug(e)}
                            />
                            <VaryLabelCheckBox
                                LabelName={`당뇨`}
                                Checked={false}
                                HandleOnChange={e => console.debug(e)}
                            />
                            <VaryLabelCheckBox
                                LabelName={`고지혈`}
                                Checked={false}
                                HandleOnChange={e => console.debug(e)}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton>
                <DefaultSearchButton
                    ButtonClick={() => console.debug('ButtonClick')}
                />
            </RightSearchButton>
        </RowContainer>
    )
}
export default SearchBox

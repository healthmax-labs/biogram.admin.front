import React from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryRadioButton,
    VaryLabelCheckBox,
} from '@Elements'
import { DefaultCheckBox } from '@Element/index'
import { gmtTimeToTimeObject } from '@Helper'
import { useRecoilState } from 'recoil'
import { RiskFctrListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'

const {
    Container,
    SearchWapper,
    SearchItemWapper,
    SearchLabel,
    SearchItem,
    DatepickerLine,
    SearchButton,
    LabelItem,
} = SearchBoxStyle

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const [riskFctrListState, setRiskFctrListState] =
        useRecoilState(RiskFctrListState)
    return (
        <Container>
            <SearchWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`소속:`} />
                    </SearchLabel>
                    <PstinstSelector
                        HandleSelectValue={({ instNo }) =>
                            setRiskFctrListState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    instNo: String(instNo),
                                },
                            }))
                        }
                    />
                </SearchItemWapper>
                <SearchItemWapper>
                    <LabelItem>
                        <SearchLabel>
                            <VaryLabel LabelName={`요인:`} />
                        </SearchLabel>
                    </LabelItem>
                    <LabelItem>
                        <DefaultCheckBox />
                        허리둘레
                        <DefaultCheckBox />
                        혈압
                        <DefaultCheckBox />
                        TG
                        <DefaultCheckBox />
                        HDL
                    </LabelItem>
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
                                setRiskFctrListState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        registDtFrom: `${year}${monthPad}${dayPad}`,
                                    },
                                }))
                            }}
                        />
                        <DatepickerLine>~</DatepickerLine>
                        <VaryDatepickerInput
                            ContentsType={`search`}
                            Value={new Date()}
                            CallBackReturn={e => {
                                const { year, monthPad, dayPad } =
                                    gmtTimeToTimeObject(e)
                                setRiskFctrListState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        registDtTo: `${year}${monthPad}${dayPad}`,
                                    },
                                }))
                            }}
                        />
                    </SearchItem>
                </SearchItemWapper>
                <SearchItemWapper>
                    <LabelItem>
                        <SearchLabel>
                            <VaryLabel LabelName={`갯수:`} />
                        </SearchLabel>
                    </LabelItem>
                    <LabelItem>
                        <div className="flex flex-nowrap px-0">
                            <div className="mr-2">
                                <VaryRadioButton
                                    LabelName="0개"
                                    Checked={false}
                                    HandleOnChange={() => console.log('111')}
                                />
                            </div>
                            <div className="mr-2">
                                <VaryRadioButton
                                    LabelName="1개"
                                    Checked={false}
                                    HandleOnChange={() => console.log('111')}
                                />
                            </div>
                            <div className="mr-2">
                                <VaryRadioButton
                                    LabelName="2개"
                                    Checked={false}
                                    HandleOnChange={() => console.log('111')}
                                />
                            </div>
                            <div className="mr-2">
                                <VaryRadioButton
                                    LabelName="3개"
                                    Checked={false}
                                    HandleOnChange={() => console.log('111')}
                                />
                            </div>
                            <div className="mr-2">
                                <VaryRadioButton
                                    LabelName="4개"
                                    Checked={false}
                                    HandleOnChange={() => console.log('111')}
                                />
                            </div>
                            <div className="mr-2">
                                <VaryRadioButton
                                    LabelName="5개"
                                    Checked={false}
                                    HandleOnChange={() => console.log('111')}
                                />
                            </div>
                        </div>
                    </LabelItem>
                </SearchItemWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`검색어:`} />
                    </SearchLabel>
                    <VaryInput
                        ContentsType={`search`}
                        Width={'w64'}
                        HandleOnChange={e =>
                            setRiskFctrListState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    searchKey: e.target.value,
                                },
                            }))
                        }
                        id={'id'}
                        Placeholder={'ID / 이름 / 연락처 / 전화번호'}
                        Value={
                            isNull(riskFctrListState.search.SEARCH_KEY)
                                ? ''
                                : riskFctrListState.search.SEARCH_KEY
                        }
                    />
                </SearchItemWapper>
                <SearchItemWapper>
                    <LabelItem>
                        <SearchLabel>
                            <VaryLabel LabelName={`복약:`} />
                        </SearchLabel>
                    </LabelItem>
                    <LabelItem>
                        <DefaultCheckBox />
                        고혈압
                        <DefaultCheckBox />
                        당뇨
                        <DefaultCheckBox />
                        고지혈
                    </LabelItem>
                </SearchItemWapper>
            </SearchWapper>
            <SearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </SearchButton>
        </Container>
    )
}
export default SearchBox

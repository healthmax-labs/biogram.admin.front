import React, { useState } from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
    VaryLabelRadioButton,
    VarySelectBox,
} from '@Elements'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useRecoilState } from 'recoil'
import { MsgSendListState } from '@Recoil/MsgPagesState'

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

const initializeState = {
    searchDays: Array.from({ length: 31 }, (_, i) => i + 1).map(e => {
        return {
            value: String(e).padStart(2, '0'),
            text: String(e).padStart(2, '0'),
        }
    }),
}

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const [msgSendListState, setMsgSendListState] =
        useRecoilState(MsgSendListState)
    const [pageState] = useState<{
        searchDays: Array<{ value: string; text: string }>
    }>(initializeState)

    return (
        <Container>
            <SearchWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`소속`} />
                    </SearchLabel>
                    <PstinstSelector
                        HandleSelectValue={({ instNo }) =>
                            setMsgSendListState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    INST_NO: String(instNo),
                                },
                            }))
                        }
                    />
                </SearchItemWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`검색어`} />
                    </SearchLabel>
                    <VaryInput
                        ContentsType={`search`}
                        Width={'w64'}
                        id={'id'}
                        Placeholder={'ID / 이름 / 연락처 / 전화번호'}
                        Value={
                            msgSendListState.search.SEARCH_KEY
                                ? msgSendListState.search.SEARCH_KEY
                                : ''
                        }
                        HandleOnChange={e =>
                            setMsgSendListState(prevState => ({
                                ...prevState,
                                search: {
                                    ...prevState.search,
                                    SEARCH_KEY: e.target.value,
                                },
                            }))
                        }
                    />
                </SearchItemWapper>
                <SearchItemWapper>
                    <LabelItem>
                        <SearchLabel>
                            <VaryLabel LabelName={`발송`} />
                        </SearchLabel>
                    </LabelItem>
                    <LabelItem>
                        <VaryLabelCheckBox
                            LabelName={`실패만`}
                            Checked={
                                msgSendListState.search.SNDNG_FAILR === 'F'
                            }
                            HandleOnChange={e => {
                                setMsgSendListState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        SNDNG_FAILR: e.target.checked
                                            ? 'F'
                                            : null,
                                    },
                                }))
                            }}
                        />
                    </LabelItem>
                </SearchItemWapper>
                <SearchItemWapper>
                    <SearchLabel>
                        <VaryLabel LabelName={`기간`} />
                    </SearchLabel>
                    <SearchItem>
                        <VaryDatepickerInput
                            ContentsType={`search`}
                            Value={
                                msgSendListState.search.FROM_MONTH &&
                                msgSendListState.search.FROM_DAY
                                    ? changeDatePickerDate(
                                          `${msgSendListState.search.FROM_MONTH}${msgSendListState.search.FROM_DAY}`
                                      )
                                    : new Date()
                            }
                            CallBackReturn={e => {
                                const { year, monthPad, dayPad } =
                                    gmtTimeToTimeObject(e)
                                setMsgSendListState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        FROM_MONTH: `${year}${monthPad}`,
                                        FROM_DAY: `${dayPad}`,
                                    },
                                }))
                            }}
                        />
                        <DatepickerLine>~</DatepickerLine>
                        <VarySelectBox
                            ContentsType={`search`}
                            Elements={pageState.searchDays}
                            Value={msgSendListState.search.TO_DAY}
                            HandleOnChange={e =>
                                setMsgSendListState(prevState => ({
                                    ...prevState,
                                    search: {
                                        ...prevState.search,
                                        TO_DAY: e.value,
                                    },
                                }))
                            }
                        />
                    </SearchItem>
                </SearchItemWapper>
                <SearchItemWapper>
                    <LabelItem>
                        <SearchLabel>
                            <VaryLabel LabelName={`조회 기준`} />
                        </SearchLabel>
                    </LabelItem>
                    <LabelItem>
                        <div className="flex flex-nowrap px-0">
                            <div className="mr-2">
                                <VaryLabelRadioButton
                                    LabelName="발송일시"
                                    Checked={false}
                                    HandleOnChange={() => console.log('111')}
                                />
                            </div>
                            <div className="mr-2">
                                <VaryLabelRadioButton
                                    LabelName="작성일시"
                                    Checked={false}
                                    HandleOnChange={() => console.log('111')}
                                />
                            </div>
                        </div>
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

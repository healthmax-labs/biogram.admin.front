import React, { useState } from 'react'
import { SearchBoxStyle, WapperStyle } from '@Style/Pages/CommonStyle'
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
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    RightSearchButton,
    DatepickerLine,
    SearchItem,
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
                                    setMsgSendListState(prevState => ({
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
                            <VaryLabel LabelName={`검색어`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryInput
                                ContentsType={`search`}
                                Width={'w40'}
                                id={'id'}
                                Placeholder={'검색어'}
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
                        </SearchItem>
                    </SearchItemWapper>

                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`등록일시`} />
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
                </SearchItemRow>
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`발송결과`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryLabelCheckBox
                                LabelName={`실패포함`}
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
export default SearchBox

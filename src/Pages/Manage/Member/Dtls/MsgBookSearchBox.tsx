import React from 'react'
import { SearchBoxStyle, WapperStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelRadioButton,
} from '@Elements'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useRecoilState } from 'recoil'
import { MsgBookListState } from '@Recoil/MsgPagesState'

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

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const [msgSendListState, setMsgSendListState] =
        useRecoilState(MsgBookListState)

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
                                HandleOnChange={e =>
                                    setMsgSendListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            SEARCH_KEY: e.target.value,
                                        },
                                    }))
                                }
                                id={'id'}
                                Placeholder={'검색어'}
                                Value={
                                    msgSendListState.search.SEARCH_KEY
                                        ? msgSendListState.search.SEARCH_KEY
                                        : ''
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
                                    msgSendListState.search.FROM_DAY
                                        ? changeDatePickerDate(
                                              `${msgSendListState.search.FROM_DAY}`
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
                                            FROM_DAY: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                            <DatepickerLine>~</DatepickerLine>
                            <VaryDatepickerInput
                                ContentsType={`search`}
                                Value={
                                    msgSendListState.search.TO_DAY
                                        ? changeDatePickerDate(
                                              `${msgSendListState.search.TO_DAY}`
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
                                            TO_DAY: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`조회 기준`} />
                        </SearchLabel>
                        <SearchItem>
                            <WapperStyle.FlexNoWarapGap>
                                <VaryLabelRadioButton
                                    LabelName="발송일시"
                                    Checked={false}
                                    HandleOnChange={() => console.log('111')}
                                />
                                <VaryLabelRadioButton
                                    LabelName="작성일시"
                                    Checked={false}
                                    HandleOnChange={() => console.log('111')}
                                />
                            </WapperStyle.FlexNoWarapGap>
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

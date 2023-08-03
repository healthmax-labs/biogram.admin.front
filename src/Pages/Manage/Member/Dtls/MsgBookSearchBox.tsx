import React, { KeyboardEvent } from 'react'
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
import { useRecoilState, useRecoilValue } from 'recoil'
import { MsgBookListState } from '@Recoil/MemberPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

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
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [msgBookListStaste, setMsgSendListState] =
        useRecoilState(MsgBookListState)

    const handleSearchInputOnKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key !== 'Enter') return
        HandleGetList()
    }

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
                                SelectElement={{
                                    value: msgBookListStaste.search.INST_NO
                                        ? Number(
                                              msgBookListStaste.search.INST_NO
                                          )
                                        : null,
                                    text: msgBookListStaste.search.instNm
                                        ? msgBookListStaste.search.instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) =>
                                    setMsgSendListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            INST_NO: String(instNo),
                                            instNm: instNm,
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
                                    msgBookListStaste.search.SEARCH_KEY
                                        ? msgBookListStaste.search.SEARCH_KEY
                                        : ''
                                }
                                HandleOnKeyDown={handleSearchInputOnKeyDown}
                            />
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`등록일시`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryDatepickerInput
                                InputeType={`search`}
                                Value={
                                    msgBookListStaste.search.FROM_DAY
                                        ? changeDatePickerDate(
                                              `${msgBookListStaste.search.FROM_DAY}`
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
                                InputeType={`search`}
                                Value={
                                    msgBookListStaste.search.TO_DAY
                                        ? changeDatePickerDate(
                                              `${msgBookListStaste.search.TO_DAY}`
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
                                    LabelWidth={`wMin`}
                                    LabelName="발송일시"
                                    Checked={
                                        msgBookListStaste.search.SNDNG_STDR ===
                                        'S'
                                    }
                                    HandleOnChange={e =>
                                        setMsgSendListState(prevState => ({
                                            ...prevState,
                                            search: {
                                                ...prevState.search,
                                                SNDNG_STDR: e.target.checked
                                                    ? 'S'
                                                    : '',
                                            },
                                        }))
                                    }
                                />
                                <VaryLabelRadioButton
                                    LabelWidth={`wMin`}
                                    LabelName="작성일시"
                                    Checked={
                                        msgBookListStaste.search.SNDNG_STDR ===
                                        ''
                                    }
                                    HandleOnChange={e =>
                                        setMsgSendListState(prevState => ({
                                            ...prevState,
                                            search: {
                                                ...prevState.search,
                                                SNDNG_STDR: e.target.checked
                                                    ? ''
                                                    : 'S',
                                            },
                                        }))
                                    }
                                />
                            </WapperStyle.FlexNoWarapGap>
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton
                Item={'end'}
                WindowsWidth={mainLayoutState.windowsSize.width}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default SearchBox

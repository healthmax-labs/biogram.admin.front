import React, { KeyboardEvent } from 'react'
import { SearchBoxStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
} from '@Elements'
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useRecoilState, useRecoilValue } from 'recoil'
import { MsgSendListState } from '@Recoil/MemberPagesState'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'

const {
    SearchItemWapper,
    SearchLabel,
    RowContainer,
    SearchRowWapper,
    SearchItemRow,
    RightSearchButton,
    SearchItem,
} = SearchBoxStyle

const SearchBox = ({ HandleGetList }: { HandleGetList: () => void }) => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [msgSendListState, setMsgSendListState] =
        useRecoilState(MsgSendListState)

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
                                    value: msgSendListState.search.INST_NO
                                        ? Number(
                                              msgSendListState.search.INST_NO
                                          )
                                        : null,
                                    text: msgSendListState.search.instNm
                                        ? msgSendListState.search.instNm
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
                                Width={'w40'}
                                ShowType={`year, month`}
                                InputeType={`search`}
                                DateFormat={'yyyy년 MM월'}
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
                                                : '',
                                        },
                                    }))
                                }}
                            />
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

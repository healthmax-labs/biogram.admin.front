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
import { changeDatePickerDate, gmtTimeToTimeObject } from '@Helper'
import { useRecoilState } from 'recoil'
import { MsgSendListState } from '@Recoil/MemberPagesState'

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
    const [msgSendListState, setMsgSendListState] =
        useRecoilState(MsgSendListState)

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
            <RightSearchButton Item={'end'}>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default SearchBox

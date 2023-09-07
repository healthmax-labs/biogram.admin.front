import { KeyboardEvent } from 'react'
import { SearchBoxStyle, WapperStyle as WS } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
} from '@Element/index'
import {
    changeDatePickerDate,
    dateInsertHypen,
    getDateMonthUnit,
    gmtTimeToTimeObject,
} from '@Helper'
import { useRecoilValue, useRecoilState } from 'recoil'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import { StressListState } from '@Recoil/StatusPagesState'
import Codes from '@Codes'
import React from 'react'

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

const StressListSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [stressListState, setStressListState] =
        useRecoilState(StressListState)

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
                                    value: stressListState.search.INST_NO
                                        ? Number(stressListState.search.INST_NO)
                                        : null,
                                    text: stressListState.search.instNm
                                        ? stressListState.search.instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) =>
                                    setStressListState(prevState => ({
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
                                Placeholder={'이름/아이디/휴대폰번호'}
                                Value={stressListState.search.SEARCH_KEY}
                                HandleOnChange={e => {
                                    setStressListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            SEARCH_KEY: e.target.value,
                                        },
                                    }))
                                }}
                                HandleOnKeyDown={e => {
                                    handleSearchInputOnKeyDown(e)
                                }}
                            />
                        </SearchItem>
                    </SearchItemWapper>

                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`기간`} />
                        </SearchLabel>
                        <SearchItem>
                            <VaryDatepickerInput
                                MinDate={
                                    new Date(
                                        dateInsertHypen(
                                            getDateMonthUnit(
                                                changeDatePickerDate(
                                                    stressListState.search
                                                        .END_DE
                                                ),
                                                12
                                            )
                                        )
                                    )
                                }
                                InputeType={`search`}
                                Value={
                                    stressListState.search.BEGIN_DE
                                        ? changeDatePickerDate(
                                              stressListState.search.BEGIN_DE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setStressListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            BEGIN_DE: `${year}${monthPad}${dayPad}`,
                                        },
                                    }))
                                }}
                            />
                            <DatepickerLine>~</DatepickerLine>
                            <VaryDatepickerInput
                                InputeType={`search`}
                                Value={
                                    stressListState.search.END_DE
                                        ? changeDatePickerDate(
                                              stressListState.search.END_DE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setStressListState(prevState => ({
                                        ...prevState,
                                        search: {
                                            ...prevState.search,
                                            END_DE: `${year}${monthPad}${dayPad}`,
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
                            <VaryLabel LabelName={`요인`} />
                        </SearchLabel>
                        <SearchItem>
                            <WS.FlexNoWarapGap>
                                {(() => {
                                    const inquiryItems = stressListState.search
                                        .INQUIRY_ITEMS
                                        ? stressListState.search.INQUIRY_ITEMS.split(
                                              ','
                                          ).map(element => element.trim())
                                        : []
                                    return Codes.StressInquiryItemsCode.map(
                                        (el, index) => {
                                            return (
                                                <VaryLabelCheckBox
                                                    key={`stress-list-search-box-stress-inquiry-items-code-item-${index}`}
                                                    LabelName={`${el.name}`}
                                                    LabelWidth={`wMin`}
                                                    Checked={
                                                        inquiryItems.findIndex(
                                                            e => e === el.code
                                                        ) > -1
                                                    }
                                                    HandleOnChange={e => {
                                                        if (e.target.checked) {
                                                            setStressListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        INQUIRY_ITEMS:
                                                                            [
                                                                                ...inquiryItems,
                                                                                el.code,
                                                                            ].join(
                                                                                ','
                                                                            ),
                                                                    },
                                                                })
                                                            )
                                                        } else {
                                                            setStressListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        INQUIRY_ITEMS:
                                                                            inquiryItems
                                                                                .filter(
                                                                                    e =>
                                                                                        e !==
                                                                                        el.code
                                                                                )
                                                                                .join(
                                                                                    ','
                                                                                ),
                                                                    },
                                                                })
                                                            )
                                                        }
                                                    }}
                                                />
                                            )
                                        }
                                    )
                                })()}
                            </WS.FlexNoWarapGap>
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
                <SearchItemRow>
                    <SearchItemWapper>
                        <SearchLabel>
                            <VaryLabel LabelName={`위험단계`} />
                        </SearchLabel>
                        <SearchItem>
                            <WS.FlexNoWarapGap>
                                {(() => {
                                    const conditions = stressListState.search
                                        .CONDITIONS
                                        ? stressListState.search.CONDITIONS.split(
                                              ','
                                          ).map(element => element.trim())
                                        : []
                                    return Codes.ConditionsCode.map(
                                        (el, index) => {
                                            return (
                                                <VaryLabelCheckBox
                                                    LabelName={`${el.name}`}
                                                    LabelWidth={`wMin`}
                                                    key={`stress-list-search-box-conditions-code-item-${index}`}
                                                    Checked={
                                                        conditions.findIndex(
                                                            e => e === el.name
                                                        ) > -1
                                                    }
                                                    HandleOnChange={e => {
                                                        if (e.target.checked) {
                                                            setStressListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        CONDITIONS:
                                                                            [
                                                                                ...conditions,
                                                                                el.name,
                                                                            ].join(
                                                                                ','
                                                                            ),
                                                                    },
                                                                })
                                                            )
                                                        } else {
                                                            setStressListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        CONDITIONS:
                                                                            conditions
                                                                                .filter(
                                                                                    e =>
                                                                                        e !==
                                                                                        el.name
                                                                                )
                                                                                .join(
                                                                                    ','
                                                                                ),
                                                                    },
                                                                })
                                                            )
                                                        }
                                                    }}
                                                />
                                            )
                                        }
                                    )
                                })()}
                            </WS.FlexNoWarapGap>
                        </SearchItem>
                    </SearchItemWapper>
                    <SearchItemWapper>
                        <SearchLabel></SearchLabel>
                        <SearchItem>
                            <WS.FlexNoWarapGap>
                                ※ 선택된 요인의 위험단계가 포함된 인원이 선별
                                됩니다.
                            </WS.FlexNoWarapGap>
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

export default StressListSearchBox

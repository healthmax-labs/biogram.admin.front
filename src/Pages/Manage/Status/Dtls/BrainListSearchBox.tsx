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
import React, { KeyboardEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AtomMainLayoutState } from '@Recoil/MainLayoutState'
import Codes from '@Codes'
import { BrainListState } from '@Recoil/StatusPagesState'

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

const BrainListSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const mainLayoutState = useRecoilValue(AtomMainLayoutState)
    const [brainListState, setBrainListState] = useRecoilState(BrainListState)

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
                                    value: brainListState.search.INST_NO
                                        ? Number(brainListState.search.INST_NO)
                                        : null,
                                    text: brainListState.search.instNm
                                        ? brainListState.search.instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) =>
                                    setBrainListState(prevState => ({
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
                                Value={brainListState.search.SEARCH_KEY}
                                HandleOnChange={e => {
                                    setBrainListState(prevState => ({
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
                                                    brainListState.search.END_DE
                                                ),
                                                12
                                            )
                                        )
                                    )
                                }
                                InputeType={`search`}
                                Value={
                                    brainListState.search.BEGIN_DE
                                        ? changeDatePickerDate(
                                              brainListState.search.BEGIN_DE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setBrainListState(prevState => ({
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
                                    brainListState.search.END_DE
                                        ? changeDatePickerDate(
                                              brainListState.search.END_DE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setBrainListState(prevState => ({
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
                                    const inquiryItems = brainListState.search
                                        .INQUIRY_ITEMS
                                        ? brainListState.search.INQUIRY_ITEMS.split(
                                              ','
                                          ).map(element => element.trim())
                                        : []
                                    return Codes.StatusBrain.InquiryItemsCode.map(
                                        (el, index) => {
                                            return (
                                                <VaryLabelCheckBox
                                                    key={`brain-list-search-box-brain-inquiry-items-code-item-${index}`}
                                                    LabelName={`${el.name}`}
                                                    LabelWidth={`wMin`}
                                                    Checked={
                                                        inquiryItems.findIndex(
                                                            e => e === el.code
                                                        ) > -1
                                                    }
                                                    HandleOnChange={e => {
                                                        if (e.target.checked) {
                                                            setBrainListState(
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
                                                            setBrainListState(
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
                                    const conditions = brainListState.search
                                        .CONDITIONS
                                        ? brainListState.search.CONDITIONS.split(
                                              ','
                                          ).map(element => element.trim())
                                        : []
                                    return Codes.StatusBrain.ConditionsCode.map(
                                        (el, index) => {
                                            return (
                                                <VaryLabelCheckBox
                                                    LabelName={`${el.name}`}
                                                    LabelWidth={`wMin`}
                                                    key={`brain-list-search-box-conditions-code-item-${index}`}
                                                    Checked={
                                                        conditions.findIndex(
                                                            e => e === el.name
                                                        ) > -1
                                                    }
                                                    HandleOnChange={e => {
                                                        if (e.target.checked) {
                                                            setBrainListState(
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
                                                            setBrainListState(
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

export default BrainListSearchBox

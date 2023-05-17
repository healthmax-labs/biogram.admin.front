import React, { KeyboardEvent } from 'react'
import { SearchBoxStyle, WapperStyle } from '@Style/Pages/CommonStyle'
import {
    DefaultSearchButton,
    PstinstSelector,
    VaryDatepickerInput,
    VaryInput,
    VaryLabel,
    VaryLabelCheckBox,
} from '@Elements'
import {
    changeDatePickerDate,
    dateInsertHypen,
    getDateMonthUnit,
    gmtTimeToTimeObject,
} from '@Helper'
import { useRecoilState } from 'recoil'
import { StatisticsListState } from '@Recoil/StatusPagesState'
import { isNull } from 'lodash'
import Codes from '@Codes'
import _ from 'lodash'

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

const StatisticsSearchBox = ({
    HandleGetList,
}: {
    HandleGetList: () => void
}) => {
    const [statisticsListState, setStatisticsListState] =
        useRecoilState(StatisticsListState)

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
                                    value: statisticsListState.search.INST_NO
                                        ? Number(
                                              statisticsListState.search.INST_NO
                                          )
                                        : null,
                                    text: statisticsListState.search.instNm
                                        ? statisticsListState.search.instNm
                                        : null,
                                }}
                                HandleSelectValue={({ instNo, instNm }) =>
                                    setStatisticsListState(prevState => ({
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
                                    setStatisticsListState(prevState => ({
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
                                    isNull(
                                        statisticsListState.search.SEARCH_KEY
                                    )
                                        ? ''
                                        : statisticsListState.search.SEARCH_KEY
                                }
                                HandleOnKeyDown={handleSearchInputOnKeyDown}
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
                                                    statisticsListState.search
                                                        .END_DE
                                                ),
                                                12
                                            )
                                        )
                                    )
                                }
                                InputeType={`search`}
                                Value={
                                    statisticsListState.search.BEGIN_DE
                                        ? changeDatePickerDate(
                                              statisticsListState.search
                                                  .BEGIN_DE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setStatisticsListState(prevState => ({
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
                                    statisticsListState.search.END_DE
                                        ? changeDatePickerDate(
                                              statisticsListState.search.END_DE
                                          )
                                        : new Date()
                                }
                                CallBackReturn={e => {
                                    const { year, monthPad, dayPad } =
                                        gmtTimeToTimeObject(e)
                                    setStatisticsListState(prevState => ({
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
                            <VaryLabel LabelName={`측정기기`} />
                        </SearchLabel>
                        <SearchItem>
                            <WapperStyle.FlexNoWarapGap>
                                {(() => {
                                    return Codes.DeviceSearchCode.list.map(
                                        (el, index) => {
                                            const {
                                                search: { MESURE_CODE },
                                            } = statisticsListState

                                            return (
                                                <VaryLabelCheckBox
                                                    LabelWidth={`wMin`}
                                                    Disabled={el.searchDisabled}
                                                    LabelName={`${el.name}`}
                                                    key={`statistics-search-box-riksdctr-item-${index}`}
                                                    Checked={_.includes(
                                                        MESURE_CODE,
                                                        el.code
                                                    )}
                                                    HandleOnChange={e => {
                                                        if (
                                                            MESURE_CODE &&
                                                            e.target.checked
                                                        ) {
                                                            const newMesureCode =
                                                                [
                                                                    ...MESURE_CODE,
                                                                    el.code,
                                                                ]
                                                            setStatisticsListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        MESURE_CODE:
                                                                            newMesureCode,
                                                                    },
                                                                })
                                                            )
                                                        } else if (
                                                            MESURE_CODE &&
                                                            !e.target.checked
                                                        ) {
                                                            const newMesureCode =
                                                                MESURE_CODE.filter(
                                                                    e =>
                                                                        e !==
                                                                        el.code
                                                                )
                                                            setStatisticsListState(
                                                                prevState => ({
                                                                    ...prevState,
                                                                    search: {
                                                                        ...prevState.search,
                                                                        MESURE_CODE:
                                                                            newMesureCode,
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
                            </WapperStyle.FlexNoWarapGap>
                        </SearchItem>
                    </SearchItemWapper>
                </SearchItemRow>
            </SearchRowWapper>
            <RightSearchButton>
                <DefaultSearchButton ButtonClick={() => HandleGetList()} />
            </RightSearchButton>
        </RowContainer>
    )
}
export default StatisticsSearchBox
